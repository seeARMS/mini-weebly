<?php namespace MiniWeebly\Auth;
use \Google_Client;

/**
* Authentication class is a class for performing all authentication
* (OAuth login, token validation, XHTTP Request validation)
*
* @package  MiniWeebly\Auth
* @author   Colin Armstrong <colinarms@gmail.com>
*
*/
class Auth {

  private $client_id = '381567580635-u19qvijvgrq576j1ccm6nq82j3r3a7q8.apps.googleusercontent.com';
  private $client_secret = '65osbKPkqMAQKIHC9MXTsVrP';
  private $redirect_uri = 'http://localhost/mini-weebly/';
  private $client;

  private $app;
  private $mysqli;

  function __construct(\Silex\Application $app, $mysqli) {

    // Inject the dependencies
    $this->mysqli = $mysqli;
    $this->app = $app;

    // Create the google OAuth connection
    $this->client = new Google_Client();
    $this->client->setClientId($this->client_id);
    $this->client->setClientSecret($this->client_secret);
    $this->client->setRedirectUri($this->redirect_uri);
    $this->client->addScope("email");
  }

  /**
  * Determine if the user is authenticated (ie if a session exists)
  *
  * @return  boolean describing if the user is authenticated
  *
  */
  public function isAuthenticated() {
    $accessToken = $this->app['session']->get('access_token');

    $sessionActive = isset($accessToken) && $accessToken;

    return ($sessionActive) ? true : false;
  }

  /**
  * Force the user to log in by generating an OAuth string
  *
  * @return   String OAuth URL
  *
  */
  public function login() {
    $authUrl = $this->client->createAuthUrl();

    return $authUrl;
  }

  /**
  * Called after the user logs in via OAuth
  * Create the session, generate the API token, and store it in the db
  *
  * @param  String $code from the OAuth URL callback
  * @return void
  *
  */
  public function handleRedirect($code) {

    // Ensure the client is authenticated
    $this->client->authenticate($code);

    // Store the OAuth access token in the session
    $this->app['session']->set('access_token', $this->client->getAccessToken());

    // Securely generate a random API token
    $token = bin2hex(openssl_random_pseudo_bytes(16));

    setcookie('token', $token, time() + 3600); // set cookie for an hour

    // Determine the users email
    $plus = new \Google_Service_Plus($this->client);
    $email = $plus->people->get('me')['emails'][0]->getValue();


    // Replace the users email and token (if it exists) or create it
    $stmt = $this->mysqli->prepare("REPLACE INTO users (email, token) VALUES (?, ?)");
    $stmt->bind_param('ss', $email, $token);
    $stmt->execute();
    $stmt->close();

  }

  /**
  * Called when an XmlHTTPRequest is made from Backbone
  * Performs authentication on the auth token sent in the header
  *
  * @param  $token the auth token from the request header
  * @throws Exception if API token mismatched
  * @return void
  *
  */
  public function verifyRequest($token) {
    $stmt = $this->mysqli->prepare("SELECT email FROM users WHERE token = ?");
    $stmt->bind_param('s', $token);

    $stmt->bind_result($user);
    $stmt->execute();
    $stmt->store_result();

    // Determine if a token exists in the db
    $numRows = $stmt->num_rows;
    $stmt->close();

    // If the token doesn't match the one in the db, throw an exception
    if ($numRows === 0) {
      $this->app['session']->set('access_token', null);
      throw new \Exception("API token mismatch!");
    }
  }


  public function logout() {
    $this->client->setAccessToken(null);

  }

}

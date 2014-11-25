<?php

require('../vendor/autoload.php');
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use MiniWeebly\Auth\Auth;
use MiniWeebly\Database\Database;

$app = new Silex\Application();
$app['debug'] = true;

// Create the singleton db connection
$db = Database::getInstance();
$mysqli = $db->getConnection();

// Instantiate the auth handling class
$auth = new Auth($app, $mysqli);

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

$app->register(new Silex\Provider\SessionServiceProvider());

// Perform authentication on ALL routes
$app->before(function (Request $request) use ($auth, $app, $mysqli) {

      $code = isset($_GET['code']) ? $_GET['code'] : null;

      if (!$auth->isAuthenticated()) {

        // If code is set, the user just granted access through OAuth
        if (isset($code))

          // Store their token in the db
          $auth->handleRedirect($code, $mysqli);
        else

          // The user isn't authenticated, so force them to login
          return $app->redirect($auth->login());

      // Code is set but the user is authed, so remove the code from the URL
      } else if (isset($code))
        return $app->redirect("/mini-weebly");


      // if the request is an API call, ensure the request token is present
      // in the header
      if ($request->headers->get('X-Requested-With') === 'XMLHttpRequest')
        $requestOk = $auth->verifyRequest($request->headers->get('token'));

    // Needed to properly handle Backbone JSON requests
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('/mini-weebly/api/logout', function(Silex\Application $app) use($auth) {
    $auth->logout();
});

// Mount the /mini-weebly/api route to the PageController
$app->mount('/mini-weebly/api', new MiniWeebly\Controllers\PageController());

// Render the index
$app->get('/mini-weebly/', function() use($app) {

    ob_start();
    include('../index.html');
    $pageContents = ob_get_contents();
    ob_end_clean();

    return new Response($pageContents, 200);
});

// Render the templates that Backbone needs
$app->get('/mini-weebly/js/tmpl/{template}', function($template) use($app) {

    ob_start();
    include('../js/tmpl/' . $template);
    $var=ob_get_contents();
    ob_end_clean();

    return new Response($var, 200);
});

$app->run();

?>

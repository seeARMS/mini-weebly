<?php namespace MiniWeebly\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use MiniWeebly\Database\Database;

/**
* API - Page Controller
* Mapped to the /mini-weebly/api route
*
* @package  MiniWeebly\Controllers
* @author   Colin Armstrong <colinarms@gmail.com>
*
*/
class PageController implements ControllerProviderInterface {

  /**
  * Every controller must have a connect function, with all desired routes
  * contained within it
  *
  * @param    Application $app    the Silex application
  * @return   controllers_factory the Silex controller instance
  *
  */
  public function connect(Application $app)
  {

      // Retrieve the singleton DB connection
      $db = Database::getInstance();
      $mysqli = $db->getConnection();

      $controllers = $app['controllers_factory'];

      $controllers->get('/pages', function(Application $app, Request $request) use($mysqli) {
        $resultArray = array();

        // Retrieve all pages
        if ($result = $mysqli->query("SELECT * FROM pages")) {
          while ($row = $result->fetch_array(MYSQLI_ASSOC))
            $resultArray[] = $row;
        }

        return $app->json($resultArray);
      });

      $controllers->delete('/pages/{id}', function(Application $app, $id) use($mysqli) {
        $arr = array();

        $stmt = $mysqli->prepare("DELETE FROM pages WHERE id = ?");
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
          $arr["success"] = true;
        } else {
          $arr["success"] = false;
        }

        $stmt->close();

        return $app->json($arr);
      });

      $controllers->put('/pages/{id}', function (Application $app, Request $request) use ($mysqli) {
          $name = $request->get('name');
          $id = $request->get('id');

          $stmt = $mysqli->prepare("UPDATE pages SET name = ? WHERE id = ?");
          $stmt->bind_param('si', $name, $id);
          $stmt->execute();
          $stmt->close();

          return $app->json(array("success" => true));
      });

      $controllers->post('/pages', function (Application $app, Request $request) use ($mysqli) {
          $name = $request->get('name');

          $stmt = $mysqli->prepare("INSERT INTO pages(name) VALUES(?)");
          $stmt->bind_param('s', $name);

          if ($stmt->execute()) {

            // Return the inserted model
            $arr = array('success' => true,
                         'name' => $name,
                         'id' => $mysqli->insert_id);

          } else {
            $arr['success'] = false;
          }

          return $app->json($arr);
      });

      return $controllers;
  }

}

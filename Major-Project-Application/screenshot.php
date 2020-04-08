
<?php

//index.php

$screen_shot_image = '';

if(isset($_POST["screen_shot"]))
{
 $url = $_POST["url"];
 $screen_shot_json_data = file_get_contents("https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=$url&screenshot=true");
 $screen_shot_result = json_decode($screen_shot_json_data, true);
 $screen_shot = $screen_shot_result['screenshot']['data'];
 $screen_shot = str_replace(array('_','-'), array('/', '+'), $screen_shot);
 $screen_shot_image = "<img src=\"data:image/jpeg;base64,".$screen_shot."\" class='img-responsive img-thumbnail'/>";
}

?>
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>How to capture website screen shot from url in php</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
  <style>
  .box
  {
   width:100%;
   max-width:720px;
   margin:0 auto;
  }
  </style>
 </head>
 <body>
  <div class="container box">
   <br />
   <h2 align="center">How to capture website screen shot from url in php</h2><br />
   <form method="post">
    <div class="form-group">
     <label>Enter URL</label>
     <input type="url" name="url" class="form-control input-lg" required autocomplete="off" />
    </div>
    <br />
    <br />
    <input type="submit" name="screen_shot" value="Take a Screenshot" class="btn btn-info btn-lg" />
   </form>
   <br />
   <?php
   
   echo $screen_shot_image;
   
   ?>
  </div>
  <div style="clear:both"></div>
  <br />
  
  <br />
  <br />
  <br />
 </body>
</html>
<?php


// Return date. If under a day ago return hours elapsed
// Supply function with a timestamp
function dateOrTimeAgo($timestamp) {
  $oneDayAgo = strtotime("-12 hours");

  $currentTime = time();
  if($oneDayAgo <= $timestamp) {
      $var = timeAgo($timestamp);

  }else {
   $var = date('d M', $timestamp);
  }
  return $var;
}

// Function uses a time stamp and returns how long ago from now. If under 24 hours returns in hour format else returns date
function timeAgo($time) {
   $periods = array("sec", "min", "hr", "day", "week", "month", "year", "decade");
   $lengths = array("60","60","24","7","4.35","12","10");

   $now = time();
       $difference     = $now - $time;
       $tense         = "ago";

   for($j = 0; $difference >= $lengths[$j] && $j < count($lengths)-1; $j++) {
       $difference /= $lengths[$j];
   }

   $difference = round($difference);

   if($difference != 1) {
       $periods[$j].= "s";
   }

   return "$difference $periods[$j]";
}

// Returns file sizes in human readable format
function formatSizeUnits($bytes) {
    if ($bytes >= 1073741824)
    {
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    }
    elseif ($bytes >= 1048576)
    {
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    }
    elseif ($bytes >= 1024)
    {
        $bytes = number_format($bytes / 1024, 2) . ' kB';
    }
    elseif ($bytes > 1)
    {
        $bytes = $bytes . ' bytes';
    }
    elseif ($bytes == 1)
    {
        $bytes = $bytes . ' byte';
    }
    else
    {
        $bytes = '0 bytes';
    }

    return $bytes;
}
function getFileSize($field) {

  $file = get_attached_file( $field['id'] );
  if(file_exists($file)) {
    $field = filesize( get_attached_file( $field['id'] ) );
    $fieldSizeFormatted = formatSizeUnits($field);
  }else {
    return false;
  }

  return $fieldSizeFormatted;
}


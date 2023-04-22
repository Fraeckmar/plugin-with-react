<?php
class WPCBShortcode
{
	function __construct()
	{
		add_shortcode('wpcb_booking', array($this, 'wpcb_shortcode'));
	}

	function wpcb_shortcode($atts) {
		$current_user_id = get_current_user_id();
        $atts = shortcode_atts(array(
            'id' => 0
        ), $atts, 'wpcb_booking');
		$shortcode_id = $atts['id'];
		$calendar_id = wpcb_get_calendar_id($shortcode_id);
		$site_url = site_url();
		
       ob_start();
	   echo "<input type='hidden' id='wpcb_current_user' value='{$current_user_id}'>";
	   echo "<input type='hidden' id='wpcb_calendar_id' value='{$calendar_id}'>";
	   echo "<input type='hidden' id='wpcb_site_url' value='{$site_url}'>";
	   echo "<div id='wpcb-fe-booking' class='booking'>Booking Form</div>";
	   return ob_get_clean();
    }
}

$WPCBShortcode = new WPCBShortcode;
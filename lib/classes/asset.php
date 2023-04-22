<?php

class WPCBAsset
{
	function __construct()
	{
		add_action('admin_enqueue_scripts', array($this, 'wpcb_enqueue_scripts'));
		add_action('wp_enqueue_scripts', array($this, 'wpcb_enqueue_scripts'));
	}

	/**
	 * Enqueue scripts and styles.
	 *
	 * @return void
	 */
	function wpcb_enqueue_scripts() {
		wp_enqueue_style( 'booking-font-awesome', WPCB_BOOKING_PLUGIN_URL . 'lib/assets/css/font-awesome.min.css', array(), WPCB_BOOKING_VERSION );
		wp_enqueue_style( 'booking-calendar-style', WPCB_BOOKING_PLUGIN_URL . 'build/index.css', array(), WPCB_BOOKING_VERSION );

		wp_enqueue_script( 'booking-calendar-script', WPCB_BOOKING_PLUGIN_URL . 'build/index.js', array( 'wp-element' ), WPCB_BOOKING_VERSION, true );
		wp_localize_script( 'booking-calendar-script', 'wpApiSettings', array(
			'root' => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' )
		) );
		require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/assets/css-root.php');
	}
}

new WPCBAsset;
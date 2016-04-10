<?php
require_once( ABSPATH . "wp-content/plugins/wine_db/includes/config.php" );

class WineDBAdmin
{

    private $version;

    public function __construct( $version )
    {
        $this->version = $version;
    }

    public function installation()
    {
        global $wpdb;
        global $dbVersion;
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    }

    /**
     * Front end CSS
     */
    public function adminEnqueueStyles()
    {

    }

    public function adminEnqueueScripts()
    {
        wp_enqueue_script( 'jquery' );
        wp_enqueue_script( 'thickbox' );
        wp_enqueue_media();

        wp_register_script( 'wineDBAdminJs', WP_PLUGIN_URL . '/wine_db/admin/js/main.js', array( 'jquery', 'bmabNoty' ) );
        wp_enqueue_script( 'wineDBAdminJs' );

        /* Admin CSS needs to be loaded here */
        wp_register_style( 'wineDBAdminCss', WP_PLUGIN_URL . '/wine_db/admin/css/main.css' );
        wp_enqueue_style( 'wineDBAdminCss' );

        wp_enqueue_style( 'thickbox' );

    }

    function adminMenu()
    {
        add_options_page( 'WineDB', 'WineDB', 'manage_options', 'wine_db', array(
            $this,
            'adminSettingsPage'
        ) );
    }

    function  adminSettingsPage()
    {
        require_once plugin_dir_path( __FILE__ ) . 'partials/settingsManager.php';
    }
}
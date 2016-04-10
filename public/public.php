<?php
require_once( ABSPATH . "wp-content/plugins/wine_db/includes/config.php" );

class WineDBPublic
{
    private $version;

    public function __construct($version)
    {
        $this->version = $version;
    }

    public function displayWineDB($content) {
        wp_register_script( 'wineDBPublicBootBox', WP_PLUGIN_URL . '/wine_db/public/js/bootbox.min.js', array( 'jquery' ) );
        wp_enqueue_script( 'wineDBPublicBootBox' );

        wp_register_script( 'wineDBSunburst', WP_PLUGIN_URL . '/wine_db/public/js/sunburst.js', array( 'jquery' ) );
        wp_enqueue_script( 'wineDBSunburst' );

        wp_register_script( 'wineDBPublicJS', WP_PLUGIN_URL . '/wine_db/public/js/main.js', array( 'jquery' ) );
        wp_enqueue_script( 'wineDBPublicJS' );

        wp_register_style( 'wineDBPublicCSS', WP_PLUGIN_URL . '/wine_db/public/css/main.css' );
        wp_enqueue_style( 'wineDBPublicCSS' );

        ob_start();
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/partials/display.php';
        $template = ob_get_contents();
        $content .= $template;
        ob_end_clean();

        return $content;
    }
}
<?php
/**
 *
 * WineDB is a Wordpress plugin that talks to a Wine DB taken from JoshLikesWine.com
 *
 * @package wine_db
 *
 * @wordpress-plugin
 * Plugin Name:       Wine DB
 * Plugin URI:        https://github.com/Seanmcn/WPWineDB
 * Description:       Plugin for Josh Likes Wine to add a wine database.
 * Version:           1.0.0
 * Author:            Sean McNamara
 * Author URI:        http://seanmcn.com
 * Text Domain:       WineDB
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages
 */
// If this file is called directly, then abort execution.
if ( ! defined( 'WPINC' )) {
    die;
}

require_once plugin_dir_path( __FILE__ ) . 'includes/manager.php';


function runWineDB()
{

    $wine_db = new WineDB();
    register_activation_hook( __FILE__, array( $wine_db, 'activatePlugin' ) );
    $wine_db->run();


}

runWineDB();
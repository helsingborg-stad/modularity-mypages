<?php

/**
 * Plugin Name:       Modularity My Pages
 * Plugin URI:        https://github.com/helsingborg-stad/modularity-modularitymypages
 * Description:       My pages modularity module.
 * Version:           1.0.0
 * Author:            Sebastian Thulin, Petter Andersson, Björn Persson
 * Author URI:        https://github.com/helsingborg-stad
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       mod-modularitymypages
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('MODULARITY_MY_PAGES_PATH', plugin_dir_path(__FILE__));
define('MODULARITY_MY_PAGES_URL', plugins_url('', __FILE__));
define('MODULARITY_MY_PAGES_TEMPLATE_PATH', MODULARITY_MY_PAGES_PATH . 'templates/');
define('MODULARITY_MY_PAGES_VIEW_PATH', MODULARITY_MY_PAGES_PATH . 'views/');
define('MODULARITY_MY_PAGES_MODULE_VIEW_PATH', plugin_dir_path(__FILE__) . 'source/php/Modules');
define('MODULARITY_MY_PAGES_MODULE_PATH', MODULARITY_MY_PAGES_PATH . 'source/php/Modules/');

load_plugin_textdomain('modularity-mypages', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once MODULARITY_MY_PAGES_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once MODULARITY_MY_PAGES_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new ModularityMyPages\Vendor\Psr4ClassLoader();
$loader->addPrefix('ModularityMyPages', MODULARITY_MY_PAGES_PATH);
$loader->addPrefix('ModularityMyPages', MODULARITY_MY_PAGES_PATH . 'source/php/');
$loader->register();

// Acf auto import and export
add_action('acf/init', function () {
    $acfExportManager = new \AcfExportManager\AcfExportManager();
    $acfExportManager->setTextdomain('modularity-mypages');
    $acfExportManager->setExportFolder(MODULARITY_MY_PAGES_PATH . 'source/php/AcfFields/');
    $acfExportManager->autoExport(array(
        'modularitymypages-module' => 'group_61ea7a87e8mmm', //Update with acf id here, module view
        'modularitymypages-settings' => 'group_61ea7a87e8nnn' //Update with acf id here, settings view
    ));
    $acfExportManager->import();
});

// Modularity 3.0 ready - ViewPath for Component library
add_filter('/Modularity/externalViewPath', function ($arr) {
    $arr['mod-mypages-profile'] = MODULARITY_MY_PAGES_MODULE_VIEW_PATH . '/Profile/views/';
    $arr['mod-mypages-service'] = MODULARITY_MY_PAGES_MODULE_VIEW_PATH . '/Service/views/';
    return $arr;
}, 1, 3);

// Start application
new ModularityMyPages\App();

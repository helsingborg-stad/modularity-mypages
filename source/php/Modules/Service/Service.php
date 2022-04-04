<?php

namespace ModularityMyPages\Modules\Service;

use ModularityMyPages\Helper\CacheBust;

/**
 * Class ModularityMyPages
 * @package ModularityMyPages\Module
 */
class Service extends \Modularity\Module
{
    public $slug = 'mod-mypages-service';
    public $supports = array();

    public function init()
    {
        $this->nameSingular = __("My Pages: Service", 'modularity-mypages');
        $this->namePlural = __("My Pages: Services", 'modularity-mypages');
        $this->description = __("My pages modularity module - service.", 'modularity-mypages');
    }

    /**
     * Data array
     * @return array $data
     */
    public function data(): array
    {
        $data = array();

        //Append field data
        $data = array_merge($data, (array) \Modularity\Helper\FormatObject::camelCase(
            get_fields($this->ID)
        ));

        //Translations
        $data['lang'] = (object) array(
            'info' => __(
                "This is a service placeholder.",
                'modularity-mypages'
            )
        );

        return $data;
    }

    /**
     * Blade Template
     * @return string
     */
    public function template(): string
    {
        return "service.blade.php";
    }

    /**
     * Style - Register & adding css
     * @return void
     */
    public function style()
    {
        //Register custom css
        wp_register_style(
            'modularity-mypages-service',
            MODULARITY_MY_PAGES_URL . '/dist/' . CacheBust::name('css/modularity-mypages-service.css'),
            null,
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_style('modularity-mypages-service');
    }

    /**
     * Script - Register & adding scripts
     * @return void
     */
    public function script()
    {
        //Register custom css
        wp_register_script(
            'modularity-mypages-service',
            MODULARITY_MY_PAGES_URL . '/dist/' . CacheBust::name('js/modularity-mypages-service.js'),
            null,
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_script('modularity-mypages-service');
    }

    /**
     * Available "magic" methods for modules:
     * init()            What to do on initialization
     * data()            Use to send data to view (return array)
     * style()           Enqueue style only when module is used on page
     * script            Enqueue script only when module is used on page
     * adminEnqueue()    Enqueue scripts for the module edit/add page in admin
     * template()        Return the view template (blade) the module should use when displayed
     */
}

<?php

namespace ModularityMyPages\Modules\Welcome;

use ModularityMyPages\Helper\CacheBust;

/**
 * Class ModularityMyPages
 * @package ModularityMyPages\Module
 */
class Welcome extends \Modularity\Module
{
    public $slug = 'mod-mypages-welcome';
    public $supports = array();

    public function init()
    {
        $this->nameSingular = __("My Pages: Welcome", 'modularity-mypages');
        $this->namePlural = __("My Pages: Welcomes", 'modularity-mypages');
        $this->description = __("My pages modularity module, welcome page.", 'modularity-mypages');
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
                "Account setting saved.",
                'modularity-mypages'
            ),
            'submit' => __('Save', 'modularity-mypages'),
            'phone' => __('Phone', 'modularity-mypages'),
            'email' => __('Email', 'modularity-mypages'),
        );

        return $data;
    }

    /**
     * Blade Template
     * @return string
     */
    public function template(): string
    {
        return "welcome.blade.php";
    }

    /**
     * Style - Register & adding css
     * @return void
     */
    public function style()
    {
        //Register custom css
        wp_register_style(
            'modularity-mypages-welcome',
            MODULARITY_MY_PAGES_URL . '/dist/' . CacheBust::name('js/modularity-mypages-welcome.css'),
            null,
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_style('modularity-mypages-welcome');
    }

    /**
     * Script - Register & adding scripts
     * @return void
     */
    public function script()
    {
        //Check if module exists, before enqueue
        if (!$this->hasModule()) {
            return;
        }

        //Register custom css
        wp_register_script(
            'modularity-mypages-welcome',
            MODULARITY_MY_PAGES_URL . '/dist/' . CacheBust::name('js/modularity-mypages-welcome.js'),
            ['modularity-mypages'],
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_script('modularity-mypages-welcome');
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

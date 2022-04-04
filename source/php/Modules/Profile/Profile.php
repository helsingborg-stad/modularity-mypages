<?php

namespace ModularityMyPages\Modules\Profile;

use ModularityMyPages\Helper\CacheBust;

/**
 * Class ModularityMyPages
 * @package ModularityMyPages\Module
 */
class Profile extends \Modularity\Module
{
    public $slug = 'mod-mypages-profile';
    public $supports = array();

    public function init()
    {
        $this->nameSingular = __("My Pages: Profile", 'modularity-mypages');
        $this->namePlural = __("My Pages: Profiles", 'modularity-mypages');
        $this->description = __("My pages modularity module, profile page.", 'modularity-mypages');
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

        //User details
        $data['user'] = (object) $this->getUserData();

        return $data;
    }

    /**
     * Fake user data object
     *
     * @return array
     */
    private function getUserData(): array
    {
        return [
            'email' => 'example@mail.com',
            'phone' => '07012345678',
        ];
    }

    /**
     * Blade Template
     * @return string
     */
    public function template(): string
    {
        return "profile.blade.php";
    }

    /**
     * Style - Register & adding css
     * @return void
     */
    public function style()
    {
        return; // Deactivate style

        //Register custom css
        wp_register_style(
            'modularity-mypages-profile',
            MODULARITY_MY_PAGES_URL . '/dist/' . CacheBust::name('css/modularity-mypages-profile.css'),
            null,
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_style('modularity-mypages');
    }

    /**
     * Script - Register & adding scripts
     * @return void
     */
    public function script()
    {
        //Register custom css
        wp_register_script(
            'modularity-mypages-profile',
            MODULARITY_MY_PAGES_URL . '/dist/' . CacheBust::name('js/modularity-mypages-profile.js'),
            null,
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_script('modularity-mypages-profile');
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

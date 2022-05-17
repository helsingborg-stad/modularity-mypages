<?php

namespace ModularityMyPages;

use ModularityMyPages\Helper\PageCache as PageCache;

/**
 * Class ModularityMyPages
 * @package ModularityMyPages
 */
class ProtectedPages
{
    private $protectedPostIDs = null; //Cache

    public function __construct()
    {
        add_action('template_redirect', array($this, 'templateRedirect'));
    }

    /**
     * Redirect to main page, if authentication is required on id.
     * Check auth.
     *
     * @return void
     */
    public function templateRedirect() //: void
    {
        if (in_array((int) get_queried_object_id(), $this->protectedPostIDs())) {
            PageCache::bypass();

            if (!Authentication::isAuthenticated()) {
                wp_redirect(home_url('/?signedOut=true'));
                die;
            }
        }
    }

    /**
     * Get array of protected post ids.
     *
     * @return array
     */
    private function protectedPostIDs(): array
    {
        if (!is_null($this->protectedPostIDs)) {
            return $this->protectedPostIDs;
        }

        return $this->protectedPostIDs = (array) get_field(
            'mypages_protected_post_ids',
            'option'
        );
    }
}

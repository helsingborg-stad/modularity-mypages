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
        $objectId = get_queried_object_id();

        if (is_numeric($objectId) && get_post_status($objectId) !== false) {
            if (in_array($objectId, $this->protectedPostIDs())) {
                PageCache::bypass();

                if (!Authentication::isAuthenticated()) {
                    wp_redirect(home_url());
                    die;
                }
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

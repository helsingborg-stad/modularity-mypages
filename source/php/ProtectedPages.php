<?php

namespace ModularityMyPages;

/**
 * Class ModularityMyPages
 * @package ModularityMyPages\Module
 */
class ProtectedPages
{
    public function __construct()
    {
        add_action('template_redirect', array($this, 'templateRedirect'));
    }

    public function templateRedirect() //: void
    {
        if (!$this->isAuthenticated() && in_array((int) get_queried_object_id(), $this->protectedPostIDs())) {
            wp_redirect(home_url('/?signedOut=true'));
            die;
        }
    }

    private function protectedPostIDs(): array
    {
        return (array) get_field(
            'mypages_protected_post_ids',
            'option'
        );
    }

    public function isAuthenticated(): bool
    {
        if (isset($_COOKIE['myPagesAuthenticated'])) {
            return true;
        }
        return false;
    }
}

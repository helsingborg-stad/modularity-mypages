<?php

namespace ModularityMyPages;

/**
 * Class ModularityMyPages
 * @package ModularityMyPages
 */
class ProtectedPages
{
    private $authenticationCookieName = 'myPagesAuthenticated';

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
        if (!$this->isAuthenticated() && in_array((int) get_queried_object_id(), $this->protectedPostIDs())) {
            wp_redirect(home_url('/?signedOut=true'));
            die;
        }
    }

    /**
     * Get array of protected post ids.
     *
     * @return array
     */
    private function protectedPostIDs(): array
    {
        return (array) get_field(
            'mypages_protected_post_ids',
            'option'
        );
    }

    /**
     * Check and validate authentication token.
     *
     * @return boolean
     */
    private function isAuthenticated(): bool
    {
        if (isset($_COOKIE[$this->authenticationCookieName])) {
            return $this->authTokenIsValid(
                $_COOKIE[$this->authenticationCookieName]
            );
        }
        return false;
    }

    /**
     * Validate auth token string
     *
     * @param string $token
     * @return boolean
     */
    private function authTokenIsValid(string $token): bool
    {
        return true;
    }
}

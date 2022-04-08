<div class="u-margin__top--5 u-display--flex u-align-items--center u-flex-direction--column">
    @button([
        'text' => 'Logga in med mobilt BankID',
        'color' => 'primary',
        'style' => 'filled',
        'type' => 'button',
        'classList' => ['u-width--100'],
        'attributeList' => ['data-mypages-login-primary' => '']
    ])
    @endbutton

    @button([
        'text' => 'BankID på fil?',
        'color' => 'default',
        'style' => 'basic',
        'type' => 'button',
        'attributeList' => ['data-mypages-login-secondary' => '']
    ])
    @endbutton
</div>
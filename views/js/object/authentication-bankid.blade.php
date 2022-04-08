<div class="u-margin__top--5 u-display--flex u-align-items--center u-flex-direction--column">
    @loader([
        'color' => 'primary',
        'classList' => ['u-margin__bottom--5'],
        'attributeList' => ['data-mypages-login-loader' => '']
    ])
    @endloader
    @typography([
        'variant' => 'p',
        'attributeList' => ['data-mypages-login-status' => '']
    ])
    Laddar...
    @endtypography
    <div data-mypages-login-qr></div>
    @button([
        'text' => 'Avbryt',
        'color' => 'default',
        'style' => 'basic',
        'type' => 'button',
        'attributeList' => ['data-mypages-login-abort' => '']
        ])
    @endbutton
</div>
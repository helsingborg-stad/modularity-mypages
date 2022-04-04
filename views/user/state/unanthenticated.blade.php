@button([
    'text' => 'Mitt konto',
    'color' => 'primary',
    'style' => 'basic',
    'href' => '#modal-mypages-login',
    'icon' => 'assignment_ind',
    'reversePositions' => true,
    'attributeList' => ['data-open' => 'modal-mypages-login']
])
@endbutton

@modal([
  'heading'=> "Mina sidor: Logga in",
  'id'=> 'modal-mypages-login',
  'size' => 'sm',
  'padding' => 4,
  'borderRadius' => 'sm'
])
    <p>Här kan du logga in på mina sidor. Det här är en POC som påvisar hur ett inloggningsförfarande kan fungera på webben.</p>

    @select([
        'label' => 'Välj inloggningsmetod',
        'id' => 'auth-method-select',
        'required' => true,
        'preselected' => 'mbid',
        'options' => [
            'mbid'  => 'Mobilt BankID',
            'cbid'  => 'BankID på datorn'
        ],
        'classList' => ['u-margin__top--4', 'u-margin__bottom--2']
    ])
    @endselect

    <!-- Broken stuff in modal. Needs fix. -->
    <style>
        .c-modal__close {
            display: none;
        } 
        .c-modal .c-icon.c-select__icon {
            left: auto;
        }
    </style>

    @slot('bottom')
        @button([
            'text' => 'Gå vidare',
            'color' => 'primary',
            'style' => 'filled',
            'id' => 'auth-continue',
            'classList' => ['u-float--right']
        ])
        @endbutton
    @endslot

@endmodal
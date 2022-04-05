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

    <div id="login-app"></div>

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
            'text' => 'Stäng',
            'color' => 'default',
            'style' => 'outlined',
            'id' => 'auth-continue',
            'classList' => ['u-float--left']
        ])
        @endbutton
    @endslot

@endmodal
@if (!$hideTitle)
    @typography([
        'element' => "h2",
        'classList' => ['u-margin__top--0', 'u-margin__bottom--2']
    ])
        {{ $postTitle }}
    @endtypography
@endif

@paper(['padding' => 3])

    @if(isset($_GET['submit']))
        <div class="o-grid">
            <div class="o-grid-12">
                @notice([
                    'type' => 'success',
                    'message' => [
                        'text' => $lang->info,
                        'size' => 'sm'
                    ],
                    'icon' => [
                        'name' => 'report',
                        'size' => 'md',
                        'color' => 'white'
                    ]
                ])
                @endnotice
            </div>
        </div>
    @endif

    <div class="o-grid">
        <div class="o-grid-12">
            @form([
                'attributeList' => [
                    'autocomplete' => 'on'
                ]
            ])
                <div class="o-grid">
                    <div class="o-grid-8@md">
                        @field([
                            'type' => 'text',
                            'value' => $user->email,
                            'placeholder' => 'email@email.com',
                            'attributeList' => [
                                'type' => 'email',
                                'name' => 'email',
                                'pattern' => '^[^@]+@[^@]+\.[^@]+$',
                                'autocomplete' => 'e-mail',
                                'data-invalid-message' => "You need to add a valid E-mail!"
                            ],
                            'label' => $lang->email,
                            'required' => true,
                        ])
                        @endfield
                    </div>

                    <div class="o-grid-8@md">
                        @field([
                            'type' => 'text',
                            'attributeList' => [
                                'type' => 'text',
                                'name' => 'text',
                            ],
                            'label' => $lang->phone,
                            'value' => $user->phone
                        ])
                        @endfield
                    </div>
                </div>

                <div class="o-grid">
                    <div class="o-grid-12">
                        @button([
                            'text' => $lang->submit,
                            'color' => 'primary',
                            'style' => 'filled',
                            'attributeList' => ['type' => 'submit'],
                            'href' => '/mina-sidor/?submit=true'
                        ])
                        @endbutton
                    </div>
                </div>
            @endform
        </div>
    </div>
@endpaper
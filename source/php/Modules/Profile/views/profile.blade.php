@if (!$hideTitle)
    @typography([
        'element' => "h2",
        'classList' => ['u-margin__top--0', 'u-margin__bottom--2']
    ])
        {{ $postTitle }}
    @endtypography
@endif

@paper(['padding' => 3])
    <div class="o-grid">
        <div class="o-grid-12">
            <div class="o-grid">
                <div class="o-grid-8@md">
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
                        ],
                        'attributeList' => [
                            'data-mypages-profile-notice' => ''
                        ],
                        'classList' => ['u-display--none', 'u-margin__bottom--3']
                    ])
                    @endnotice
                </div>
            </div>

            @loader([
                'color' => 'primary',
                'classList' => ['u-margin__top--5', 'u-margin__bottom--5'],
                'attributeList' => ['data-mypages-profile-loader' => ''],
            ])
            @endloader
            
            @form([
                'attributeList' => [
                    'data-mypages-profile-form' => ''
                ],
                'classList' => ['u-display--none']
            ])
                <div class="o-grid">
                    <div class="o-grid-8@md">
                        @field([
                            'placeholder' => 'email@email.com',
                            'attributeList' => [
                                'name' => 'email',
                                'data-invalid-message' => "You need to add a valid E-mail!",
                                'data-mypages-profile-field-email' => ''
                            ],
                            'label' => $lang->email,
                        ])
                        @endfield
                    </div>

                    <div class="o-grid-8@md">
                        @field([
                            'attributeList' => [
                                'name' => 'text',
                                'data-invalid-message' => "You need to add a valid number",
                                'data-mypages-profile-field-phone' => ''
                            ],
                            'label' => $lang->phone,
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
                            'attributeList' => [
                                'data-mypages-profile-submit' => ''
                            ]
                        ])
                        @endbutton
                    </div>
                </div>
            @endform
        </div>
    </div>
@endpaper
@if (!$hideTitle)
    @typography([
        'element' => "h2",
        'classList' => ['u-margin__top--0', 'u-margin__bottom--2']
    ])
        {{ $postTitle }}
    @endtypography
@endif

@paper(['padding' => 0])

    @collection([])
        @collection__item([
            'icon' => 'account_circle',
            'link' => 'https://link.link'
        ])
            @typography(['element' => 'h4'])
                Uppdatera din profil
            @endtypography
            @typography([])
                För att vi ska kunna ge dig bra service, så vill vi gärna ha mer information om dig.
            @endtypography
        @endcollection__item

        @collection__item([
            'icon' => 'assignment',
            'link' => 'https://link.link'
        ])
            @typography(['element' => 'h4'])
                Skicka in ditt ärende
            @endtypography
            @typography([])
                Du har ett ärende som du inte har avslutat, glöm inte att skicka in det.
            @endtypography
        @endcollection__item
    @endcollection
    
@endpaper
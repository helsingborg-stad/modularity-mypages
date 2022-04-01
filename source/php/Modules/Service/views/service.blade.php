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
            @notice([
                'type' => 'info',
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
@endpaper
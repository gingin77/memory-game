// Some styling experiments based on what I found here: https://info.patternizer.com/docs/

let bgCanvas = document.getElementById('bgCanvas');


bgCanvas.patternizer({
    stripes:[
        {
            color: '#ffb4d5',
            rotation: 45,
            opacity: 80,
            mode: 'normal',
            width: 30,
            gap: 10,
            offset: 0
        },
        {
            color: '#3a83d6',
            rotation: 200,
            opacity: 50,
            mode: 'plaid',
            width: 10,
            gap: 10,
            offset: 0
        }
    ],
    bg : '#ffffff'
});

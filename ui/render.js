render = (function() {
    var self = {};

    self.setImageBySrc = function(src) {
        var img = new Image();
        img.onload = function() {
            init(img, img.width, img.height);
        };
        img.src = src;
    };

    function init(image) {
        var $canvas = $('canvas');
        var context = $canvas.get(0).getContext('2d');
        var width = image.width;
        var height = image.height;

        $canvas.prop('width', width);
        $canvas.prop('height', height);
        context.drawImage(image, 0, 0);

        var pixels = context.getImageData(0, 0, width, height).data;

        var getPixel = function(x, y) {
                var pos = (y * (width * 4)) + (x * 4);
                return [pixels[pos], pixels[pos + 1], pixels[pos + 2], pixels[pos + 3]];
            };

        function clear() {
            context.drawImage(image, 0, 0);
        }

        function draw(ea) {
            ['a', 'b', 'c'].forEach(function(c) {
                c = ea.getChecked()[c];
                Object.keys(c).forEach(function(a) {
                    Object.keys(c[a]).forEach(function(b) {
                        context.fillRect(a, b, 1, 1);
                    });
                });
            });

            Object.keys(ea.borders.found).forEach(function(x) {
                Object.keys(ea.borders.found[x]).forEach(function(y) {
                    context.fillStyle = ['green', 'blue', 'red', 'yellow', 'orange'][ea.borders.found[x][y].id % 5];
                    context.fillRect(x, y, 1, 1);
                });
                context.fillStyle = 'black';
            });
        }

        function getMouePos($el, e) {
            return {
                x: e.offsetX - 1,
                y: e.offsetY - 1
            };
        }

        var i;
        $canvas.click(function(e) {
            if (i) clearInterval(i);
            var pos = getMouePos($canvas, e);
            var ea = new ExplodingAlgorithm(getPixel, pos.x, pos.y, width, height, 80);
            if (!$('#visualize').is(':checked')) {
                var t = Date.now();
                ea.run();
                t = Date.now() - t;
                console.log(t, 'ms');
                draw(ea);
                return;
            }
            var sleep = Math.floor(1000 / $('#fps').val());
            i = setInterval(function() {
                if (!ea.explode()) clearInterval(i);
                clear();
                draw(ea);
            }, sleep);
        });

        $('#fps').change(function() {
            var $fps = $(this);
            $fps.next().text($fps.val() + ' fps ish');
        }).change();


    };

    return self;
})();

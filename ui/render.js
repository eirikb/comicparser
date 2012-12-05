render = (function() {
    var self = {};
    var $canvas;
    var $visualize;
    var context;
    var sleep;
    var interval;
    var img = new Image();

    img.onload = function() {
        init(img, img.width, img.height);
    };

    self.setImageBySrc = function(src) {
        img.src = src;
    };

    self.stop = function() {
        clearInterval(interval);
    };

    function done(ea) {
        tabs.enable(3);
    }

    $(function() {
        $canvas = $('canvas');
        context = $canvas.get(0).getContext('2d');
        $visualize = $('#visualize');

        $('#fps').change(function() {
            var $fps = $(this);
            $fps.next().text($fps.val() + ' fps ish');
            sleep = Math.floor(1000 / $('#fps').val());
        }).change();
    });

    function getMouePos($el, e) {
        return {
            x: e.offsetX - 1,
            y: e.offsetY - 1
        };
    }

    function clear(image) {
        context.drawImage(image, 0, 0);
    }

    function draw(ea) { ['a', 'b', 'c'].forEach(function(c) {
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

    function init(image) {
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

        $canvas.off('click').click(function(e) {
            clearInterval(interval);
            var pos = getMouePos($canvas, e);
            var ea = new ExplodingAlgorithm(getPixel, pos.x, pos.y, width, height, 80);
            if (!$visualize.is(':checked')) {
                var t = Date.now();
                ea.run();
                t = Date.now() - t;
                draw(ea);
                done(ea);
                return;
            }
            interval = setInterval(function() {
                if (ea.explode()) {
                    clearInterval(interval);
                    done(ea);
                }
                clear(image);
                draw(ea);
                $('.complete').text(ea.stats.percentageComplete);
            },
            sleep);
        });
    }

    return self;
})();


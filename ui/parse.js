parse = (function() {
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

    self.stop = function() {
        clearTimeout(interval);
    };

    function done() {
        tabs.enable(2);
        $('#start').show();
        $('#stop').hide();
        $('#complete').show();
        $('.progress').removeClass('active');
    }

    $(function() {
        $canvas = $('#render');
        context = $canvas.get(0).getContext('2d');
        $visualize = $('#visualize');

        $('a[href=#parse]').on('show', function() {
            img.src = imageSelect.src;
        });

        if (window.localStorage && typeof localStorage.visualize !== 'undefine') {
            $visualize.prop('checked', 'true' === localStorage.visualize);
        }

        $visualize.change(function() {
            var isChecked = $visualize.is(':checked');
            $('.visualize')[isChecked ? 'slideDown' : 'slideUp']();
            if (window.localStorage) localStorage.visualize = isChecked;
        }).change()

        $('#complete').click(function() {
            tabs.show(2);
        });

        $('#fps').change(function() {
            var $fps = $(this);
            $fps.next().text($fps.val() + ' fps ish');
            sleep = Math.floor(1000 / $('#fps').val());
        }).change();

        $('[rel=tooltip]').tooltip();
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

    function draw() {
        ['a', 'b', 'c'].forEach(function(c) {
            c = self.ea.getChecked()[c];
            Object.keys(c).forEach(function(a) {
                Object.keys(c[a]).forEach(function(b) {
                    context.fillRect(a, b, 1, 1);
                });
            });
        });

        Object.keys(self.ea.borders.found).forEach(function(x) {
            Object.keys(self.ea.borders.found[x]).forEach(function(y) {
                context.fillStyle = ['green', 'blue', 'red', 'yellow', 'orange'][self.ea.borders.found[x][y].id % 5];
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

        function start(x, y) {
            $('#start').hide();
            $('#stop').show();
            $('#complete').hide();
            $('.progress').addClass('active');

            clearTimeout(interval);
            self.ea = new ExplodingAlgorithm(getPixel, x, y, width, height, 80);
            if (!$visualize.is(':checked')) {
                var t = Date.now();
                self.ea.run();
                t = Date.now() - t;
                draw();
                done();
                return;
            }

            var $bar = $('.progress .bar');
            (function loop() {
                if (self.ea.explode()) {
                    clearTimeout(interval);
                    done();
                }
                clear(image);
                draw();
                $bar.width(self.ea.stats.percentageComplete + '%');
                interval = setTimeout(loop, sleep);
            })();
        }

        $canvas.off('click').click(function(e) {
            var pos = getMouePos($canvas, e);
            start(pos.x, pos.y);
        });

        $('#start').click(function() {
            start(10, 10);
        });
        $('#stop').click(function() {
            self.stop();
            $('#start').show();
            $('#stop').hide();
        });
    }

    return self;
})();

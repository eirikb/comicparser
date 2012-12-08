results = (function() {
    var self = {};
    var img = new Image();

    img.onload = function() {
        init();
    };

    $(function() {
        $('[href=#results]').on('show', function() {
            $('.results').empty();
            img.src = select.src;
        });
    });

    function init() {
        var allBoders = parse.ea.borders.found;
        var borders = {};
        Object.keys(allBoders).forEach(function(x) {
            Object.keys(allBoders[x]).forEach(function(y) {
                var border = allBoders[x][y];
                var id = border.id;
                if (!borders[id]) borders[id] = [];
                borders[id].push({
                    x: parseInt(x, 10),
                    y: parseInt(y, 10)
                });
            });
        });
        Object.keys(borders).forEach(function(id) {
            var minX = Number.MAX_VALUE;
            var minY = Number.MAX_VALUE;
            var maxX = 0;
            var maxY = 0;

            var bs = borders[id];
            bs.forEach(function(pos) {
                if (pos.x > maxX) maxX = pos.x;
                if (pos.y > maxY) maxY = pos.y;
                if (pos.x < minX) minX = pos.x;
                if (pos.y < minY) minY = pos.y;
            });

            var width = maxX - minX;
            var height = maxY - minY;

            var $canvas = $('<canvas>');
            var context = $canvas.get(0).getContext('2d');

            $canvas.prop('width', width);
            $canvas.prop('height', height);

            context.drawImage(img, minX, minY, width, height, 0, 0, width, height);

            $('.results').append($('<li>').addClass('span3').append($canvas));
        });
    }


    return self;
})();

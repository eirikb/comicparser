common = (function() {
    var self = {};

    self.box = function(x, y, cb) {
        for (var y1 = y - 1; y1 < y + 2; y1++) {
            for (var x1 = x - 1; x1 < x + 2; x1++) {
                if (x1 !== x || y1 !== y) cb(x1, y1);
            }
        }
    };

    return self;
})();

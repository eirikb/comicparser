ExplodingAlgorithm = function(getPixel, x, y, width, height, percentage) {
    var self = this;
    var check = [];
    var checked = {
        a: {},
        b: {},
        c: {}
    };
    var current = 'a';
    self.stats = new Stats(width, height);
    self.borders = new Borders();

    var start = getPixelValue(x, y);
    check.push([x, y]);

    self.run = function() {
        while (!self.explode()) {}
    };

    self.explode = function() {
        self.stats.iterations++;

        var newCheck = [];
        check.forEach(function(a) {
            common.box(a[0], a[1], function(x, y) {
                if (!isChecked(x, y)) {
                    if (checkPixel(x, y)) self.borders.add(x, y);
                    else newCheck.push([x, y]);
                    setChecked(x, y);
                }
            });
        });

        check = newCheck;
        next();
        return check.length <= 0;
    };

    self.getChecked = function() {
        return checked;
    };

    function getPixelValue(x, y) {
        var px = getPixel(x, y);
        var value = 0;
        for (var i = 0; i < px.length; i++) {
            value += px[i];
        }
        return value / 4;
    }

    function checkPixel(x, y) {
        var px = getPixelValue(x, y);
        return px / start * 100 < percentage;
    }

    function next() {
        current = String.fromCharCode(97 + ((current.charCodeAt(0) - 96) % 3));
        checked[current] = {};
    }

    function setChecked(x, y) {
        var c = checked[current];
        if (!c[x]) c[x] = {};
        c[x][y] = true;
        self.stats.updatePercentageComplete(x, y);
    }

    function isChecked(x, y) {
        if (x < 0 || y < 0 || x >= width || y >= height) return true;
        if (checked.a[x] && checked.a[x][y]) return true;
        if (checked.b[x] && checked.b[x][y]) return true;
        if (checked.c[x] && checked.c[x][y]) return true;
    }
};


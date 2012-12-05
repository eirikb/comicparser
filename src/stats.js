Stats = function(width, height) {
    var self = this;
    self.iterations = 0;
    self.percentageComplete = 0;
    var sqr = width * height;

    var percentageHelper = {
        minX: Number.MAX_VALUE,
        minY: Number.MAX_VALUE,
        maxX: 0,
        maxY: 0
    };

    self.updatePercentageComplete = function(x, y) {
        if (x > percentageHelper.maxX) percentageHelper.maxX = x;
        if (y > percentageHelper.maxY) percentageHelper.maxY = y;
        if (x < percentageHelper.minX) percentageHelper.minX = x;
        if (y < percentageHelper.minY) percentageHelper.minY = y;
        var p1 = (percentageHelper.maxX - percentageHelper.minX);
        var p2 = (percentageHelper.maxY - percentageHelper.minY);
        var sqr2 = p1 * p2;
        var p3 = sqr2 / sqr * 100;

        self.percentageComplete = Math.floor(p3);
    };

    return self;
};


Borders = function() {
    var self = this;
    self.found = {};
    var nextid = 1;

    function getGroup(x, y) {
        var gs = [];
        common.box(x, y, function(x, y) {
            if (self.found[x] && self.found[x][y]) gs.push(self.found[x][y]);
        });
        if (gs.length === 0) {
            var g = {
                id: nextid++
            };
            return g;
        }
        if (gs.length === 1) return gs[0];
        var id = gs[0].id;
        gs.forEach(function(g) {
            g.id = id;
        });
        return gs[0];
    }

    self.add = function(x, y) {
        if (!self.found[x]) self.found[x] = {};

        var g = getGroup(x, y);

        self.found[x][y] = g;
    };
};

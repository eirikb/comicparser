results = (function() {
    var self = {};
    var img = new Image();

    img.onload = function() {
    };

    self.setImageBySrc = function(src) {
        img.src = src;
    };

    $(function() {
        $('[href=#results]').on('show', function() {

        });
    });

    return self;
})();

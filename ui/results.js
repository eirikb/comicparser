results = (function() {
    var self = {};
    var img = new Image();

    img.onload = function() {
    //    init(img, img.width, img.height);
    };

    self.setImageBySrc = function(src) {
        img.src = src;
    };

    return self;
})();

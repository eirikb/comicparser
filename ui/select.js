imageSelect = (function() {
    var self = {};

    $('.thumbnails a').click(function() {
        var $img = $(this).find('img');
        self.src = $img.attr('src');
        tabs.show(1);
    });

    return self;
})();

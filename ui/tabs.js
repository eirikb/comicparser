tabs = (function() {
    var self = {};

    self.enable = function(i) {
        $('.nav-tabs li').eq(i).removeClass('disabled');
    };

    self.show = function(i) {
        self.enable(i);
        $('.nav-tabs li a').eq(i).tab('show');
    };

    $('.nav-tabs li a').click(function() {
        var $this = $(this);
        if ($this.parent().hasClass('disabled')) return;
        $this.tab('show');
        parse.stop();
        return false;
    });

    return self;
})();

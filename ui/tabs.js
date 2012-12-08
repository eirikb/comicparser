tabs = (function() {
    var self = {};
    self.current = 0;

    function checkTabs() {
        $('.nav-tabs li').removeClass('disabled').each(function(i) {
            if (i > self.current) $(this).addClass('disabled');
        });
    }

    self.enable = function(i) {
        self.current = i;
        checkTabs();
    };

    self.show = function(i) {
        self.current = i;
        checkTabs();
        $('.nav-tabs li a').eq(i).tab('show');
    };

    $('.nav-tabs li a').click(function() {
        var $this = $(this);
        if ($this.parent().hasClass('disabled')) return;
        $this.tab('show');
        render.stop();
        self.current = $this.parent().index();
        console.log(self.current);
        checkTabs();
        return false;
    });

    $(checkTabs);

    return self;
})();

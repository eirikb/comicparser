tabs = (function() {
    var self = {};
    self.current = 0;

    function checkTabs() {
        $('.nav-tabs li').removeClass('disabled').each(function(i) {
            if (i > self.current) $(this).addClass('disabled');
        });
    }

    self.show = function(i) {
        self.current = i;
        checkTabs();
        $('.nav-tabs li a').eq(i).tab('show');
    };

    $('.nav-tabs li a').click(function() {
        if ($(this).parent().hasClass('disabled')) return;
        $(this).tab('show');
        return false;
    });

    $(checkTabs);

    return self;
})();

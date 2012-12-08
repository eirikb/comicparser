$(function() {
    $('.thumbnails a').click(function() {
        var $img = $(this).find('img');
        render.setImageBySrc($img.attr('src'));
        tabs.show(1);
    });
});

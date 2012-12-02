$(function() {
    $('.thumbnails a').click(function() {
        var $img = $(this).find('img');
        render.setImageBySrc($img.attr('src'));
        //render.setImage($img.get(0), $img.width(), $img.height());
        tabs.show(1);
    });
});

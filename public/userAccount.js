console.log('loaded');
$(function() {
    $("#logout").click(function () {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/logout',
            success: function(a) {
                console.log(a);
                window.location.reload();
                window.location.href = 'http://localhost:3000'
            }
        })
    })
});
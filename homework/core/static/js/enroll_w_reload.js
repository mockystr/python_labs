$(document).ready(function () {
    $('#respond_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function (data) {
                // console.log('perfect');
                $('.customers_list').html('<p class="text-center mt-4">Вы успешно отправили заявку!</p>\n')
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
});
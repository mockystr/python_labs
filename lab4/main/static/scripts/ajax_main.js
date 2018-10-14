$(document).ready(function () {
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    $(function () {
        $.ajaxSetup({
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            }
        });
    });
});

$('#find_product__form').on('submit', function (event) {
    event.preventDefault();

    let form = $("#find_product__form");
    if ($("#product_text").val()) {
        $.ajax({
            url: $(form).attr("action"),
            type: $(form).attr("method"),
            data:
            // $(form).serialize(),
                {
                    // csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                    product: $("#product_text").val(),
                },

            success: function (json) {
                console.log(json);
                $('#cont_of_list').html(json);
            },
            error: function (json) {
                console.log(json);
                $('#errors').html(
                    "<p class='text-center'>There\'s no result for your query<br>" +
                    "<a href='/' class='text-center'>Maybe try again?</a></p>"
                );
            },
        });
    }
    else {
        $("#errors").html("<p class='text-center'>Enter some words, please</p>");
    }
});

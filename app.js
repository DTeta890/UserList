$(document).ready(function () {
    $("#container").on("click", ".toggle", function () {
        let text = $(this).text();
        if (text == "YES") {
            alert(`Item with Id:${$(this).attr("id")} Status changed to passive!`);
            $(this).text("NO");
        } else {
            alert(`Item with Id:${$(this).attr("id")} Status changed to active!`);
            $(this).text("YES");
        }
    });
    $("#container").on("click", ".delete", function () {
        let selectTr = `#container>#${$(this).attr("id")}`;
        $(selectTr).fadeOut();
    });
    $("#btnLoad").click(function () {
        $("#container").empty();
        $.ajax({
            type: "Get",
            url: "https://reqres.in/api/users",
            dataType: "json",
            data: {},
            success: function (object) {
                $.each(object.data, function (i, item) {
                    $("#container").append(
                        `<tr id=${item.id}><td>${item.id}</td><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.email}</td><td class='toggle' id='${item.id}'>YES</td><td class='delete' id='${item.id}'>DELETE</td></tr>`
                    );
                });
            },
            error: function (response) {
                alert(response);
            },
        });
    });
});

//YES=tik NO=cross  DELETE=bin emoji

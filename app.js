$(document).ready(function () {
    // Active Status Switch
    $("#container").on("click", ".toggle", function () {
        if ($(this).hasClass("bi-check-circle-fill")) {
            alert(`Item with Id:${$(this).attr("id")} Status changed to passive!`);
            $(this).removeClass("bi-check-circle-fill");
            $(this).addClass("bi-pause-circle").css("color", "orange");
        } else if ($(this).hasClass("bi-pause-circle-fill")) {
            alert(`Item with Id:${$(this).attr("id")} Status changed to active!`);
            $(this).removeClass("bi-pause-circle-fill");
            $(this).addClass("bi-check-circle").css("color", "green");
        }
    });
    $("#container").on("mouseover", ".toggle", function () {
        if ($(this).hasClass("bi-check-circle")) {
            $(this).removeClass("bi-check-circle");
            $(this).addClass("bi-check-circle-fill");
        } else if ($(this).hasClass("bi-pause-circle")) {
            $(this).removeClass("bi-pause-circle");
            $(this).addClass("bi-pause-circle-fill");
        }
    });
    $("#container").on("mouseout", ".toggle", function () {
        if ($(this).hasClass("bi-check-circle-fill")) {
            $(this).removeClass("bi-check-circle-fill");
            $(this).addClass("bi-check-circle");
        } else if ($(this).hasClass("bi-pause-circle-fill")) {
            $(this).removeClass("bi-pause-circle-fill");
            $(this).addClass("bi-pause-circle");
        }
    });
    // Action Delete
    $("#container").on("click", ".delete", function () {
        let selectTr = `#container>#${$(this).attr("id")}`;
        $(selectTr).fadeOut();
    });
    $("#container").on("mouseover", ".delete", function () {
        $(this).removeClass("bi-trash");
        $(this).addClass("bi-trash-fill");
    });
    $("#container").on("mouseout", ".delete", function () {
        $(this).removeClass("bi-trash-fill");
        $(this).addClass("bi-trash");
    });
    // Button Load
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
                        `<tr id=${item.id}><td>${item.id}</td><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.email}</td><td><i id="1" class="bi-check-circle toggle" style="font-size: 1rem; color: green"></i></td><td><i id='${item.id}' class='bi-trash delete' style='font-size: 1rem; color: rgb(235, 62, 62)'></i></td></tr>`
                    );
                });
            },
            error: function (response) {
                console.log(response);
            },
        });
    });
    $(".page-link").click(function () {
        $("#container").empty();
        let pageUrl = `https://reqres.in/api/users?page=${$(this).text()}`;
        $.ajax({
            type: "Get",
            url: pageUrl,
            dataType: "json",
            data: {},
            success: function (object) {
                $.each(object.data, function (i, item) {
                    $("#container").append(
                        `<tr id=${item.id}><td>${item.id}</td><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.email}</td><td><i id="1" class="bi-check-circle toggle" style="font-size: 1rem; color: green"></i></td><td><i id='${item.id}' class='bi-trash delete' style='font-size: 1rem; color: rgb(235, 62, 62)'></i></td></tr>`
                    );
                });
            },
            error: function (response) {
                console.log(response);
            },
        });
    });
});

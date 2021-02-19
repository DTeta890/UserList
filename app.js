$(document).ready(function () {
    // Active Status Switch
    $("#container").on("click", ".toggle", function () {
        if ($(this).hasClass("bi-check-circle-fill")) {
            alert(`Item with Id: ${$(this).attr("id")} Status changed to passive!`);
            $(this).removeClass("bi-check-circle-fill");
            $(this).addClass("bi-pause-circle").css("color", "orange");
        } else if ($(this).hasClass("bi-pause-circle-fill")) {
            alert(`Item with Id: ${$(this).attr("id")} Status changed to active!`);
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
    // Load Plain Data Function
    function loadData(urlTarget) {
        $("#container").empty();
        $.ajax({
            type: "Get",
            url: urlTarget,
            dataType: "json",
            data: {},
            success: function (object) {
                $.each(object.data, function (i, item) {
                    $("#container").append(
                        `<tr id=${item.id}><th class="infoDetail">${item.id}</th><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.email}</td><td><i id="1" class="bi-check-circle toggle" style="font-size: 1rem; color: green"></i></td><td><i id='${item.id}' class='bi-trash delete' style='font-size: 1rem; color: rgb(235, 62, 62)'></i></td></tr>`
                    );
                });
            },
            error: function (response) {
                console.log(response);
            },
        });
    }
    // Button Load
    $("#btnLoad").click(function () {
        loadData("https://reqres.in/api/users");
    });
    // Pagination
    $(".page-link").click(function () {
        let pageUrl = `https://reqres.in/api/users?page=${$(this).text()}`;
        loadData(pageUrl);
    });
    //User Info Modal
    $("#container").on("click", ".infoDetail", function () {
        $(".modal-body").empty();
        $(this).attr("data-toggle", "modal").attr("data-target", "#userInfoModal");
        let targetUrl = `https://reqres.in/api/users/${$(this).text()}`;
        $.ajax({
            type: "Get",
            url: targetUrl,
            dataType: "json",
            data: {},
            success: function (object) {
                $(".modal-body").append(
                    `<img src="${object.data.avatar}" /><br /><br /><p>User Id: ${object.data.id}</p><p>Full Name: ${object.data.first_name} ${object.data.last_name}</p><p>Email: ${object.data.email}</p>`
                );
            },
            error: function (response) {
                console.log(response);
            },
        });
    });
});

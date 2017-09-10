function getResults() {

    $("#results").empty();

    $.getJSON("/articles", (data) => {
        for (var i = 0; i < data.length; i++) {
            $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id +
                "><img src=" + data[i].url + "><br /><span class='dataTitle' data-id=" +
                data[i]._id + "><h2>" + data[i].title +
                "</h2><a href=" + data[i].link +
                ">More...</a></span>" + data[i].desc + "</p>" +
                "<button id='likebtn' data-id='" +
                data[i]._id + "' class='btn'> Likes <span id='likesCount" + data[i]._id + "' class='badge badge-secondary'>" + data[i].like + "</span></button><button type='button' id='comment' class='btn btn-primary' data-toggle='modal' data-target='commentModal' data-id=" +
                data[i]._id + ">Comment</button>");
        }
    });
}

$(document).on("click", "#comment", function() {

    $('#commentModal').modal('toggle');

    $("#commentbox").empty();

    let thisId = $(this).attr("data-id");

    $.ajax({
            method: "GET",
            url: "articles/" + thisId
        })
        .done(function(data) {
            console.log(data);

            $('.modal-footer').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" id="savecomment" data-id="' + data._id + '" class="btn btn-primary">Submit</button>')

            if (data.comments) {
                for (let i = 0; i < data.comments.length; i++) {
                    $.ajax({
                            method: "GET",
                            url: "articles/" + thisId + "/" + data.comments[i]
                        })
                        .done(function(data) {
                            console.log(data);

                            $("#commentbox").append("<hr />");
                            $("#commentbox").append("<h5>" + data.title + "</h5>");
                            $("#commentbox").append("<p>" + data.body + "</p>");
                        })
                }

            }
        })
})

$(document).on("click", "#savecomment", function() {
    $("#commentbox").empty();
    let thisId = $(this).attr("data-id");
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#body").val()
            }
        })
        // With that done
        .done(function(data) {

            $.ajax({
                    method: "GET",
                    url: "articles/" + thisId
                })
                .done(function(data) {
                    console.log(data);
                    if (data.comments) {
                        for (let i = 0; i < data.comments.length; i++) {
                            $.ajax({
                                    method: "GET",
                                    url: "articles/" + thisId + "/" + data.comments[i]
                                })
                                .done(function(data) {
                                    console.log(data);

                                    $("#commentbox").append("<hr />");
                                    $("#commentbox").append("<h5>" + data.title + "</h5>");
                                    $("#commentbox").append("<p>" + data.body + "</p>");
                                })
                        }

                    }
                })
        });

    // Empty inputs
    $("#titleinput").val("");
    $("#body").val("");
})

$(document).on("click", "#likebtn", function() {
    let thisId = $(this).attr("data-id");
    $.ajax({
            method: "GET",
            url: "articles/" + thisId
        })
        .done(function(data) {

            let newLike = data.like + 1;
            console.log(newLike);
            $.ajax({
                    method: "POST",
                    url: "articles/" + thisId + "/like",
                    data: {
                        likes: newLike
                    }
                })
                .done(function(data) {
                    $.ajax({
                            method: "GET",
                            url: "articles/" + thisId
                        })
                        .done(function(data) {
                            console.log(data);
                            $("#likesCount" + data._id).text(data.like);
                        })
                })
        })
})

getResults();
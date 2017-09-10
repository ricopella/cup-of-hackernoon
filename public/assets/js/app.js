function getResults() {

    $("#results").empty();

    $.getJSON("/articles", (data) => {
        for (var i = 0; i < data.length; i++) {
            $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id +
                "><img src=" + data[i].url + "><br /><span class='dataTitle' data-id=" +
                data[i]._id + "><h2>" + data[i].title +
                "</h2></span>" + data[i].desc + "<a class='hacklink' href=" + data[i].link +
                ">More...</a></p>" +
                "<button id='likebtn' data-id='" +
                data[i]._id + "' class='btn'> Likes <span id='likesCount" + data[i]._id +
                "' class='badge badge-secondary'>" + data[i].like +
                "</span></button><button type='button' id='comment' class='btn btn-primary'" +
                "data-toggle='modal' data-target='commentModal' data-id=" +
                data[i]._id + ">Comment</button>");
        }
    });
}

// retrieve comments
$(document).on("click", "#comment", function() {

    $('#commentModal').modal('toggle');

    $("#commentbox").empty();

    let thisId = $(this).attr("data-id");

    $.ajax({
            method: "GET",
            url: "articles/" + thisId
        })
        .done(function(data) {

            $('.modal-footer').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" id="savecomment" data-id="' + data._id + '" class="btn btn-primary">Submit</button>')

            if (data.comments) {
                for (let i = 0; i < data.comments.length; i++) {
                    $.ajax({
                            method: "GET",
                            url: "articles/" + thisId + "/" + data.comments[i]
                        })
                        .done(function(data) {
                            console.log(data);

                            $("#commentbox").append("<hr /><h5>" + data.title + "</h5><button type='button' data-id='" + data._id + "' data-par='" + thisId + "' class='close closecom' aria-label='Close'><span title='Delete Comment' aria-hidden='true'>&times;</span></button>");
                            $("#commentbox").append("<p>" + data.body + "</p>");
                            $("#commentbox").append("<p class='commentdate'>Comment Date: " + moment.utc(data.createdDate).format('MM-DD-YYYY hh:MM') + "</p>");
                        })
                }

            }
        })
})

// create new comment
$(document).on("click", "#savecomment", function() {
    $("#commentbox").empty();
    let thisId = $(this).attr("data-id");
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#body").val()
            }
        })
        .done(function(data) {
            $.ajax({
                    method: "GET",
                    url: "articles/" + thisId
                })
                .done(function(data) {
                    if (data.comments) {
                        for (let i = 0; i < data.comments.length; i++) {
                            $.ajax({
                                    method: "GET",
                                    url: "articles/" + thisId + "/" + data.comments[i]
                                })
                                .done(function(data) {
                                    $("#commentbox").append("<hr /><h5>" + data.title + "</h5><button type='button' data-par='" + thisId + "' data-id='" + data._id + "' class='close closecom' aria-label='Close'><span title='Delete Comment' aria-hidden='true'>&times;</span></button>");
                                    $("#commentbox").append("<p>" + data.body + "</p>");
                                    $("#commentbox").append("<p class='commentdate'>Comment Date: " + moment.utc(data.createdDate, "MM-DD-YYYY") + "</p>");
                                })
                        }

                    }
                })
        });

    // Empty inputs
    $("#titleinput").val("");
    $("#body").val("");
})

// delete comment
$(document).on("click", ".closecom", function() {
    let thisId = $(this).attr("data-id");
    let articleId = $(this).attr("data-par");

    $.ajax({
            method: "DELETE",
            type: "DELETE",
            url: "articles/" + articleId + "/" + thisId
        })
        .done(function(data) {
            $.ajax({
                    method: "GET",
                    url: "articles/" + articleId
                })
                .done(function(data) {
                    $("#commentbox").empty();
                    if (data.comments) {

                        for (let i = 0; i < data.comments.length; i++) {
                            $.ajax({
                                    method: "GET",
                                    url: "articles/" + articleId + "/" + data.comments[i]
                                })
                                .done(function(data) {
                                    $("#commentbox").append("<hr /><h5>" + data.title + "</h5><button type='button' data-par='" + thisId + "' data-id='" + data._id + "' class='close closecom' aria-label='Close'><span title='Delete Comment' aria-hidden='true'>&times;</span></button>");
                                    $("#commentbox").append("<p>" + data.body + "</p>");
                                    $("#commentbox").append("<p class='commentdate'>Comment Date: " + moment.utc(data.createdDate, "MM-DD-YYYY") + "</p>");

                                })
                        }

                    }
                })
        })
})

// updating likes
$(document).on("click", "#likebtn", function() {
    let thisId = $(this).attr("data-id");
    // get current likes count
    $.ajax({
            method: "GET",
            url: "articles/" + thisId
        })
        .done(function(data) {

            let newLike = data.like + 1;
            // update likes count
            $.ajax({
                    method: "POST",
                    url: "articles/" + thisId + "/like",
                    data: {
                        likes: newLike
                    }
                })
                .done(function(data) {
                    // update page with current likes count
                    $.ajax({
                            method: "GET",
                            url: "articles/" + thisId
                        })
                        .done(function(data) {
                            $("#likesCount" + data._id).text(data.like);
                        })
                })
        })
})


// nav slide effects

// slide effects - top
$("#nav-heading").on("click", () => {
    $('html, body').animate({
        scrollTop: $("#heading").offset().top
    }, 1000);
});

$("#nav-articles").on("click", () => {
    $('html, body').animate({
        scrollTop: $("#results").offset().top
    }, 1000);
});


$(document).ready(function() {
    getResults();
});
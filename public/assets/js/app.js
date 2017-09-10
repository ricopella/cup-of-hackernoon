function getResults() {

    $("#results").empty();

    $.getJSON("/articles", (data) => {
        for (var i = 0; i < data.length; i++) {
            $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><img src=" + data[i].url + "><br /><span class='dataTitle' data-id=" +
                data[i]._id + "><h2>" + data[i].title + "</h2><a href=" + data[i].link + ">More...</a></span>" + data[i].desc + "<a href='*'> + LIKE + </a></p><button type='button' id='comment' class='btn btn-primary' data-toggle='modal' data-target='commentModal' data-id=" +
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
            // console.log(data);

            $('.modal-footer').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" id="savecomment" data-id="' + data._id + '" class="btn btn-primary">Submit</button>')

            if (data.comments) {
                for (let i = 0; i < data.comments.length; i++) {

                    $("#commentbox").append("<h2>Previous Comments</h2>");
                    $("#commentbox").append("<h5>" + data.comments.title + "</h5>");
                    $("#commentbox").append("<p>" + data.comments.body + "</p>");
                }

            }
        })
})

$(document).on("click", "#savecomment", function() {
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
            // Log the response
            // console.log(data);
            // Empty the notes section

            $.ajax({
                    method: "GET",
                    url: "articles/" + thisId
                })
                .done(function(data) {
                    console.log(data);
                    if (data.comments) {
                        for (let i = 0; i < data.comments.length; i++) {
                            $("#commentbox").append("<h2>Previous Comments</h2>");
                            $("#commentbox").append("<h5>" + data.comments.title + "</h5>");
                            $("#commentbox").append("<p>" + data.comments.body + "</p>");
                        }

                    }
                })
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
})




getResults();
function getResults() {

    $("#results").empty();

    $.getJSON("/all", (data) => {
        for (var i = 0; i < data.length; i++) {
            $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
                data[i]._id + ">" + data[i].title + "</span><span class=deleter>X</span>" + data[i].desc + "</p>");
        }
    });
}

getResults();
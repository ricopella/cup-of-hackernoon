function getResults() {

    $("#results").empty();

    $.getJSON("/articles", (data) => {
        for (var i = 0; i < data.length; i++) {
            $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><img src=" + data[i].url + "><br /><span class='dataTitle' data-id=" +
                data[i]._id + "><a href=" + data[i].link + ">" + data[i].title + "</a></span><span class=like> + LIKE + </span>" + data[i].desc + "</p>");
        }
    });
}

getResults();
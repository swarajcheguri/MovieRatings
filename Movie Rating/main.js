(function () {
    var $ = jQuery;
    var movieRatings = (function () {
        var intailize = function () {
            getJsonData();
            search();
        };
        var movieDetails;
        var getJsonData = function () {
            $.ajax({
                url: "http://netflixroulette.net/api/api.php?director=Quentin",
                success: function (result) {
                    movieDetails = result;
                    sortMovieDetails();
                    fillRows()
                }
            });


        };
        var fillRows = function () {
            var htmlStr = '';
            for (var i = 0; i < movieDetails.length; i++) {

                var dummyRow = $('.dummyTable tbody').clone();
                var movieObj = movieDetails[i];
                var src = movieObj.poster;
                dummyRow.find('.dummyRow').attr('title', movieObj.show_title).attr('class', 'movieRow');
                dummyRow.find('.poster').attr('alt', movieObj.show_title.concat(" Poster")).attr('src', src).attr('title', movieObj.show_title);
                dummyRow.find('.movieName').html(movieObj.show_title);
                dummyRow.find('.movieStory').html(movieObj.summary);
                dummyRow.find('.director').html(movieObj.director);
                dummyRow.find('.rating').html(movieObj.rating);
                htmlStr = htmlStr.concat(dummyRow.html());
                
            }
            $('.movieTable tbody').html(htmlStr);
           
        };
        var sortMovieDetails = function () {
            movieDetails.sort(function (a, b) {
                if (parseFloat(a.rating) < parseFloat(b.rating))
                    return 1;
                else if (parseFloat(a.rating) > parseFloat(b.rating))
                    return -1;
                else if (a.show_title.length > b.show_title.length)
                    return 1;
                else if (a.show_title.length < b.show_title.length)
                    return -1;
                else if (a.show_title > b.show_title)
                    return 1;
                else if (a.show_title < b.show_title)
                    return -1;
                else
                    return 0;
            });

        };
        var search = function () {
           
            $('#search').keyup(function () {
                searchExecute();
            });
            $('#btnSearch').unbind('click').click(function () {
                searchExecute();
            });
        }
        var searchExecute = function () {
                var val = $.trim($('#search').val()).replace(/ +/g, ' ').toLowerCase();
                var $rows = $('.movieTable tr');
                $rows.show().filter(function () {
                    var text = $(this).attr("title").replace(/\s+/g, ' ').toLowerCase();
                    return !~text.indexOf(val);
                }).hide();

           
        };
        return {
            start: intailize

        }

    })();


    $(document).ready(function () {


        movieRatings.start();

    });
}());
(function () {
    var $ = jQuery;
    var movieRatings = (function () {
        var intailize = function () {            
            search();
        };
        var movieDetails;
        var getJsonData = function (queryValue) {
            $.ajax({
                url: "http://netflixroulette.net/api/api.php?director=" + queryValue,
                success: function (result) {
                    movieDetails = result;
                    sortMovieDetails();
                    fillRows();
                    $('#myModal').modal('hide');
                },
                error: function (xhr, status, error) {
                    $('#myModal').modal('hide');
                    alert("An Error occured while reterving the data");
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
        var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
        var search = function () {
           
            
            $('#btnSearch').unbind('click').click(function () {
                
                $('#myModal').modal()
                searchExecute();
                
            });
        }
        var searchExecute = function () {
            var val = $('#search').val().trim();
            getJsonData(val);
                         
        };
        return {
            start: intailize

        }

    })();


    $(document).ready(function () {


        movieRatings.start();

    });
}());
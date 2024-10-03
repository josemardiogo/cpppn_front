$(document).ready(function() {
    $('#searchButton').on('click', function() {
        $('#searchInput').toggleClass('expand').toggleClass('hide')
        if (!$('#searchInput').hasClass('expand'))
            $('#searchInput').addClass('hide')
        else {
            $('#searchInput').removeClass('hide')
        }
        $('#searchInput').focus();
    });

    $('#clearButton').on('click', function() {
        $('#searchInput').val('');
        $('#searchInput').focus();
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-container').length) {
            $('#searchInput').removeClass('expand').addClass('hide');
        }
    });
});
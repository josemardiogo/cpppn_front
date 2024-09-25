$(document).ready(function() {
    $('#searchButton').on('click', function() {
        $('#searchInput').toggleClass('expand');
        $('#searchInput').focus();
    });

    $('#clearButton').on('click', function() {
        $('#searchInput').val('');
        $('#searchInput').focus();
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-container').length) {
            $('#searchInput').removeClass('expand');
        }
    });
});
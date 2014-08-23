window.fbAsyncInit = function () {
    FB.Event.subscribe('xfbml.render', function () {
        document.getElementsByClassName("social-buttons")[0].style.opacity = "1";
    });

    FB.Event.subscribe('edge.create', function () {
        ga('send', 'social', 'facebook', 'like', 'http://steamworkshopdownloader.com');
    });
};

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function trackOutboundLink(e) {
    var url = e.getAttribute('href');
    ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
        function () {
            document.location = url;
        }
    });
}
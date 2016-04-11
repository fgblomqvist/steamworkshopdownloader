window.fbAsyncInit = function () {
    FB.Event.subscribe('xfbml.render', function () {
        document.getElementsByClassName("social-buttons")[0].style.opacity = "1";
    });

    FB.Event.subscribe('edge.create', function () {
        ga('send', 'social', 'Facebook', 'Like', 'http://steamworkshopdownloader.com/');
    });
};

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function trackOutboundLink(e) {
    var url = e.getAttribute('href');
    ga('send', 'event', 'Outbound', 'Click', url, {'hitCallback':
        function () {
            window.location.href = url;
        }
    });
}

function downloadUserscript() {
    // prompt the user about the requirement of a browser extension
    var answer = confirm('To install and use a userscript you need to have a browser extension such as GreaseMonkey or Tampermonkey installed.\n\n' +
                         'If you do not have such an extension installed you will not be able to install the userscript.\n\n' +
                         'Press OK to install the script');

    if (answer) {
        // send install event to GA
        ga('send', 'event', {
            'eventCategory': 'Userscript',
            'eventAction': 'Install',
            'hitCallback': function () {
                window.location.href = '/static/files/swd.user.js';
            }
        });
    }
}
window.onload = function() {

    // if the viewport is big enough, inject the ad
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if (width <= 768) {
        return;
    }

    // by doing a timeout of 0, the ad will be injected after the rest of the javascript has run,
    // such as the social buttons
    setTimeout(function(){
        var adElement = document.getElementById("ad");
        adElement.innerHTML =
            "<iframe src='https://yepdigital.adk2.co/yepdigital/tags/xdirect/xdirect.html?p=72466953&serverdomain=yepdigital&size=728x90&secure=true&ct=html&ap=1300' height='90' width='728' frameborder='0' border='0' marginwidth='0' marginheight='0' scrolling='no'></iframe>";

        // display the ad
        document.getElementById("ad-wrapper").style.display = "block";
    }, 0);
};

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
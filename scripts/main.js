requirejs.config({
    baseUrl: 'dist/scripts',
    // paths
    paths: {
        'jquery': 'jquery.min',
        'popper': 'popper',
        'bootstrap': 'bootstrap.min',
        "initBootstrap": "...wotever...",
        'scripts': 'scripts.min'
    },
    shim : {
        "bootstrap" : ["jquery"]
    }
});

require(['jquery'], function($) {
    console.log("Load jQuery")
});

define("initBootstrap", ["popper"], function(popper) {
    // set popper as required by Bootstrap
    window.Popper = popper;
    require(["bootstrap"], function(bootstrap) {
        // do nothing - just let Bootstrap initialise itself
    });
});

require(['scripts'], function() {
    console.log("Load SCripts")
});



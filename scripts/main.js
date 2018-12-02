requirejs.config({
    // paths
    paths: {
        'jquery': 'jquery.min',
        'bootstrap': 'bootstrap.bundle.min', // includes popper.js
        'scripts': 'scripts.min'
    },
    shim : {
        "bootstrap" : ["jquery"]
    }
});


require(['jquery'], function($) {
    console.log("Load jQuery")
});

require(["bootstrap"]);

require(['scripts'], function() {
    console.log("Load SCripts")
});




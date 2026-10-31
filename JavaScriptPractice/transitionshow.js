
/*
Random Transitions Slideshow
By JavaScript Kit (www.javascriptkit.com)
Created: November 3, 2008

This script controls the automatic image slideshow.
*/

// Array of Internet Explorer transition effects
var global_transitions = [
    "progid:DXImageTransform.Microsoft.Barn()",
    "progid:DXImageTransform.Microsoft.Blinds()",
    "progid:DXImageTransform.Microsoft.CheckerBoard()",
    "progid:DXImageTransform.Microsoft.Fade()",
    "progid:DXImageTransform.Microsoft.GradientWipe()",
    "progid:DXImageTransform.Microsoft.Inset()",
    "progid:DXImageTransform.Microsoft.Iris()",
    "progid:DXImageTransform.Microsoft.Pixelate(maxSquare=15)",
    "progid:DXImageTransform.Microsoft.RadialWipe()",
    "progid:DXImageTransform.Microsoft.RandomBars()",
    "progid:DXImageTransform.Microsoft.RandomDissolve()",
    "progid:DXImageTransform.Microsoft.Slide()",
    "progid:DXImageTransform.Microsoft.Spiral()",
    "progid:DXImageTransform.Microsoft.Stretch()",
    "progid:DXImageTransform.Microsoft.Strips()",
    "progid:DXImageTransform.Microsoft.Wheel()",
    "progid:DXImageTransform.Microsoft.Zigzag()"
];

// Create and initialize the slideshow
function flashyslideshow(setting) {

    this.wrapperid = setting.wrapperid;
    this.imagearray = setting.imagearray;
    this.pause = setting.pause;
    this.transduration = setting.transduration / 1000;
    this.currentimg = 0;

    // Preload all slideshow images
    var preloadimages = [];

    for (var i = 0; i < this.imagearray.length; i++) {
        preloadimages[i] = new Image();
        preloadimages[i].src = this.imagearray[i][0];
    }

    // Create the slideshow container
    document.write(
        '<div id="' + this.wrapperid +
        '" class="' + setting.wrapperclass +
        '"><div id="' + this.wrapperid +
        '_inner" style="width:100%">' +
        this.getSlideHTML(this.currentimg) +
        '</div></div>'
    );

    // Select a random transition
    var effectindex = Math.floor(
        Math.random() * global_transitions.length
    );

    var contentdiv = document.getElementById(
        this.wrapperid + "_inner"
    );

    // Apply older Internet Explorer transitions
    if (contentdiv.filters) {
        contentdiv.style.filter =
            global_transitions[effectindex];

        this.pause += setting.transduration;
    }

    this.filtersupport =
        (contentdiv.filters && contentdiv.filters.length > 0)
        ? true
        : false;

    var slideshow = this;

    // Pause slideshow when the mouse is over it
    flashyslideshow.addEvent(
        contentdiv,
        function() {
            slideshow.isMouseover = 1;
        },
        "mouseover"
    );

    // Resume slideshow when the mouse leaves
    flashyslideshow.addEvent(
        contentdiv,
        function() {
            slideshow.isMouseover = 0;
        },
        "mouseout"
    );

    // Automatically rotate slideshow images
    setInterval(function() {
        slideshow.rotate();
    }, this.pause);
}

// Add browser event listeners
flashyslideshow.addEvent = function(
    target,
    functionref,
    tasktype
) {

    if (target.addEventListener) {
        target.addEventListener(
            tasktype,
            functionref,
            false
        );
    } else if (target.attachEvent) {
        target.attachEvent(
            "on" + tasktype,
            function() {
                return functionref.call(
                    target,
                    window.event
                );
            }
        );
    }
};

// Change the opacity of an image
flashyslideshow.setopacity = function(el, degree) {

    if (typeof el.style.opacity != "undefined") {
        el.style.opacity = degree;
    } else {
        el.style.MozOpacity = degree;
    }

    el.currentopacity = degree;
};

// Generate the HTML for the current slide
flashyslideshow.prototype.getSlideHTML = function(index) {

    var slideHTML = this.imagearray[index][1]
        ? '<a href="' + this.imagearray[index][1] +
          '" target="' + this.imagearray[index][2] + '">\n'
        : '';

    slideHTML +=
        '<img src="' + this.imagearray[index][0] + '" />';

    slideHTML += this.imagearray[index][1]
        ? '</a><br />'
        : '<br />';

    slideHTML += this.imagearray[index][3]
        ? this.imagearray[index][3]
        : '';

    return slideHTML;
};

// Rotate to the next slideshow image
flashyslideshow.prototype.rotate = function() {

    var contentdiv = document.getElementById(
        this.wrapperid + "_inner"
    );

    // Stop rotating while the mouse is over the slideshow
    if (this.isMouseover) {
        return;
    }

    // Move to the next image or return to the first
    this.currentimg =
        (this.currentimg < this.imagearray.length - 1)
        ? this.currentimg + 1
        : 0;

    if (this.filtersupport) {
        contentdiv.filters[0].apply();
    } else {
        flashyslideshow.setopacity(contentdiv, 0);
    }

    // Display the new image and caption
    contentdiv.innerHTML =
        this.getSlideHTML(this.currentimg);

    if (this.filtersupport) {

        contentdiv.filters[0].play(this.transduration);

    } else {

        // Fade in the new image
        contentdiv.fadetimer = setInterval(function() {

            if (contentdiv.currentopacity < 1) {

                flashyslideshow.setopacity(
                    contentdiv,
                    contentdiv.currentopacity + 0.1
                );

            } else {

                clearInterval(contentdiv.fadetimer);

            }

        }, 50);
    }
};

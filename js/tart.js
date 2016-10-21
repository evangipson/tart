// The TART variable that holds our information
// to start the game.
let TART = (function() {
    // I'd like to use ECMAScript for this project.
    'use strict';
    // The module we'll end up returning
    // after we augment it.
    const tartModule = {};
    // Variables needed in functions, will
    // eventually get their own data file.
    const randomCSSClasses = [
        "atep",
        "munbar",
        "flattel",
        "miscin",
        "narlal",
        "marbit",
        "till",
        "bhozar",
        "flibbit",
        "krandiss",
        "yonlis",
        "lobar",
        "twarm",
        "pingbo",
        "gandar"
    ];
    // Block scoped, immutable.
    // (Can't be assigned new content)
    const boxAmount = 333;
    const boxWidthLimit = 155;
    const boxHeightLimit = 104;
    // Block scoped, mutable.
    let boxWidth, boxHeight = 0;
    // Returns a number, defaults 0-100.
    function randomNum(highNum = 100) {
        return Math.floor(Math.random() * parseInt(highNum));
    }
    // Returns a hex value in the form of:
    // "#xxxxxx" where x is a hex value 0-F.
    // From comments here:
    // https://www.paulirish.com/2009/random-hex-color-code-snippets/
    function generateHexColor() {
        return "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
    }
    // Returns a random element from an array
    // that will be passed in, defaults to returning
    // 1, 2, or 3.
    function getRandomElement(sourceArray = [1, 2, 3]) {
        return sourceArray[randomNum(sourceArray.length)];
    }
    // Will return an up to 5 character long string
    // when invoked. Can be overridden by passing
    // a new "possible" characters string.
    function generateString(possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
        let text = "";
        for(let i = 0; i < 5; i++) {
            if(randomNum() > 50) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }
        return text;
    }
    function createBox() {
        // Set boxWidth and boxHeight
        boxWidth = randomNum(boxWidthLimit);
        boxHeight = randomNum(boxHeightLimit);
    }
    function draw() {
        // Initialize boxElement outside of our for loop
        let boxElement = document.createElement("span");
        for(let i = 0; i < boxAmount; i++) {
            // Create a new span element
            boxElement = document.createElement("span");
            // Reset the height and width
            createBox();
            // Now apply them to the boxElement.
            boxElement.style.width = boxWidth + "px";
            boxElement.style.height = boxHeight + "px";
            // Assign the box a random class
            boxElement.classList.add(getRandomElement(randomCSSClasses));
            // Fill in the box's value with some weird value.
            boxElement.innerText = generateString();
            // Add a bunch of random CSS rules
            boxElement.style.backgroundColor = generateHexColor();
            boxElement.style.color = generateHexColor();
            // Logic here: I want the font size to be no bigger
            // than 2rem, but no smaller than 0.02rem.
            boxElement.style.fontSize = (Math.random() + (Math.random() * 0.5)) + "rem";
            boxElement.style.textAlign = Math.random() > 0.3 ? "left" : "right";
            // Append the new element to the body
            document.body.appendChild(boxElement);
        }
    }
    /* This function will continually call itself
     * to "pulse" the background of the document.body. */
    function addBodyPulse(bodyTransition = false, animationTimeMS = 8000) {
        /* If this is our first time calling the function, set the
         * background and call the function again. */
        if(!bodyTransition) {
            document.body.style.webkitTransition = "background " + animationTimeMS/1000 + "s";
            /* Call our function again in 1ms
             * to give the CSS time to "refresh?"
             * (I know there's a better answer here, why
             * wouldn't this work without setTimeout?) */
            setTimeout(function(){ 
                addBodyPulse(true);
            }, 1);
        }
        /* If we've already called this function and
         * set the bodyTransition, we should call this
         * function again in the animationTimeMS specified. */
        else {
            document.body.style.background = generateHexColor();
            setTimeout(function(){
                addBodyPulse();
            }, animationTimeMS);
        }
    }
    // Initialization function for TART.
    tartModule.init = function() {
        draw();
        addBodyPulse();
        // createEventListeners();
    };
    // I told you so! We're returning our module.
    return tartModule;

    /* Deprecated functions
    function addHoverClass(element) {
        if(!element.classList.contains("touched")) {
            element.classList.add("touched");
        }
    }

    function createEventListeners() {
        let spans = document.getElementsByTagName("SPAN");
        for(let span in spans) {
            // Make sure we aren't acting on prototype properties
            if(spans.hasOwnProperty(span)) {
                spans[span].addEventListener("mouseenter", addHoverClass(spans[span]));
            }
        }
    } */
})(); // Immediately Invoked Function Expression.

// Call our initialization function, as GBG is already
// instantiated because of it's IIFE nature.
TART.init();
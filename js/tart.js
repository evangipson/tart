/* The TART variable that holds our information
 * to start the game. */
let TART = (function() {
    // I'd like to use ECMAScript for this project.
    'use strict';
    /* The module we'll end up returning
     * after we augment it. */
    const tartModule = {};
    /* Variables needed in functions, will
     * eventually get their own data file. */
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
        "gandar",
        "blozon",
        "mangar",
        "kladdis",
        "fonu",
        "craynar"
    ];
    /* Block scoped, immutable.
     * (Can't be assigned new content) */
    let boxAmount = randomNum(200) + 150;
    let boxWidthLimit = randomNum(250) + randomNum(40) + 20;
    let boxHeightLimit = randomNum(250) + randomNum(20) + 10;
    // Block scoped, mutable.
    let boxWidth, boxHeight = 0;
    // Returns a number, defaults 0-100.
    function randomNum(highNum = 100) {
        return Math.floor(Math.random() * parseInt(highNum));
    }
    /* Returns a hex value in the form of:
     * "#xxxxxx" where x is a hex value 0-F.
     * From comments here:
     * https://www.paulirish.com/2009/random-hex-color-code-snippets/ */
    function generateHexColor() {
        return "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
    }
    /* Returns a random element from an array
     * that will be passed in, defaults to returning
     * 1, 2, or 3. */
    function getRandomElement(sourceArray = [1, 2, 3]) {
        return sourceArray[randomNum(sourceArray.length)];
    }
    /* Will return an up to 5 character long string
     * when invoked. Can be overridden by passing
     * a new "possible" characters string. */
    function generateString(possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
        let text = "";
        for(let i = 0; i < 5; i++) {
            if(randomNum() > 50) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }
        return text;
    }
    /* Draws all the boxes on the screen using
     * span elements then attaching them to the body. */
    function drawBoxes() {
        // Initialize boxElement (outside of the for loop below)
        let boxElement = document.createElement("span");
        /* Note: These functions make use of the block-scope
         * i'm promised due to me using "let" when
         * instantiating boxElement; this function also
         * makes use of "hiding", I don't need any other
         * function to see mutateBox and I KNOW that right
         * from the start, so might as well make it's scope
         * only the function that needs it.
         * Downside: It makes the drawBoxes function more
         * complex and harder to understand. */
        // Will shape and color a box element
        function mutateBox() {
            // Now apply them to the boxElement
            boxElement.style.width = boxWidth + "px";
            boxElement.style.height = boxHeight + "px";
            // Assign the box a random class
            boxElement.classList.add(getRandomElement(randomCSSClasses));
            // Fill in the box's value with some weird value
            boxElement.innerText = generateString();
            // Add a bunch of random CSS rules
            boxElement.style.backgroundColor = generateHexColor();
            boxElement.style.color = generateHexColor();
            /* Logic here: I want the font size to be no bigger
             * than 2rem, but no smaller than 0.02rem. */
            boxElement.style.fontSize = (Math.random() + (Math.random() * 0.5)) + "rem";
            /* 70% chance to align text to the left, otherwise
             * align the text to the right. */
            boxElement.style.textAlign = Math.random() < 0.7 ? "left" : "right";
            // Small chance to float right (12%)
            boxElement.style.float = Math.random() < 0.88 ? "left" : "right";
            /* Apply the background pulse in random intervals
             * of anywhere from 0.05s-20s */
            addBackgroundPulse(boxElement, (Math.random() * (Math.random() * 20000)));
        }
        function resetBoxDimensions() {
            // Set boxWidth and boxHeight
            boxWidth = randomNum(boxWidthLimit);
            boxHeight = randomNum(boxHeightLimit);
            /* Reset boxWidthLimit and boxHeightLimit
             * every so often. */
            boxHeightLimit = Math.random() < 0.85 ? boxHeightLimit : randomNum(250) + randomNum(40) + 20;
            boxWidthLimit = Math.random() < 0.85 ? boxWidthLimit : randomNum(250) + randomNum(40) + 10;
        }
        function animateBox(animationSeconds = 10, animationNames = [ "spin alternate", "droppingHot", "spinBig", "wackoDacko", "onHover alternate", "onHover", "wackoDacko alternate"]) {
            // 50/50 chance we may not even do it.
            if(randomNum() < 0.50) {
                /* 84% chance this doesn't go through, but if
                 * it does, we'll set the animation of the boxElement
                 * defined in this scope (in the beginning of drawBoxes)
                 * to a random animation defined in animationNames, which
                 * could be overridden if need be. */
                boxElement.style.webkitAnimation = Math.random() < 0.84 ? boxElement.style.webkitAnimation : randomNum(animationSeconds) + "s " + getRandomElement(animationNames);
            }
        }
        for(let i = 0; i < boxAmount; i++) {
            // Create a new span element
            boxElement = document.createElement("span");
            // Get different sized boxes each time
            resetBoxDimensions();
            // Make the box look unique using CSS rules
            // like font-size, float, text-align, etc.,
            // as well as fill the box with words.
            mutateBox();
            // Animate the box
            animateBox();
            // Append the new element to the body
            document.body.appendChild(boxElement);
        }
    }
    /* This function will continually call itself
     * to "pulse" the background of the document.body
     * by default, both animationTimeMS and element
     * can be overridden. */
    function addBackgroundPulse(element = document.body, animationTimeMS = 8000, semaphore = false) {
        /* If this is our first time calling the function, set the
         * background and call the function again. */
        if(!semaphore) {
            element.style.webkitTransition = "background " + animationTimeMS/1000 + "s";
            /* Call our function again in 1ms
             * to give the CSS time to "refresh?"
             * (I know there's a better answer here, why
             * wouldn't this work without setTimeout?) */
            setTimeout(function(){
                addBackgroundPulse(element, animationTimeMS, true);
            }, 1);
        }
        /* If we've already called this function, we should
         * call the function again in the animationTimeMS specified,
         * after changing the backgrondColor to a random color. */
        else {
            element.style.background = generateHexColor();
            setTimeout(function(){
                addBackgroundPulse(element, animationTimeMS, false);
            }, animationTimeMS);
        }
    }
    // Initialization function for TART.
    tartModule.init = function() {
        drawBoxes();
        addBackgroundPulse();
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

/* Call our initialization function, as GBG is already
 * instantiated because of it's IIFE nature. */
TART.init();
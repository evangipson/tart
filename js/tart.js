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
    /* This is going to need to match up
     * with the classes used in style.css */
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
    /* Block scoped, mutable.
     * (Can be assigned new content) */
    let boxAmount = randomNum(200) + 150;
    let boxWidthLimit = randomNum(250) + randomNum(40) + 20;
    let boxHeightLimit = randomNum(250) + randomNum(20) + 10;
    let boxWidth, boxHeight = 0;
    /** Will return a random number. If called with no
     * arguments will return 0 to 100.
     * @param {number} highNum Will set an upper limit.
     * Optional. Defaults to 100. */
    function randomNum(highNum = 100) {
        return Math.floor(Math.random() * parseInt(highNum));
    }
    /** Generates a six digit hex value, with 
     * a pound sign appended.
     * Returns in the form of:
     * "#xxxxxx" where x is a hex value 0-F. */
    function generateHexColor() {
        /* From comments here:
        * https://www.paulirish.com/2009/random-hex-color-code-snippets/ */
        return "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
    }
    /** Returns a random element from an array
     * that will be passed in. Can also be called
     * with a bunch of args to spit out a random
     * element of them. 
     * Valid Examples:
     * getRandomElement(theArg);
     * getRandomElement('eggs', 'bacon', 'tomato');
     * @param {array} sourceArray array or list (thank you rest paramaters). */
    function getRandomElement(...sourceArray) {
        return sourceArray[randomNum(sourceArray.length)];
    }
    /** Will return a random string when invoked.
     * @param {number} stringLimit length of the return string, in characters.
     * @param {string} possible available characters for the return string. */
    function generateString(stringLimit = 5, possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
        let text = "";
        for(let i = 0; i < stringLimit; i++) {
            if(randomNum() > 50) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        }
        return text;
    }
    /** Draws all the span boxes on the screen
     * then attaches them to the body element after it's done
     * mutating and animating them. */
    function drawBoxes() {
        // Initialize boxElement (outside of the for loop below)
        let boxElement = document.createElement("span");
        // Flag to determine if this is a huge box or not.
        let hugeBox = false;
        /* Note: These functions make use of the block-scope
         * i'm promised due to me using "let" when
         * instantiating boxElement; this function also
         * makes use of "hiding" or "closure".
         * I don't need any other
         * function to see mutateBox and I KNOW that right
         * from the start, so might as well make it's scope
         * only the function that needs it.
         * Downside: It makes the drawBoxes function more
         * complex and harder to understand. */
        /** Will shape and color a box element. */
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
             * than 2rem, but no smaller than 0.02rem, unless it's
             * a "hugeBox", in which case, I'll blow out that font
             * size so it's at least 6rem and at most 16rem, because
             * if it's a hugeBox it'll have a large height and width
             * that we need to fill. */
            boxElement.style.fontSize = hugeBox ? randomNum(15) + 10 + "rem" : (Math.random() + (Math.random() * 0.5)) + "rem";
            /* 70% chance to align text to the left, otherwise
             * align the text to the right. */
            boxElement.style.textAlign = Math.random() < 0.7 ? "left" : "right";
            // Small chance to float right (12%)
            boxElement.style.float = Math.random() < 0.88 ? "left" : "right";
            // 80/20 chance the box will be in layer 1 or 2.
            if(Math.random() > 0.80) {
                boxElement.classList.add("layer-2");
            }
            else {
                boxElement.classList.add("layer-1");
            }
            // 20% chance to randomly rotate the box
            boxElement.style.transform = Math.random() > 0.80 ? "rotate(" + randomNum(360) + "deg)" : "";
            /* Apply the background pulse in random intervals
             * of anywhere from 0.05s-20s */
            addBackgroundPulse(boxElement, (Math.random() * (Math.random() * 20000)));
        }
        /** Will set the box's height and width, and also
         * there's a small chance the limit for both boxHeight and boxWidth
         * can change. */
        function resetBoxDimensions() {
            /* Reset our flag for huge box, because
             * this is the only function that modifies
             * the variable. */
            hugeBox = false;
            // Set boxWidth and boxHeight
            boxWidth = randomNum(boxWidthLimit);
            boxHeight = randomNum(boxHeightLimit);
            /* Reset boxWidthLimit and boxHeightLimit
             * every so often. */
            boxHeightLimit = Math.random() < 0.83 ? boxHeightLimit : randomNum(250) + randomNum(40) + 20;
            boxWidthLimit = Math.random() < 0.77 ? boxWidthLimit : randomNum(250) + randomNum(40) + 10;
            // Very small chance (2%) to return HUGE dimensions
            if (randomNum(100) > 98) {
                boxWidth = randomNum(boxWidthLimit * randomNum(10));
                boxHeight = randomNum(boxHeightLimit * randomNum(10));
                // Don't forget, we need to remember this
                // in mutateBox above when setting font size.
                hugeBox = true;
            }
        }
        /** Animates a box by attaching a CSS class;
         * the animations are defined in style.css. 
         * @param {number} maxAnimationSeconds Defines how long
         * a CSS animation will last, in seconds. Optional.
         * @param {array} animationNames Make sure when
         * overridding animationNames you use valid animations defined
         * in style.css. Optional. */
        function animateBox(maxAnimationSeconds = 10, animationNames = [ 
            "spin alternate", 
            "droppingHot", 
            "spinBig", 
            "wackoDacko", 
            "onHover alternate", 
            "onHover", 
            "wackoDacko alternate"]) {
            // 50/50 chance we may not even do it.
            if(randomNum() < 0.50) {
                /* 84% chance this doesn't go through, but if
                 * it does, we'll set the animation of the boxElement
                 * defined in this scope (in the beginning of drawBoxes)
                 * to a random animation defined in animationNames, which
                 * could be overridden if need be. */
                boxElement.style.animation = Math.random() < 0.84 ? boxElement.style.animation : randomNum(maxAnimationSeconds) + "s " + getRandomElement(animationNames);
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
    /** addBackgroundPulse: This function will
     * continually call itself to "pulse" the background
     * of the document.body.
     * @param {HTMLElement} element this will be what
     * the background pulse gets added to. Defaults to
     * document.body. Optional.
     * @param {number} maxAnimationTimeMS Length of a full
     * pulse from color to color, in milliseconds. Optional.
     * @param {boolean} semaphore A flag for determining function
     * behavior. Gets set to true if false. If already true,
     * will ensure function is called again. Defaults to false; optional. */
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
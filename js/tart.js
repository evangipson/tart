// The TART variable that holds our information
// to start the game.
var TART = (function() {
    // The module we'll end up returning
    // after we augment it.
    var tartModule = {};
    // Variables needed in functions, will
    // eventually get their own data file.
    var randomCSSClasses = [
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
    var boxAmount = 1000;
    var boxWidthLimit = 60;
    var boxHeightLimit = 32;
    var boxWidth, boxHeight = 0;
    // Returns a number, defaults 0-100.
    function randomNum(highNum) {
        // Set the default value for highNum
        if(highNum === undefined) {
            highNum = 100;
        }
        return Math.floor(Math.random() * parseInt(highNum));
    }
    // Returns a random element from an array
    // that will be passed in, defaults to returning
    // 1, 2, or 3.
    function getRandomElement(sourceArray) {
        // Set the default value for sourceArray
        if(sourceArray === undefined) {
            sourceArray = [1,2,3];
        }
        return sourceArray[randomNum(sourceArray.length)];
    }
    // Will return an up to 5 character long string
    // when invoked.
    function generateString() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < 5; i++) {
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
        for(var i = 0; i < boxAmount; i++) {
            // Create a new span element
            var boxElement = document.createElement("span");
            // Reset the height and width
            createBox();
            // Now apply them to the boxElement.
            boxElement.style.width = boxWidth + "px";
            boxElement.style.height = boxHeight + "px";
            // Fill in the box's value with some weird value.
            boxElement.innerText = generateString();
            // Add a random class
            boxElement.classList.add(getRandomElement(randomCSSClasses));
            // Append the new element to the body
            document.body.appendChild(boxElement);
        }
    }
    function addHoverClass(element) {
        if(!element.classList.contains("touched")) {
            element.classList.add("touched");
        }
    }
    function createEventListeners() {
        var spans = document.getElementsByTagName("SPAN");
        for(var span in spans) {
            // Make sure we aren't acting on prototype properties
            if(spans.hasOwnProperty(span)) {
                spans[span].addEventListener("hover", addHoverClass(spans[span]));
            }
        }
    }
    // Initialization function for TART.
    tartModule.init = function() {
        draw();
        createEventListeners();
    };
    // I told you so! We're returning our module.
    return tartModule;
})(); // Immediately Invoked Function Expression.

// Call our initialization function, as GBG is already
// instantiated because of it's IIFE nature.
TART.init();
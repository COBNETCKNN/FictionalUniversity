class Search {
// 1. OBJECTS descript and create/initiate our object
    constructor() {
        this.openButton = jQuery(".js-search-trigger");
        this.closeButton = jQuery(".search-overlay__close");
        this.searchOverlay = jQuery(".search-overlay");
        this.searchField = jQuery("#search-term");
        // making sure our event listeners get added to a page right away
        this.events(); 
        // we made new object with false value and put it into our methods or functions, further on we added inside our if statements check to open overlay only if it's closed, and close it only if it's open
        this.isOverlayOpen = false;
        // we can make new objects and later on define value for them as we did in our methods
        this.typingTimer;
        this.resultsDiv = jQuery("#search-overlay__results");
        this.isSpinnerVisible = false;
        this.previousValue;
    }

// 2. EVENTS is area where we connect our objects made in 1. and actions made in 3.

    events() {
        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
        // making event for when we press the key search bar pops up on screen
        jQuery(document).on("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }

// 3. METHODS (function, action...)

    openOverlay() {
        this.searchOverlay.addClass("search-overlay--active");
        // class which will use overflow hidden, which will remove ability to scroll
        jQuery("body").addClass("body-no-scroll");
        this.isOverlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
        // function which will remove class for scroll after we close search window
        jQuery("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;
    }

    // making function so when we press S key on keyboard (which all have numbers in JS) it will open our serach bar and close it when pressed ESC
    keyPressDispatcher(e) {
        if(e.keyCode == 83 && !this.isOverlayOpen && !jQuery("input, textareas").is(':focus')) {
            this.openOverlay();
        }

        if(e.keyCode == 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }

    typingLogic() {
        if(this.searchField.val() != this.previousValue) {
        clearTimeout(this.typingTimer);
            if(this.searchField.val()) {
                if(!this.isSpinnerVisibile) {
                this.resultsDiv.html('<div class="spinner-loader"></div>');
                this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }
        
        this.previousValue = this.searchField.val();
    }

    getResults() {
        this.resultsDiv.html("Imagine real search results here...");
        this.isSpinnerVisible = false;
    }


}

var amazingSearch = new Search();
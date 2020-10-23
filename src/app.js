class Search {
// 1. OBJECTS descript and create/initiate our object
    constructor() {
        // loading HTML firstly
        this.addSearchHTML();
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
        // emptying search bar after closing it
        this.searchField.val('');
        // making our search bar focus when user click on search icon so he can write what he wants right away
        setTimeout(() => this.searchField.focus(), 301);
        this.isOverlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
        // function which will remove class for scroll after we close search window
        jQuery("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;
    }

    // making function so when we press S key on keyboard (which all have numbers in JS) it will open our serach bar and close it when pressed ESC, also we added third check which will not opet search field upon pressing S if user is typing in another input or textarea on the site
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
                this.typingTimer = setTimeout(this.getResults.bind(this), 750);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }
        
        this.previousValue = this.searchField.val();
    }

    getResults() {

        jQuery.when(
            // universityData.root_url is our way to make our JSON flexible so it gets the data no matter the url we are using
            jQuery.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.val()), 
            jQuery.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchField.val())
            ).then((posts, pages) => {
            var combinedResults = posts[0].concat(pages[0]);
                this.resultsDiv.html(
                // in order to put lines of HTML in our javascript code we use "backticks" to make that possible, between them we can put our HTML as we are used to ALT + 7 and it's called Template Literal
                // ${posts.lenght} is ternary operator which allows us to write conditional statements inside our Template Literal
                // .lenght is JS function which evaluates if there is anything in our array or object
                `
                <h2 class="search-overlay__section-title">General Information</h2>
                ${combinedResults.length ? '<ul class="link-list min-list">' : '<p>No general information matches that search.</p>'}
                ${combinedResults.map(item => `<li><a href="${item.link}">${item.title.rendered}</a> ${item.type == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}
                ${combinedResults.length ? '</ul>' : ''}
            `);
            this.isSpinnerVisible = false;
        }, () => {
            this.resultsDiv.html('<p>Unexpected Error please try again.</p>');
        });
    }

    // we made method with our template literal so our HTML gets loaded with javascript not from the footer.php, this method has to be loaded first, that's why we have to put it on first place in our constructor()
    addSearchHTML() {
        jQuery("body").append(`
            <div class="search-overlay">
                <div class="search-overlay__top">
                    <div class="container">
                    <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                    <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
                    <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                    </div>
                </div>

                <div class="container">
                    <div id="search-overlay__results">
                    </div>
                </div>

            </div>
        `);
    }


}

var amazingSearch = new Search();
class Search {
    // 1. describe and create/initiate our object, place where we give birth to our object
    constructor() {
        this.openButton = jQuery(".js-search-trigger");
        this.closeButton = jQuery(".search-overlay__close");
        this.searchOverlay = jQuery(".search-overlay");
        this.events(); // making sure our event listeners get added to a page right away
    }

    // 2. events is area where we connect our objects made in 1. and actions made in 3.

    events() {
        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
    }

    // 3. methods (function, action...)

    openOverlay() {
        this.searchOverlay.addClass("search-overlay--active");
    }

    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
    }

}

var amazingSearch = new Search();
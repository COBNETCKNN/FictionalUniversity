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
        // return false; will prevent default behaviour of a and li elements and in our case redirect non-JS users to our search page since we can't show them overlay we made
        return false;
    }

    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
        // function which will remove class for scroll after we close search window
        jQuery("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;
    }

    // making function so when we press S key on keyboard (which all have numbers in JS) it will open our serach bar and close it when pressed ESC, also we added third check which will not opet search field upon pressing S if user is typing in another input or textarea on the site
    keyPressDispatcher(e) {
        if(e.keyCode == 83 && !this.isOverlayOpen && !jQuery("input, textarea").is(':focus')) {
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

        jQuery.getJSON(universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(), (results) => {
            this.resultsDiv.html(`
                <div class="grid grid-cols-3 gap-4">
                    <div class="">
                        <h2 class="search-overlay__section-title">General Informations</h2>
                        ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No general information matches that search.</p>'}
                        ${results.generalInfo.map(item => `<li><a href="${item.url}">${item.title}</a> ${item.postType == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}
                        ${results.generalInfo.length ? '</ul>' : ''}
                    </div>

                    <div class="">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs.</a></p>`}
                        ${results.programs.map(item => `<li><a href="${item.url}">${item.title}</a></li>`).join('')}
                        ${results.programs.length ? '</ul>' : ''}

                        <h2 class="search-overlay__section-title">Professors</h2>
                        ${results.professors.length ? '<ul class="cotainer flex flex-wrap justify-start px-2">' : `<p>No professors match that search.</p>`}
                        ${results.professors.map(item => `
                            <li class="professor-card__list-item py-2">
                                <a class="professor-card" href="${item.url}">
                                <img class="professor-card__image" src="${item.image}">
                                <span class="professor-card__name">${item.title}</span>
                                </a>
                            </li>
                        `).join('')}
                        ${results.professors.length ? '</ul>' : ''}
                    </div>

                    <div class="">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses.</a></p>`}
                        ${results.campuses.map(item => `<li><a href="${item.url}">${item.title}</a></li>`).join('')}
                        ${results.campuses.length ? '</ul>' : ''}

                        <h2 class="search-overlay__section-title">Events</h2>
                        ${results.events.length ? '' : `<p>No events match that search. <a href="${universityData.root_url}/events">View all events.</a></p>`}
                        ${results.events.map(item => `
                            <div class="event-summary">
                                <a class="event-summary__date t-center" href="${item.url}">
                                    <span class="event-summary__month">${item.month}</span>
                                    <span class="event-summary__day">${item.day}</span>
                                </a>
                                <div class="event-summary__content">
                                <h5 class="event-summary__title headline headline--tiny"><a href="${item.url}">${item.title}</a></h5>
                                <p>
                                    ${item.description}
                                    <a href="${item.url}" class="nu gray">Learn more</a></p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                </div>
            `);
            this.isSpinnerVisible = false;
        });


/*

Example of synchronus JSON request for data

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
        }); */
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



// JS for my notes page
class myNotes {

    constructor() {
        this.events();
    }

    events() {
        jQuery("#my-notes").on("click", ".delete-note", this.deleteNote);
        jQuery("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
        jQuery("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
        jQuery(".submit-note").on("click", this.createNote.bind(this));
    }

    // Methods will go here

// EXAMPLE OF DELETE HTTP REQUEST    
    deleteNote(e) {
        var thisNote = jQuery(e.target).parents("li");

        jQuery.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'DELETE',
            success: (response) => {
                // what this will do is that it will use slideUp function which removes content from the page using animation, this way we don't need to refresh our page to see results of DELETE request we did
                thisNote.slideUp();
                console.log("Congrats");
                console.log(response);
            },
            error: (response) => {
                console.log("Sorry");
                console.log(response);
            },
        });
    }

// EXAMPLE OF EDIT NOTE HTTPS REQUEST
    editNote(e) {
        var thisNote = jQuery(e.target).parents("li");
        
        if(thisNote.data("state") == 'editable') {
            // make read only
            this.makeNoteReadOnly(thisNote);
        }else {
            // make editable
            this.makeNoteEditable(thisNote);
        }
    }

    makeNoteEditable(thisNote) {
        thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i>Cancel');
        thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field");
        thisNote.find(".update-note").addClass("update-note--visible");
        thisNote.data("state", "editable");
    }

    makeNoteReadOnly(thisNote) {
        thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i>Edit');
        thisNote.find(".note-title-field, .note-body-field").attr("readonly", "readonly").removeClass("note-active-field");
        thisNote.find(".update-note").removeClass("update-note--visible");
        thisNote.data("state", "cancel");
    }


// UPDATE NOTE
    updateNote(e) {
        var thisNote = jQuery(e.target).parents("li");
        var ourUpdatedPost = {
            'title': thisNote.find(".note-title-field").val(),
            'content': thisNote.find(".note-body-field").val(),
        }


        jQuery.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'POST',
            data: ourUpdatedPost,
            success: (response) => {
                this.makeNoteReadOnly(thisNote);
                console.log("Congrats");
                console.log(response);
            },
            error: (response) => {
                console.log("Sorry");
                console.log(response);
            },
        });
    }


// CREATE NEW NOTE
     createNote(e) {
        var ourNewPosts = {
            'title': jQuery(".new-note-title").val(),
            'content': jQuery(".new-note-body").val(),
            'status': 'publish',
        }


        jQuery.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
            },
            url: universityData.root_url + '/wp-json/wp/v2/note/',
            type: 'POST',
            data: ourNewPosts,
            success: (response) => {
                jQuery(".new-note-title, .new-note-body").val('');
                jQuery(`

                    <li data-id="${response.id}">
                        <input readonly class="note-title-field" value="${response.title.raw}">
                        <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
                        <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
                        <textarea readonly class="note-body-field">${response.content.raw}</textarea>
                        <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i>Save</span>
                    </li>

                `).prependTo("#my-notes").hide().slideDown();

                console.log("Congrats");
                console.log(response);
            },
            error: (response) => {
                console.log("Sorry");
                console.log(response);
            },
        });
    }

} 


var mynotes = new myNotes();
    
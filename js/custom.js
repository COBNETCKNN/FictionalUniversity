function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search = /*#__PURE__*/function () {
  // 1. OBJECTS descript and create/initiate our object
  function Search() {
    _classCallCheck(this, Search);

    // loading HTML firstly
    this.addSearchHTML();
    this.openButton = jQuery(".js-search-trigger");
    this.closeButton = jQuery(".search-overlay__close");
    this.searchOverlay = jQuery(".search-overlay");
    this.searchField = jQuery("#search-term"); // making sure our event listeners get added to a page right away

    this.events(); // we made new object with false value and put it into our methods or functions, further on we added inside our if statements check to open overlay only if it's closed, and close it only if it's open

    this.isOverlayOpen = false; // we can make new objects and later on define value for them as we did in our methods

    this.typingTimer;
    this.resultsDiv = jQuery("#search-overlay__results");
    this.isSpinnerVisible = false;
    this.previousValue;
  } // 2. EVENTS is area where we connect our objects made in 1. and actions made in 3.


  _createClass(Search, [{
    key: "events",
    value: function events() {
      this.openButton.on("click", this.openOverlay.bind(this));
      this.closeButton.on("click", this.closeOverlay.bind(this)); // making event for when we press the key search bar pops up on screen

      jQuery(document).on("keydown", this.keyPressDispatcher.bind(this));
      this.searchField.on("keyup", this.typingLogic.bind(this));
    } // 3. METHODS (function, action...)

  }, {
    key: "openOverlay",
    value: function openOverlay() {
      var _this = this;

      this.searchOverlay.addClass("search-overlay--active"); // class which will use overflow hidden, which will remove ability to scroll

      jQuery("body").addClass("body-no-scroll"); // emptying search bar after closing it

      this.searchField.val(''); // making our search bar focus when user click on search icon so he can write what he wants right away

      setTimeout(function () {
        return _this.searchField.focus();
      }, 301);
      this.isOverlayOpen = true; // reutnr false; will prevent default behaviour of a and li elements and in our case redirect non-JS users to our search page since we can't show them overlay we made

      return false;
    }
  }, {
    key: "closeOverlay",
    value: function closeOverlay() {
      this.searchOverlay.removeClass("search-overlay--active"); // function which will remove class for scroll after we close search window

      jQuery("body").removeClass("body-no-scroll");
      this.isOverlayOpen = false;
    } // making function so when we press S key on keyboard (which all have numbers in JS) it will open our serach bar and close it when pressed ESC, also we added third check which will not opet search field upon pressing S if user is typing in another input or textarea on the site

  }, {
    key: "keyPressDispatcher",
    value: function keyPressDispatcher(e) {
      if (e.keyCode == 83 && !this.isOverlayOpen && !jQuery("input, textareas").is(':focus')) {
        this.openOverlay();
      }

      if (e.keyCode == 27 && this.isOverlayOpen) {
        this.closeOverlay();
      }
    }
  }, {
    key: "typingLogic",
    value: function typingLogic() {
      if (this.searchField.val() != this.previousValue) {
        clearTimeout(this.typingTimer);

        if (this.searchField.val()) {
          if (!this.isSpinnerVisibile) {
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
  }, {
    key: "getResults",
    value: function getResults() {
      var _this2 = this;

      jQuery.getJSON(universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(), function (results) {
        _this2.resultsDiv.html("\n                <div class=\"grid grid-cols-3 gap-4\">\n                    <div class=\"\">\n                        <h2 class=\"search-overlay__section-title\">General Informations</h2>\n                        ".concat(results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No general information matches that search.</p>', "\n                        ").concat(results.generalInfo.map(function (item) {
          return "<li><a href=\"".concat(item.url, "\">").concat(item.title, "</a> ").concat(item.postType == 'post' ? "by ".concat(item.authorName) : '', "</li>");
        }).join(''), "\n                        ").concat(results.generalInfo.length ? '</ul>' : '', "\n                    </div>\n\n                    <div class=\"\">\n                        <h2 class=\"search-overlay__section-title\">Programs</h2>\n                        ").concat(results.programs.length ? '<ul class="link-list min-list">' : "<p>No programs match that search. <a href=\"".concat(universityData.root_url, "/programs\">View all programs.</a></p>"), "\n                        ").concat(results.programs.map(function (item) {
          return "<li><a href=\"".concat(item.url, "\">").concat(item.title, "</a></li>");
        }).join(''), "\n                        ").concat(results.programs.length ? '</ul>' : '', "\n\n                        <h2 class=\"search-overlay__section-title\">Professors</h2>\n                        ").concat(results.professors.length ? '<ul class="cotainer flex flex-wrap justify-start px-2">' : "<p>No professors match that search.</p>", "\n                        ").concat(results.professors.map(function (item) {
          return "\n                            <li class=\"professor-card__list-item py-2\">\n                                <a class=\"professor-card\" href=\"".concat(item.url, "\">\n                                <img class=\"professor-card__image\" src=\"").concat(item.image, "\">\n                                <span class=\"professor-card__name\">").concat(item.title, "</span>\n                                </a>\n                            </li>\n                        ");
        }).join(''), "\n                        ").concat(results.professors.length ? '</ul>' : '', "\n                    </div>\n\n                    <div class=\"\">\n                        <h2 class=\"search-overlay__section-title\">Campuses</h2>\n                        ").concat(results.campuses.length ? '<ul class="link-list min-list">' : "<p>No campuses match that search. <a href=\"".concat(universityData.root_url, "/campuses\">View all campuses.</a></p>"), "\n                        ").concat(results.campuses.map(function (item) {
          return "<li><a href=\"".concat(item.url, "\">").concat(item.title, "</a></li>");
        }).join(''), "\n                        ").concat(results.campuses.length ? '</ul>' : '', "\n\n                        <h2 class=\"search-overlay__section-title\">Events</h2>\n                        ").concat(results.events.length ? '' : "<p>No events match that search. <a href=\"".concat(universityData.root_url, "/events\">View all events.</a></p>"), "\n                        ").concat(results.events.map(function (item) {
          return "\n                            <div class=\"event-summary\">\n                                <a class=\"event-summary__date t-center\" href=\"".concat(item.url, "\">\n                                    <span class=\"event-summary__month\">").concat(item.month, "</span>\n                                    <span class=\"event-summary__day\">").concat(item.day, "</span>\n                                </a>\n                                <div class=\"event-summary__content\">\n                                <h5 class=\"event-summary__title headline headline--tiny\"><a href=\"").concat(item.url, "\">").concat(item.title, "</a></h5>\n                                <p>\n                                    ").concat(item.description, "\n                                    <a href=\"").concat(item.url, "\" class=\"nu gray\">Learn more</a></p>\n                                </div>\n                            </div>\n                        ");
        }).join(''), "\n                    </div>\n\n                </div>\n            "));

        _this2.isSpinnerVisible = false;
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
    } // we made method with our template literal so our HTML gets loaded with javascript not from the footer.php, this method has to be loaded first, that's why we have to put it on first place in our constructor()

  }, {
    key: "addSearchHTML",
    value: function addSearchHTML() {
      jQuery("body").append("\n            <div class=\"search-overlay\">\n                <div class=\"search-overlay__top\">\n                    <div class=\"container\">\n                    <i class=\"fa fa-search search-overlay__icon\" aria-hidden=\"true\"></i>\n                    <input type=\"text\" class=\"search-term\" placeholder=\"What are you looking for?\" id=\"search-term\">\n                    <i class=\"fa fa-window-close search-overlay__close\" aria-hidden=\"true\"></i>\n                    </div>\n                </div>\n\n                <div class=\"container\">\n                    <div id=\"search-overlay__results\">\n                    </div>\n                </div>\n\n            </div>\n        ");
    }
  }]);

  return Search;
}();

var amazingSearch = new Search();

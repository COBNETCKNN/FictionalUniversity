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
      this.isOverlayOpen = true; // return false; will prevent default behaviour of a and li elements and in our case redirect non-JS users to our search page since we can't show them overlay we made

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
      if (e.keyCode == 83 && !this.isOverlayOpen && !jQuery("input, textarea").is(':focus')) {
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
        }).join(''), "\n                        ").concat(results.generalInfo.length ? '</ul>' : '', "\n                    </div>\n                    <div class=\"\">\n                        <h2 class=\"search-overlay__section-title\">Programs</h2>\n                        ").concat(results.programs.length ? '<ul class="link-list min-list">' : "<p>No programs match that search. <a href=\"".concat(universityData.root_url, "/programs\">View all programs.</a></p>"), "\n                        ").concat(results.programs.map(function (item) {
          return "<li><a href=\"".concat(item.url, "\">").concat(item.title, "</a></li>");
        }).join(''), "\n                        ").concat(results.programs.length ? '</ul>' : '', "\n                        <h2 class=\"search-overlay__section-title\">Professors</h2>\n                        ").concat(results.professors.length ? '<ul class="cotainer flex flex-wrap justify-start px-2">' : "<p>No professors match that search.</p>", "\n                        ").concat(results.professors.map(function (item) {
          return "\n                            <li class=\"professor-card__list-item py-2\">\n                                <a class=\"professor-card\" href=\"".concat(item.url, "\">\n                                <img class=\"professor-card__image\" src=\"").concat(item.image, "\">\n                                <span class=\"professor-card__name\">").concat(item.title, "</span>\n                                </a>\n                            </li>\n                        ");
        }).join(''), "\n                        ").concat(results.professors.length ? '</ul>' : '', "\n                    </div>\n                    <div class=\"\">\n                        <h2 class=\"search-overlay__section-title\">Campuses</h2>\n                        ").concat(results.campuses.length ? '<ul class="link-list min-list">' : "<p>No campuses match that search. <a href=\"".concat(universityData.root_url, "/campuses\">View all campuses.</a></p>"), "\n                        ").concat(results.campuses.map(function (item) {
          return "<li><a href=\"".concat(item.url, "\">").concat(item.title, "</a></li>");
        }).join(''), "\n                        ").concat(results.campuses.length ? '</ul>' : '', "\n                        <h2 class=\"search-overlay__section-title\">Events</h2>\n                        ").concat(results.events.length ? '' : "<p>No events match that search. <a href=\"".concat(universityData.root_url, "/events\">View all events.</a></p>"), "\n                        ").concat(results.events.map(function (item) {
          return "\n                            <div class=\"event-summary\">\n                                <a class=\"event-summary__date t-center\" href=\"".concat(item.url, "\">\n                                    <span class=\"event-summary__month\">").concat(item.month, "</span>\n                                    <span class=\"event-summary__day\">").concat(item.day, "</span>\n                                </a>\n                                <div class=\"event-summary__content\">\n                                <h5 class=\"event-summary__title headline headline--tiny\"><a href=\"").concat(item.url, "\">").concat(item.title, "</a></h5>\n                                <p>\n                                    ").concat(item.description, "\n                                    <a href=\"").concat(item.url, "\" class=\"nu gray\">Learn more</a></p>\n                                </div>\n                            </div>\n                        ");
        }).join(''), "\n                    </div>\n                </div>\n            "));

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
      jQuery("body").append("\n            <div class=\"search-overlay\">\n                <div class=\"search-overlay__top\">\n                    <div class=\"container\">\n                    <i class=\"fa fa-search search-overlay__icon\" aria-hidden=\"true\"></i>\n                    <input type=\"text\" class=\"search-term\" placeholder=\"What are you looking for?\" id=\"search-term\">\n                    <i class=\"fa fa-window-close search-overlay__close\" aria-hidden=\"true\"></i>\n                    </div>\n                </div>\n                <div class=\"container\">\n                    <div id=\"search-overlay__results\">\n                    </div>\n                </div>\n            </div>\n        ");
    }
  }]);

  return Search;
}();

var amazingSearch = new Search();

var myNotes = /*#__PURE__*/function () {
  function myNotes() {
    _classCallCheck(this, myNotes);

    this.events();
  }

  _createClass(myNotes, [{
    key: "events",
    value: function events() {
      jQuery("#my-notes").on("click", ".delete-note", this.deleteNote);
      jQuery("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
      jQuery("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
      jQuery(".submit-note").on("click", this.createNote.bind(this));
    } // Methods will go here
    // EXAMPLE OF DELETE HTTP REQUEST    

  }, {
    key: "deleteNote",
    value: function deleteNote(e) {
      var thisNote = jQuery(e.target).parents("li");
      jQuery.ajax({
        // WP nonce which helps us to help protect URLs and forms from certain types of misuse, malicious or otherwise.
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
        type: 'DELETE',
        success: function success(response) {
          // what this will do is that it will use slideUp function which removes content from the page using animation, this way we don't need to refresh our page to see results of DELETE request we did
          thisNote.slideUp();
          console.log("Congrats");
          console.log(response); // if statement which as a condition uses our new JSON field which counts user notes to remove class from our message and make it hidden again

          if (response.userNoteCount < 5) {
            jQuery(".note-limit-message").removeClass("active");
          }
        },
        error: function error(response) {
          console.log("Sorry");
          console.log(response);
        }
      });
    } // EXAMPLE OF EDIT NOTE HTTPS REQUEST

  }, {
    key: "editNote",
    value: function editNote(e) {
      var thisNote = jQuery(e.target).parents("li");

      if (thisNote.data("state") == 'editable') {
        // make read only
        this.makeNoteReadOnly(thisNote);
      } else {
        // make editable
        this.makeNoteEditable(thisNote);
      }
    }
  }, {
    key: "makeNoteEditable",
    value: function makeNoteEditable(thisNote) {
      thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i>Cancel');
      thisNote.find(".note-title-field, .note-body-field").removeAttr("readonly").addClass("note-active-field");
      thisNote.find(".update-note").addClass("update-note--visible");
      thisNote.data("state", "editable");
    }
  }, {
    key: "makeNoteReadOnly",
    value: function makeNoteReadOnly(thisNote) {
      thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i>Edit');
      thisNote.find(".note-title-field, .note-body-field").attr("readonly", "readonly").removeClass("note-active-field");
      thisNote.find(".update-note").removeClass("update-note--visible");
      thisNote.data("state", "cancel");
    } // UPDATE NOTE

  }, {
    key: "updateNote",
    value: function updateNote(e) {
      var _this3 = this;

      var thisNote = jQuery(e.target).parents("li");
      var ourUpdatedPost = {
        'title': thisNote.find(".note-title-field").val(),
        'content': thisNote.find(".note-body-field").val()
      };
      jQuery.ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
        type: 'POST',
        data: ourUpdatedPost,
        success: function success(response) {
          _this3.makeNoteReadOnly(thisNote);

          console.log("Congrats");
          console.log(response);
        },
        error: function error(response) {
          console.log("Sorry");
          console.log(response);
        }
      });
    } // CREATE NEW NOTE

  }, {
    key: "createNote",
    value: function createNote(e) {
      var ourNewPosts = {
        'title': jQuery(".new-note-title").val(),
        'content': jQuery(".new-note-body").val(),
        'status': 'publish'
      };
      jQuery.ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/wp/v2/note/',
        type: 'POST',
        data: ourNewPosts,
        success: function success(response) {
          jQuery(".new-note-title, .new-note-body").val('');
          jQuery("\n                    <li data-id=\"".concat(response.id, "\">\n                        <input readonly class=\"note-title-field\" value=\"").concat(response.title.raw, "\">\n                        <span class=\"edit-note\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>Edit</span>\n                        <span class=\"delete-note\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>Delete</span>\n                        <textarea readonly class=\"note-body-field\">").concat(response.content.raw, "</textarea>\n                        <span class=\"update-note btn btn--blue btn--small\"><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>Save</span>\n                    </li>\n                ")).prependTo("#my-notes").hide().slideDown();
          console.log("Congrats");
          console.log(response);
        },
        error: function error(response) {
          // if statement which will fire if in our JSON object there is custom message we made in function.php for reaching limit of notes
          if (response.responseText == "You have reached your note limit.") {
            jQuery(".note-limit-message").addClass("active");
          }

          console.log("Sorry");
          console.log(response);
        }
      });
    }
  }]);

  return myNotes;
}();

var mynotes = new myNotes();

var Like = /*#__PURE__*/function () {
  function Like() {
    _classCallCheck(this, Like);

    this.events();
  }

  _createClass(Like, [{
    key: "events",
    value: function events() {
      jQuery(".like-box").on("click", this.ourClickDispatcher.bind(this));
    } // methods

  }, {
    key: "ourClickDispatcher",
    value: function ourClickDispatcher(e) {
      var currentLikeBox = jQuery(e.target).closest(".like-box");

      if (currentLikeBox.attr('data-exists') == 'yes') {
        this.deleteLike(currentLikeBox);
      } else {
        this.createLike(currentLikeBox);
      }
    }
  }, {
    key: "createLike",
    value: function createLike(currentLikeBox) {
      jQuery.ajax({
        // WP nonce which helps us to help protect URLs and forms from certain types of misuse, malicious or otherwise.
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/university/v1/manageLike',
        type: 'POST',
        data: {
          'professorId': currentLikeBox.data('professor')
        },
        success: function success(response) {
          currentLikeBox.attr('data-exists', 'yes');
          var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
          likeCount++;
          currentLikeBox.find(".like-count").html(likeCount);
          currentLikeBox.attr('data-like', response);
          console.log(response);
        },
        error: function error(response) {
          console.log(response);
        }
      });
    }
  }, {
    key: "deleteLike",
    value: function deleteLike(currentLikeBox) {
      jQuery.ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
        },
        url: universityData.root_url + '/wp-json/university/v1/manageLike',
        data: {
          'like': currentLikeBox.attr('data-like')
        },
        type: 'DELETE',
        success: function success(response) {
          currentLikeBox.attr('data-exists', 'no');
          var likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
          likeCount--;
          currentLikeBox.find(".like-count").html(likeCount);
          currentLikeBox.attr('data-like', '');
          console.log(response);
        },
        error: function error(response) {
          console.log(response);
        }
      });
    }
  }]);

  return Like;
}();

var likes = new Like();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search = /*#__PURE__*/function () {
  // 1. OBJECTS descript and create/initiate our object
  function Search() {
    _classCallCheck(this, Search);

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
      this.searchOverlay.addClass("search-overlay--active"); // class which will use overflow hidden, which will remove ability to scroll

      jQuery("body").addClass("body-no-scroll");
      this.isOverlayOpen = true;
    }
  }, {
    key: "closeOverlay",
    value: function closeOverlay() {
      this.searchOverlay.removeClass("search-overlay--active"); // function which will remove class for scroll after we close search window

      jQuery("body").removeClass("body-no-scroll");
      this.isOverlayOpen = false;
    } // making function so when we press S key on keyboard (which all have numbers in JS) it will open our serach bar and close it when pressed ESC

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

          this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
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
      this.resultsDiv.html("Imagine real search results here...");
      this.isSpinnerVisible = false;
    }
  }]);

  return Search;
}();

var amazingSearch = new Search();

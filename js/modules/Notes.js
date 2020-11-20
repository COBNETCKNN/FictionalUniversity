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
             // WP nonce which helps us to help protect URLs and forms from certain types of misuse, malicious or otherwise.
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
                // if statement which as a condition uses our new JSON field which counts user notes to remove class from our message and make it hidden again
                if(response.userNoteCount < 5) {
                    jQuery(".note-limit-message").removeClass("active");
                }
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
                // if statement which will fire if in our JSON object there is custom message we made in function.php for reaching limit of notes
                if(response.responseText == "You have reached your note limit.") {
                    jQuery(".note-limit-message").addClass("active");
                }
                console.log("Sorry");
                console.log(response);
            },
        });
    }

} 


var mynotes = new myNotes();
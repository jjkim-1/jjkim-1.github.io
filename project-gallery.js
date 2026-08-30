document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================
       ELEMENT REFERENCES
       ====================================================== */

    const thumbnails =
        Array.from(
            document.querySelectorAll(".result-thumbnail")
        );

    const mainImage =
        document.getElementById("result-main-image");

    const mainTitle =
        document.getElementById("result-main-title");

    const mainCaption =
        document.getElementById("result-main-caption");

    const previousButton =
        document.getElementById("result-prev");

    const nextButton =
        document.getElementById("result-next");

    const imageButton =
        document.getElementById("result-image-button");


    /* Lightbox */

    const lightbox =
        document.getElementById("result-lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const lightboxClose =
        document.getElementById("lightbox-close");

    const lightboxPrevious =
        document.getElementById("lightbox-prev");

    const lightboxNext =
        document.getElementById("lightbox-next");


    /* ------------------------------------------------------
       Safety check
       ------------------------------------------------------ */

    if (
        thumbnails.length === 0 ||
        !mainImage ||
        !mainTitle ||
        !mainCaption
    ) {
        return;
    }


    /* ======================================================
       CURRENT RESULT INDEX
       ====================================================== */

    let currentIndex = 0;


    /* ======================================================
       UPDATE MAIN RESULT
       ====================================================== */

    function showResult(index) {

        /*
         * Wrap around:
         *
         * previous from 0 -> final figure
         * next from final -> first figure
         */

        if (index < 0) {
            index = thumbnails.length - 1;
        }

        if (index >= thumbnails.length) {
            index = 0;
        }

        currentIndex = index;

        const selected =
            thumbnails[currentIndex];


        /* Read information stored in the HTML */

        const image =
            selected.dataset.image;

        const title =
            selected.dataset.title;

        const caption =
            selected.dataset.caption;


        /* Update main result */

        mainImage.src = image;
        mainImage.alt = title;

        mainTitle.textContent = title;

        mainCaption.textContent = caption;


        /* Keep lightbox synchronized */

        if (lightboxImage) {
            lightboxImage.src = image;
            lightboxImage.alt = title;
        }


        /* Update selected thumbnail */

        thumbnails.forEach(
            function (thumbnail, thumbnailIndex) {

                const active =
                    thumbnailIndex === currentIndex;

                thumbnail.classList.toggle(
                    "is-active",
                    active
                );

                thumbnail.setAttribute(
                    "aria-pressed",
                    active ? "true" : "false"
                );
            }
        );
    }


    /* ======================================================
       THUMBNAIL SELECTION
       ====================================================== */

    thumbnails.forEach(
        function (thumbnail, index) {

            thumbnail.addEventListener(
                "click",
                function () {

                    showResult(index);

                }
            );
        }
    );


    /* ======================================================
       PREVIOUS / NEXT BUTTONS
       ====================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                showResult(
                    currentIndex - 1
                );

            }
        );
    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                showResult(
                    currentIndex + 1
                );

            }
        );
    }


    /* ======================================================
       LIGHTBOX
       ====================================================== */

    function openLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.hidden = false;

        document.body.style.overflow =
            "hidden";

        if (lightboxClose) {
            lightboxClose.focus();
        }
    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.hidden = true;

        document.body.style.overflow =
            "";

        if (imageButton) {
            imageButton.focus();
        }
    }


    if (imageButton) {

        imageButton.addEventListener(
            "click",
            openLightbox
        );
    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightboxPrevious) {

        lightboxPrevious.addEventListener(
            "click",
            function () {

                showResult(
                    currentIndex - 1
                );

            }
        );
    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            function () {

                showResult(
                    currentIndex + 1
                );

            }
        );
    }


    /*
     * Clicking the dark background closes the
     * lightbox, but clicking the figure does not.
     */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );
    }


    /* ======================================================
       KEYBOARD NAVIGATION
       ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "ArrowLeft") {

                showResult(
                    currentIndex - 1
                );

            }

            else if (event.key === "ArrowRight") {

                showResult(
                    currentIndex + 1
                );

            }

            else if (
                event.key === "Escape" &&
                lightbox &&
                !lightbox.hidden
            ) {

                closeLightbox();

            }

        }
    );


    /* ======================================================
       INITIALIZE GALLERY
       ====================================================== */

    showResult(0);

});

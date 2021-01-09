console.log('it works?')

// Magic keyword: closures

function Gallery(gallery) {
    if(!gallery) {
        throw new Error('No gallery found!');
    }
    // select the elements we need
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    let currentImage;

    function openModal() {
        console.log('opening modal in process');
        // First check if the modal is already open
        if(modal.matches('.open')) {
            console.info('modal already open');
            return; // that will stop the function from running
        }
        modal.classList.add('open');

        // event listeners to be bound when we open the modal:
        window.addEventListener('keyup', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPreviousImage);
    }

    function closeModal() {
        modal.classList.remove('open');
        // TODO: add event listeners for clicks and keyboard
        window.removeEventListener('keyup', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        prevButton.removeEventListener('click', showPreviousImage);
    }

    function handleKeyUp(e){
        if(e.key === 'Escape') return closeModal();
        if(e.key === 'ArrowRight') return showNextImage();
        if(e.key === 'ArrowLeft') return showPreviousImage();
    }

    function handleClickOutsideModal(e){
        if(e.target === e.currentTarget) {
            closeModal();
        }
    }

    function showNextImage(){
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPreviousImage(){
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function showImage(el) {
        if(!el) {
            console.info('there is no image to show');
            return;
        }
        // update the modal withthis info
        console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        currentImage = el;
        openModal();
    };

    // These are our event listeners:
    images.forEach(image => image.addEventListener('click', e => showImage
    (e.currentTarget)));

    images.forEach(image => image.addEventListener('keyup', e => {
        if(e.key === 'Enter') {
            showImage(e.currentTarget);
        }
    }));

    modal.addEventListener('click', handleClickOutsideModal);
};

// Use it on page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
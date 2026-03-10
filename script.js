const rootElement = document.documentElement;
const openBtn = document.getElementById("openInvitation");
const audioiconwrapper = document.querySelector('.audio-icon-wrapper');
const song = document.querySelector('#song');
const audioicon = document.querySelector('.audio-icon-wrapper i');
let isplaying = false;

function disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };

    rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
    window.onscroll = null; 
    rootElement.style.scrollBehavior = "smooth";
    playAudio();
}

function playAudio() {
    if (song) {
        song.volume = 0.1;
        audioiconwrapper.style.display = 'flex';
        song.play();
        isplaying = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.getElementById('my-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = new FormData(form);
            const action = e.target.action;

            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerText = "Mengirim...";
                submitBtn.disabled = true;
            }

            fetch(action, {
                method: 'POST',
                body: data,
            })
                .then(() => {
                    alert('Konfirmasi kehadiran berhasil terkirim, terima kasih!');
                    form.reset();
                })
                .catch(err => {
                    console.error('submit error', err);
                    alert('Terjadi kesalahan saat mengirim.');
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.innerText = "Kirim";
                        submitBtn.disabled = false;
                    }
                });
        });
    }

    
    const urlParams = new URLSearchParams(window.location.search);
    const nama = urlParams.get('n') || urlParams.get('nama') || '';
    const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';
    const namaContainer = document.querySelector('.hero h4 span');
    if (namaContainer) {
        namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ',');
    }
    if (nama && form) {
        const nameInput = document.querySelector('#nama');
        if (nameInput) nameInput.value = nama;
    }

   
    const hamburger = document.querySelector('.navbar-toggler');
    const stickyTop = document.querySelector('.sticky-top');
    const offcanvasEl = document.getElementById('offcanvasNavbar');

    if (hamburger && stickyTop) {
        hamburger.addEventListener('click', function () {
            stickyTop.style.overflow = 'visible';
        });
    }

    if (offcanvasEl && stickyTop) {
        offcanvasEl.addEventListener('hidden.bs.offcanvas', function () {
            stickyTop.style.overflow = '';
        });
    }

    
    disableScroll();

    
    if (openBtn) {
        openBtn.addEventListener("click", enableScroll);
    }

    if (audioiconwrapper) {
        audioiconwrapper.onclick = function () {
            if (isplaying) {
                song.pause();
                audioicon.classList.remove('bi-disc');
                audioicon.classList.add('bi-pause-circle');
            } else {
                song.play();
                audioicon.classList.remove('bi-pause-circle');
                audioicon.classList.add('bi-disc');
            }
            isplaying = !isplaying;
        };
    }
});
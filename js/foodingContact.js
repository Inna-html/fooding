const contactSend = document.querySelector('.contact-send');

const formContact = document.querySelector('.form-contact');
const contactName = document.querySelector('.item.contact-name');
const contactPhone = document.querySelector('.item.contact-phone')
const contactEmail = document.querySelector('.item.contact-email');
const contactSubject = document.querySelector('.item.contact-subject');
const contactMessage = document.querySelector('.item.contact-message');

const modal = document.querySelector('.modal');
document.getElementById('close-my-modal-btn').addEventListener('click', closeFunMod);
document.getElementById('close-my-modal-btn-two').addEventListener('click', closeFunMod);
const labels = document.querySelectorAll('.good-label');

// =============================================================

const arrayInputs = [contactName, contactPhone, contactEmail, contactSubject, contactMessage];

arrayInputs.map((itemIn, label) => {
    itemIn.addEventListener('change', () => {
        itemIn.classList.add('used');
        itemIn.classList.remove('error');

        if (itemIn.classList.contains('used')) {
            labels[label].classList.add('open-label');
        }
    })
})

const formValidation = () => {
    let hasError = false;

    arrayInputs.forEach(item => {
        if (!item.value) {
            item.classList.add('error');
            hasError = true
        } else {
            item.classList.remove('error');
        }
    });

    if (!hasError) {
        sendForm();
        modal.classList.add('open');
    }
}

const sendForm = () => {
    try {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                name: contactName.value,
                phone: contactPhone.value,
                email: contactEmail.value,
                subject: contactSubject.value,
                message: contactMessage.value,
            })
        }).then(() => {
            arrayInputs.forEach(item => {
                item.value = '';
                item.classList.remove('used');
            })
            labels.forEach(label => {
                label.classList.remove('open-label')
            })
        })
    } catch (e) {
        console.log('error sendForm');
    }
};

formContact.addEventListener("submit", (event) => {
    event.preventDefault();
    formValidation();
});


function closeFunMod(e) {
    if ('my-modal') {
        document.getElementById('my-modal').classList.remove('open');
        console.log('all ok');
    }
}

/* ============ counter of input ============================================================================ */

const counterInputLength = () => {
    const txtLength = document.querySelector('.textarea__length');
    const txtItemLimit = txtLength.getAttribute('maxlength');
    const txtCounter = document.querySelector('.textarea__counter span');
    txtCounter.innerHTML = txtItemLimit;

    txtLength.addEventListener('input', txtSetCounter);
    txtLength.addEventListener('click', txtSetCounter);

    function txtSetCounter() {
        const txtCounterResult = txtItemLimit - txtLength.value.length + '  characters left 🌱';
        txtCounter.innerHTML = txtCounterResult;

        txtLength.addEventListener('keyup', (event) => {
            event.key === 'Enter'
            if (event.key === 'Enter') {
                txtCounter.innerHTML = txtItemLimit;
            }
        })

        txtLength.addEventListener('change', () => {
            txtCounter.innerHTML = '';
        })
    }
}

contactMessage.addEventListener('input', counterInputLength);


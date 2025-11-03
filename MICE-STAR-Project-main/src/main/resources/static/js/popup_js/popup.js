document.querySelectorAll('[data-popup]').forEach(panel => {
    panel.addEventListener('click', () => {
        const popupId = panel.dataset.popup;

        if (popupId === 'popup-24') {
            showToast();
            return;
        }

        if (popupId === 'popup-1013') {
            showToast();
            return;
        }
        if (popupId === 'popup-83') {
            showToast();
            return;
        }

        const popup = document.getElementById(popupId);
        if (popup) popup.style.display = 'flex';
    });
});

document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.popup').style.display = 'none';
    });
});

window.addEventListener('click', e => {
    if (e.target.classList.contains('popup')) {
        e.target.style.display = 'none';
    }
});
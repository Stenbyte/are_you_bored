site.popup = (() => {
    const popup = document.getElementById('category-popup');
    let status = false;

    const close = () => {
        popup.classList.add('hide');
        status = false;
    };

    const open = () => {
        popup.classList.remove('hide');
        status = true;
    }

    window.addEventListener('click', (e) => {
        if (e.target.id === 'category-popup') {
            close();
        }
    });

    return {
        close,
        open
    }
})();

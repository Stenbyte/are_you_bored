site.modal = (() => {
    const closeBtn = document.getElementById('close-btn');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    const open = () => modal.classList.add('show-modal');

    const close = () => modal.classList.remove('show-modal');

    const clear = () => modalBody.innerHTML = '';

    const update = content => modalBody.innerHTML = content;

    closeBtn.addEventListener('click', close);

    window.addEventListener('click', (e) => {
        if (e.target.id === 'modal') { // how about a safer check such as e.target.id === 'modal' ???
            modal.classList.remove('show-modal');
        }
    });

    return {
        clear,
        update,
        open,
        close
    }
})();
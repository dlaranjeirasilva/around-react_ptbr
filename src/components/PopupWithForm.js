import closeIcon from '../images/close-icon.png';

function PopupWithForm({title, name, submitButtonText, isOpen, onClose, children}) {
  return(
    <section id={`modal-${name}`} className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <img
          id={`${name}-modal__button`}
          className="modal__button"
          src={closeIcon}
          alt="Ícone para fechar"
          onClick={onClose}
        />
        <form id={`form-${name}`} className="form" noValidate>
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className="form__button">
            {submitButtonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
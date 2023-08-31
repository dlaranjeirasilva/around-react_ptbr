import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';
import api from '../utils/Api';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [userData, setUserData] = useState({ name: '', about: '', avatar: '' });

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUserData({ name: data.name, about: data.about, avatar: data.avatar });
      })
      .catch((err) => {
        console.error(`Error: ${err}`)
      });
  }, []);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeleteClick = () => {
    setDeletePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setDeletePopupOpen(false)
    setSelectedCard(null)
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onDeleteClick={handleDeleteClick}
        onCardClick={handleCardClick}
      >
        <PopupWithForm
          title="Editar perfil"
          name="profile"
          submitButtonText="Salvar"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="name-input"
            className="form__input"
            type="text"
            name="name"
            placeholder="Nome"
            required
            defaultValue={userData.name}
            minLength="2"
            maxLength="40"
          />
          <span className="form__input-error name-input-error"></span>
          <input
            id="about-me-input"
            className="form__input"
            type="text"
            name="about-me"
            placeholder="Sobre mim"
            required
            defaultValue={userData.about}
            minLength="2"
            maxLength="80"
          />
          <span className="form__input-error about-me-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Novo Local"
          name="card"
          submitButtonText="Salvar"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="title-input"
            className="form__input"
            type="text"
            name="title"
            placeholder="Título"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="form__input-error title-input-error"></span>
          <input
            id="url-input"
            className="form__input"
            type="url"
            name="img_url"
            placeholder="Link da imagem"
            required
          />
          <span className="form__input-error url-input-error"></span>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          title="Alterar a foto do perfil"
          name="avatar"
          submitButtonText="Salvar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="avatar-input"
            className="form__input"
            type="url"
            name="avatar_url"
            placeholder="Link da imagem de avatar"
            required
            defaultValue={userData.avatar}
          />
          <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
        
        <PopupWithForm
          title="Tem certeza?"
          name="delete"
          submitButtonText="Sim"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        />
      </Main>
      <Footer />      
    </div>
  );
}

export default App;

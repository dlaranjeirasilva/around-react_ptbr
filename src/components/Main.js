import pencilIcon from '../images/pencil-icon.svg';
import api from '../utils/Api';
import Card from './Card';
import { useEffect, useState } from 'react';

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onDeleteClick,
  onCardClick,
  children
}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.error(`Error: ${err}`)
      })
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then(cardData => {
        setCards(cardData)
      })
      .catch((err) => {
        console.error(`Error: ${err}`)
      })
  }, []);

  return(
    <main className="main">

      {children}

      <section className="profile">
        <div className="profile__container">
          <div className="spinner"></div>
          <img
          src={userAvatar}
          alt="Imagem de perfil do usuário"
            className="profile__avatar"
          />
          <img
            src={pencilIcon}
            alt="Lápis do botão de edição de avatar"
            className="profile__edit-avatar"
            onClick={onEditAvatarClick}
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-info__name">{userName}</h2>
          <p className="profile-info__about-me">{userDescription}</p>
          <img
            id="profile-modal"
            src={pencilIcon}
            alt="Lápis do botão de edição de perfil"
            className="profile-info__button"
            onClick={onEditProfileClick}
          />
        </div>
        <input
          id="addCard_modal"
          className="profile__button"
          type="button"
          value="+"
          onClick={onAddPlaceClick}
        />
      </section>

      <section className="cards">
        {cards.map(card => (
          <Card key={card._id} card={card} onCardClick={onCardClick}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
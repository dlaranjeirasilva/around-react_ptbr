import garbageCan from '../images/garbage-can.png';
import hollowHeart from '../images/hollow-heart.svg';

function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }
  return(
    <ul id={card._id} className="card" onClick={handleClick}>
      <img
        src={garbageCan}
        alt="Lixeira"
        className="card__garbage-can"
      />
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
      />
      <li className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__data">
          <img
            src={hollowHeart}
            alt="Coração desmarcado"
            className="card__button"
          />
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </li>
    </ul>
  );
}

export default Card;
import './index.css'

const AppointmentItem = props => {
  const {appointmentArray, clickStarButton} = props
  const {id, titleName, newDate, isFavorite} = appointmentArray

  const onClickStarButton = () => {
    clickStarButton(id)
  }

  const onClickStar = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item-card-container">
      <div className="list-container">
        <p className="title-style">{titleName}</p>
        <p className="date-style">Date: {newDate}</p>
      </div>
      <div>
        <button
          className="star-button"
          type="button"
          data-testid="star"
          onClick={onClickStarButton}
        >
          <img alt="star" src={onClickStar} className="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem

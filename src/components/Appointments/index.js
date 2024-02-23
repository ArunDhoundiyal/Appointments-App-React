import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', starred: false, inputTitleDateArray: []}

  onClickFilteredStarred = (starred, inputTitleDateArray) => {
    if (starred) {
      return inputTitleDateArray.filter(eachArray => eachArray.isFavorite)
    }
    return inputTitleDateArray
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  clickStarButton = id => {
    this.setState(prevState => ({
      inputTitleDateArray: prevState.inputTitleDateArray.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  onTriggeredSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newDate = new Date(date)
    const newFormatedDate = format(newDate, ' dd MMMM yyyy, EEEE')

    const newAppointmentArray = {
      id: uuidV4(),
      titleName: title,
      newDate: newFormatedDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      inputTitleDateArray: [
        ...prevState.inputTitleDateArray,
        newAppointmentArray,
      ],
      title: '',
      date: '',
    }))
  }

  onClickInputTitle = event => {
    this.setState({title: event.target.value})
  }

  onClickInputDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, starred, date, inputTitleDateArray} = this.state
    const backgroundColor = starred ? 'starred-background-color' : ''
    const starredColor = starred ? 'starredColor' : ''
    const filteredAppointment = this.onClickFilteredStarred(
      starred,
      inputTitleDateArray,
    )

    return (
      <div className="bg-container">
        <div className="container">
          <div className="card-container">
            <div className="form-container">
              <h1 className="top-heading">Add Appointment</h1>
              <form onSubmit={this.onTriggeredSubmitForm}>
                <label htmlFor="Title" className="title-paragraph">
                  TITLE
                </label>
                <br />
                <div>
                  <input
                    className="input"
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={this.onClickInputTitle}
                  />
                </div>
                <br />
                <label htmlFor="Date" className="title-paragraph">
                  DATE
                </label>
                <br />
                <input
                  className="input"
                  type="date"
                  value={date}
                  onChange={this.onClickInputDate}
                />
                <div className="button-container">
                  <button className="button-style" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="image-container">
              <img
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="img-style"
              />
            </div>
          </div>
          <div className="bottom-card-container">
            <h1 className="appointment-heading">Appointments</h1>
            <div className="button-starred">
              <button
                className={`${backgroundColor} ${starredColor} starred-button`}
                type="button"
                onClick={this.onClickStarredButton}
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="appointment-container">
            {filteredAppointment.map(appointmentArray => (
              <AppointmentItem
                key={appointmentArray.id}
                appointmentArray={appointmentArray}
                clickStarButton={this.clickStarButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments

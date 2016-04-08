import React from 'react'
import Calendar from 'components/Calendar'
import { nextMonth, prevMonth } from 'actions/calendar'
import reduxify from 'store/reduxify'

class CalendarContainer extends React.Component {
  render() {
    return (
      <Calendar
        date={ this.props.calendar.get('date') }
        incrMonth={ this.props.actions.nextMonth }
        decrMonth={ this.props.actions.prevMonth }
      />
    )
  }
}

export default reduxify({
  state: 'calendar',
  actions: { nextMonth, prevMonth}
})(CalendarContainer)

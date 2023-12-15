import { useContext } from 'react';
import { NavBarContext } from '../GuestNavbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../../stylesheets/calendarSelector.scss';
import { DateSelectArg } from '@fullcalendar/core/index.js';

/*
Remove focus styling on click of next and previous buttons
*/

function CalendarSelector() {
  const { calendarContext } = useContext(NavBarContext);
  const { setDate } = calendarContext;

  const handleSelect = (event: DateSelectArg) => {
    setDate(event.startStr);
  };

  return (
    <div className='border p-8 rounded-lg min-w-[430px] min-h-[30em] shadow-sm'>
      <FullCalendar
        headerToolbar={{
          left: 'today',
          center: 'title',
          right: 'prev,next',
        }}
        initialView='dayGridMonth'
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={true}
        dayHeaderFormat={{
          weekday: 'short',
        }}
        select={handleSelect}
      />
    </div>
  );
}

export default CalendarSelector;

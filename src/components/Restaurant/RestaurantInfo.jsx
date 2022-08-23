function formatTime(time) {
  let hours = time.slice(0,2);
  const minutes = time.slice(2);

  if (Number(hours) > 12) {
    hours = hours - 12;
    return `${hours}:${minutes} PM`;
  }

  return `${hours}:${minutes} AM`;
}

const daysOfTheWeek = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
];
function RestaurantInfo({info}) {
  const hours = info.hours[0].open.map((time, idx) => {
    if (time.day !== idx) return 'Closed';
    return `${formatTime(time.start)} - ${formatTime(time.end)}`;
  });
  return (
    <div className='restaurant-info'>
      <div className='restaurant-name'>
        <span>{info.name}</span>
        { info.hours[0].is_open_now ? 
          <span className={'status'} style={{color: '#0F9D58'}}>{'Open Now'}</span> :
          <span className={'status'} style={{color: '#DB4437'}}>{'Closed'}</span>}
      </div>
      <div className='location-hours'>
        <div className='location'>
          <div>{info.location.address1}</div>
          <div>{`${info.location.city}, ${info.location.state} ${info.location.zip_code}`}</div>
        </div>
        <div className='hours'>
            {
              daysOfTheWeek.map((day, idx) => {
                return (
                  <div key={day} className='hour'>
                    <span className='day'>
                      {day}
                    </span>
                    <span className='time'>
                      {hours[idx] ? hours[idx] : 'Closed'}
                    </span>
                  </div>
                )
              })
            }
          </div>
      </div>
    </div>
  );
}

export default RestaurantInfo;
function RestaurantInfo({info}) {
  const daysOfTheWeek = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];
  return (
    <div className='restaurant-info'>
      <div className='restaurant-name'>
        {info.name}
      </div>
      <div className='location-hours'>
        <div className='location'>
          <div>{info.address.street1}</div>
          <div>{`${info.address.city}, ${info.address.state} ${info.address.zipCode}`}</div>
        </div>
        <div className='hours'>
          {
            daysOfTheWeek.map(day => {
              return (
                <div key={day} className='hour'>
                  <span className='day'>
                    {day}
                  </span>
                  <span className='time'>
                    {'11:00 AM - 8:00 PM'}
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
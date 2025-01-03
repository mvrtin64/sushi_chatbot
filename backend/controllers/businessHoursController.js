const checkBusinessHours = (req, res) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  const currentTime = currentHour + (currentMinutes / 60);

  const openingTime = 12.0;
  const closingTime = 23.0;
  
  const isOpen = currentTime >= openingTime && currentTime < closingTime;
  
  res.status(200).json({
    isOpen,
    currentTime: `${currentHour}:${currentMinutes.toString().padStart(2, '0')}`,
    openingTime: '12:00',
    closingTime: '23:00'
  });
};

module.exports = {
  checkBusinessHours
};

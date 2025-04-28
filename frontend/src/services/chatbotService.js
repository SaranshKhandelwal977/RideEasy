
const chatbotService = {
    getResponse: (input) => {
      const text = input.toLowerCase();
  
      if (text.includes('where') && text.includes('ride')) return 'Your ride is on the way!';
      if (text.includes('when') && (text.includes('arrive') || text.includes('coming'))) return 'Driver is reaching shortly.';
      if (text.includes('pay')) return 'You can pay online using Razorpay or by cash after ride.';
      if (text.includes('cancel')) return 'You can cancel your ride from the app options.';
      if (text.includes('book')) return 'Please click on Find a Trip or Book Rental.';
      
      return 'Sorry, I didn’t understand that. Please try differently!';
    }
  };
  
  export default chatbotService;
  
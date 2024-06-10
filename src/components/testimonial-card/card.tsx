import Quote from '../../../public/images/quote.svg';
import viewers from '../../../public/images/viewers.webp'
export const TestimonialCard = () => {
    return (
      <div className='px-4'>
        <div className="feedback-card relative p-5 bg-background2 rounded-xl py-12 text-left">
          <img src={Quote} className="testi-icon absolute -top-4 left-5" alt="icon"/>
          <p>Have been using this app to book cricket turfs and it's the best I have come across. The turf options are great and their customer support team is also very helpful and quick to revert. I regularly get offers and coupons also which gives a good discount for my turf booking.</p>
          <div className="viewer flex justify-end w-full gap-4 align-center mt-6">
              <img src={viewers} className=' rounded-full w-14 h-14' alt='viewer'/>
              <div className="viewers-details">
                <p>Chirag Chedda</p>
                <small>pAY n pLAY uSER</small>
              </div>
          </div>
        </div>
      </div>
    )
  
  };
export default TestimonialCard; 
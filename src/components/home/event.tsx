import { Button } from "../ui/button";
import eventImage from "../../../public/images/event-img.webp"
export const Events = () => {
    return (
      <div className="event-sec grid grid-cols-2 items-center ">
          <div className="left-col flex flex-col gap-4">
            <div className="left-content">
              <h2>Upcoming Events </h2>
              <div className="event-tag  flex flex-row items-center gap-4">
                <span className="event-categori">
                  Sports Alive
                </span>
                <small className="event-date">16th Feb 2024 </small>
              </div>
              <h5>The Role of Coaches in Youth Sports: How They Can Impact Your Child’s Development</h5>
              <p>Youth sports have long been recognised as a crucial part of a child’s development. From improving physical health to teaching teamwork, sports provide children with numerous benefits.</p>
              <div className="button-wrapper flex gap-4">
                <Button>Become a Member</Button>
                <Button>Read More</Button>
              </div>
            </div>
          </div>
          <div className="right-col">
            <img src={eventImage} alt="event-image"/>
          </div>
      </div>
    )
  
  };
export default Events;  
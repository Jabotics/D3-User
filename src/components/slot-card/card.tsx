import turfImage from '../../../public/images/truf-image.webp';
import { Button } from '../ui/button';
import {  Heart} from 'lucide-react';

export const SlotCard = () => {
    return (
      <div className="card-main mx-4">
        <div className=" flex relative flex-col gap-4">
            <div className="ground-image rounded-lg relative overflow-hidden">
              <Button className=' absolute top-0 right-0'>
                <Heart/>
              </Button>  
              <img src={turfImage} alt='icon'/>
            </div>
            <div className="slot-content text-left flex flex-row justify-between align-center">
                <div className="slot-title-content">
                    <h3>The Legends Turf XL</h3>
                    <p>Box Cricket, Football</p>
                </div>
                <div className="slot-action rounded-3xl">
                    <Button>Book Now</Button>
                </div>
            </div>
        </div>
      </div>
    )
  
  };
export default SlotCard; 
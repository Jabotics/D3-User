// import hiwIcon1 from '../../../public/images/hiw-icon1.svg';

export const HowitworksCard = (hiwdata:any) => {
    return (
      <div className="card-main mx-4">
        <div className=" flex relative justify-center align-center p-5 bg-background  gap-4 rounded-md">
            <span className='_count'>{hiwdata.count}</span>
            <div className="hiw-icon flex justify-center align-center">
              <img src={hiwdata.icon} alt='icon'/>
            </div>
            <div className="hiw-content text-left">
              <h3>{hiwdata.title}</h3>
              <p>{hiwdata.description}</p>
            </div>
        </div>
      </div>
    )
  
  };
export default HowitworksCard; 
// import hiwIcon1 from '../../../public/images/hiw-icon1.svg';

const HowitworksCard = (hiwdata: any) => {
  return (
    <div className="w-[25rem] mx-4">
      <div className="flex relative items-center justify-center align-center p-5 bg-background gap-4 h-20 sm:h-32 rounded-md shadow-xl overflow-hidden">
        <span className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-lime-600 text-white flex items-end justify-center text-sm">
          <span className="translate-x-1 -translate-y-1">{hiwdata.count}</span>
        </span>
        <div className="hiw-icon flex justify-center align-center">
          <img src={hiwdata.icon} alt="icon" />
        </div>
        <div className="hidden lg:block text-left">
          <h3 className="font-semibold">{hiwdata.title}</h3>
          <p className="font-light text-sm">{hiwdata.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HowitworksCard;

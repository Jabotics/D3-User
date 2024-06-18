
import posterImg from '../../assets/posterImg.jpg'
import { Button } from '../ui/button'
const PosterContainer = () => {
    return (
        <div className="flex flex-row bg-[#53A53F] w-[80%] max-h-[220px] border rounded-lg">
            <div className="w-[50%] flex flex-col justify-center gap-1">
                <span className='inline-block text-[20px] text-white self-center'>Host Your Events</span>
                <p className='p-0 m-0 text-[12px] text-white self-center'>Engage with the Largest Sports Community and Network</p>
                <Button className='w-[120px] self-center mt-4'>Get in Touch </Button>
            </div>
            <div className="w-[50%] rounded-lg">
                <img src={posterImg} alt='posterImg' className='h-[200px] w-[100%]' />
            </div>
        </div>
    )
}

export default PosterContainer
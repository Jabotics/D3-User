import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const D3App = () => {
  return (
    <div className='w-[96vw] px-4 h-[55vh] flex items-center justify-evenly relative'>
      <div className='w-1/2'>
      <h1 className='text-2xl font-semibold'>Download the App for free</h1>
      <h6 className='text-ld mt-3 text-gray-700'>Enter your mobile number to receive the download link via SMS</h6>
      <Input placeholder='Mobile Number' className='mt-10 h-12 w-[30rem]' />
      <Button variant={'default'} className='mt-4 w-40 bg-gray-300 font-bold'>Send</Button>

      <img src="/images/playstore.png" alt="" className='absolute right-[44rem] bottom-5 h-16' />
      </div>
      <div>
        <img src="/images/d3-app.png" alt="app" className='h-[30rem]' />
      </div>
    </div>
  )
}

export default D3App
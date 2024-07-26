import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useAddEventRequestMutation } from '@/store/actions/slices/eventSlice'

const formSchema = z.object({
    name: z.string()
        .min(1, { message: 'Please enter your name' }),
    mobile: z.string()
})
const EventRegistrationForm = ({ eventId }: { eventId: string }) => {
    const [addRequest] = useAddEventRequestMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            mobile: '',
        },
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        try {
            const res: any = await addRequest({
                event: eventId,
                name: data?.name,
                mobile: data?.mobile,
            }).unwrap()

            form.reset()
            toast(res?.message)
            //   navigate('/')
        } catch (error: any) {
            toast(error?.data?.message)
        }
    }
    return (
        <div className="flex flex-col md:w-[60%] w-[100%] justify-center">
            <span className='inline-block text-[20px] font-bold self-center'>Register Now</span>
            <Form {...form}>
                <form className='w-[100%] md:w-[90%] lg:w-[80%] flex flex-col gap-2 items-center self-center' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='space-y-1 w-[80%] '>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter Your Name' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='mobile'
                        render={({ field }) => (
                            <FormItem className='space-y-1 w-[80%]'>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter Your Mobile Number' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button className='mt-4 bg-[#53a53f] w-[80%] p-2 text-white rounded-md'>
                        Register
                    </button>
                </form>
            </Form>

        </div>
    )
}

export default EventRegistrationForm
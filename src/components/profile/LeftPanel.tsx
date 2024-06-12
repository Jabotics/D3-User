import { FaRegHeart } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { LiaExpeditedssl } from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
import { RiEditCircleFill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdCardMembership } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Calendar } from "@/components/ui/calendar"
  import { CalendarIcon, Mail, Phone, UserRound } from "lucide-react"
  import { cn } from "@/lib/utils"
  import { format } from "date-fns"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
interface SideMenu {
    title: string;
    icon: IconType;
}

const sideMenu: SideMenu[] = [
    {
        title: 'My Booking',
        icon: AiOutlineFileDone
    },
    {
        title: 'Academy',
        icon: HiOutlineAcademicCap
    },
    {
        title: 'Memberships',
        icon: MdCardMembership
    },
    {
        title: 'Favorite',
        icon: FaRegHeart
    },
    {
        title: 'Terms & Conditions',
        icon: LiaExpeditedssl
    },
    {
        title: 'Logout',
        icon: IoLogOutOutline
    }
]

const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      phone: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      dob: z.date({
        required_error: "A date of birth is required.",
      }),
      gender: z
    .string({
      required_error: "Please select an gender to display.",
    })
  })
const LeftPanel = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email:"",
          phone:"",
          gender:"",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

    return (
        <div className='w-[318px] mt-20 h-[554px]'>
            <div className='flex justify-between'>
                <div className="flex gap-2">
                    <div className="w-9 h-9">
                        <img src="/images/male.png" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs font-light text-[#53A53F]">+91 8596554477</span>
                    </div>
                </div>
                <Dialog>
      <DialogTrigger asChild>
        <Button  className="bg-[#53A53F]  text-white "> <span>Edit</span>
        <RiEditCircleFill /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
          Complete Profile for better visibility
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="relative">
                <UserRound className="absolute top-3.5 left-2 h-4 w-4 opacity-50"/>
              <FormControl>
                <Input placeholder="name" {...field} className="pl-8"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
                      <Mail  className="absolute top-3.5 left-2 h-4 w-4 opacity-50"/>
              <FormControl>
                <Input placeholder="email" {...field} className="pl-8"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="relative">
                   <Phone className="absolute top-3.5 left-2 h-4 w-4 opacity-50"/>
              <FormControl>
                <Input placeholder="phone" {...field} className="pl-8"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>DOB</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Submit</Button>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
                {/* <div className="flex items-center bg-[#53A53F] px-2 rounded text-center gap-1 justify-center text-white text-sm font-light py-1 h-8 cursor-pointer" >
                    <span>Edit</span>
                    <RiEditCircleFill />
                </div> */}
            </div>

            <div className="w-[318px] h-[400px] bg-white mt-4 rounded-md">
                <div className="pt-6">
                    {
                        sideMenu.map((menu, index) => {
                            const IconComponent = menu.icon;
                            return (
                                <div className="px-5 mt-4 pb-4 flex justify-between items-center border-b-2" key={index}>
                                    <div className="flex items-center text-sm gap-2 cursor-pointer">
                                        <IconComponent className="text-[#53A53F] text-xl" />
                                        <span className={`font-light ${menu.title === 'My Booking' && 'text-[#53A53F] font-medium'}`}>{menu.title}</span>
                                    </div>
                                    <IoIosArrowForward className="text-[#53A53F] cursor-pointer" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LeftPanel
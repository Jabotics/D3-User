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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Mail, Phone, UserRound } from "lucide-react";
import { Button } from "../ui/button";
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
    gender: z
        .string({
            required_error: "Please select an gender to display.",
        })
})

const MembershipFormContainer = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            gender: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="flex w-[80%] h-[900px] bg-[#e4fbdd] rounded-md justify-center items-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row w-[90%] flex-wrap gap-2 ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="relative w-[45%]">
                                <UserRound className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                                <FormControl>
                                    <Input placeholder="name" {...field} className="pl-8" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="relative w-[45%]">
                                <Mail className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                                <FormControl>
                                    <Input placeholder="email" {...field} className="pl-8" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="relative w-[45%] flex">
                                <Phone className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                                <FormControl>
                                    <Input placeholder="phone" {...field} className="pl-8" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="relative w-[45%]">
                                <Mail className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                                <FormControl>
                                    <Input placeholder="email" {...field} className="pl-8" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="relative w-[45%]">
                                <Mail className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                                <FormControl>
                                    <Input placeholder="email" {...field} className="pl-8" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="relative w-[45%]">
                                <Mail className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                                <FormControl>
                                    <Input placeholder="email" {...field} className="pl-8" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-[45%] ">
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
                    <Button className="w-[80%]" type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default MembershipFormContainer
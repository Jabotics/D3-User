import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./form-schema";
import { useSubmitInquiriesMutation } from "@/store/actions/slices/contactSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";

const ContactForm = () => {
  const contactForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      inquiry_type: "",
      description: "",
    },
  });

  const [submit, { data, isLoading }] = useSubmitInquiriesMutation();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await submit(formData).unwrap();
      toast("Submission successful:", {
        description: data?.message,
      });
    } catch (err) {
      toast("Submission error");
    } finally {
      contactForm.reset();
      contactForm.setValue("inquiry_type", "")
    }
  };

  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full mt-10"
      >
        <div className="flex flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-1">
            <p>
              First Name <span className="text-rose-700">*</span>
            </p>
            <Input
              {...contactForm.register("first_name")}
              className="h-12 mt-3 border-gray-700"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-1">
            <p>
              Last Name <span className="text-rose-700">*</span>
            </p>
            <Input
              {...contactForm.register("last_name")}
              className="h-12 mt-3 border-gray-700"
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-5">
          <div className="w-1/2 flex flex-col gap-1">
            <p>
              Mobile Number <span className="text-rose-700">*</span>
            </p>
            <Input
              {...contactForm.register("mobile")}
              className="h-12 mt-1 border-gray-700"
              type="number"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-1">

            <FormField
              control={contactForm.control}
              name="inquiry_type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-base">
                      <p>
                        Topic of Inquiry{" "}
                        <span className="text-rose-700">*</span>
                      </p>
                    </FormLabel>
                    <Select
                      onValueChange={(data) => {
                        field.onChange(data);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize h-12 mt-1 border-gray-700">
                          <SelectValue placeholder="Select Topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Booking">Play & Play</SelectItem>
                        <SelectItem value="Academy">Academy</SelectItem>
                        <SelectItem value="Membership">Membership</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-5">
          <div className="w-full flex flex-col gap-1">
            <p>
              Comment <span className="text-rose-700">*</span>
            </p>
            <Textarea
              {...contactForm.register("description")}
              className="w-full border-gray-700 mt-1 min-h-40 max-h-60"
              onChange={(e) => {
                contactForm.setValue("description", e.target.value);
              }}
            ></Textarea>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center mt-10">
          <Checkbox {...contactForm.register("description")} />
          <p>
            I agree to receive future communications from D3, in accordance with
            the <span className="text-[#53A53F]">Privacy Policy</span>.
          </p>
        </div>

        <Button
          className="mt-16 w-fit px-16"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitReviewsMutation } from "@/store/actions/slices/reviewSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  first_name: z.string().min(1, { message: "Please enter a first name" }),
  last_name: z.string().min(1, { message: "Please enter a last name" }),
  mobile: z.string().regex(/^\+?\d{10}$/, "Phone should be atleast 10 digits"),
  topic: z.string(),
  feedback: z.string(),
});

const ReviewForm = () => {
  const reviewForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      topic: "",
      feedback: "",
    },
  });

  const [submit, { data, isLoading }] = useSubmitReviewsMutation();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      await submit(formData).unwrap();
      toast("Submission successful:", {
        description: data?.message,
      });
    } catch (err) {
      toast("Submission error");
    } finally {
      reviewForm.reset();
      reviewForm.setValue("feedback", "");
    }
  };

  return (
    <Form {...reviewForm}>
      <form
        className="flex flex-col w-full h-full mt-10"
        onSubmit={reviewForm.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-1">
            <p>
              First Name <span className="text-rose-700">*</span>
            </p>
            <Input
              {...reviewForm.register("first_name")}
              className="h-12 mt-3 border-gray-700"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-1">
            <p>
              Last Name <span className="text-rose-700">*</span>
            </p>
            <Input
              {...reviewForm.register("last_name")}
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
              {...reviewForm.register("mobile")}
              className="h-12 mt-1 border-gray-700"
              type="number"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-1">
            {/* <p>
              Topic of Interest <span className="text-rose-700">*</span>
            </p>
            <Select>
              <SelectTrigger className="h-12 mt-1 border-gray-700">
                Pay & Play
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"play"}>Play & Play</SelectItem>
                <SelectItem value={"academy"}>Academy</SelectItem>
                <SelectItem value={"membership"}>Membership</SelectItem>
                <SelectItem value={"others"}>Others</SelectItem>
              </SelectContent>
            </Select> */}

            <FormField
              control={reviewForm.control}
              name="topic"
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
                        <SelectItem value="Other">Others</SelectItem>
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
              Your Review <span className="text-rose-700">*</span>
            </p>
            <Textarea
              {...reviewForm.register("feedback")}
              className="w-full border-gray-700 mt-1 min-h-40 max-h-60"
              onChange={(e) => {
                reviewForm.setValue("feedback", e.target.value);
              }}
            ></Textarea>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center mt-10">
          <Checkbox />
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

export default ReviewForm;

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const FeedbackForm = () => {
  return (
    <div className="flex flex-col w-full h-full mt-10">
      <div className="flex flex-row gap-4">
        <div className="w-1/2 flex flex-col gap-1">
          <p>
            First Name <span className="text-rose-700">*</span>
          </p>
          <Input className="h-12 mt-3 border-gray-700" />
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          <p>
            Last Name <span className="text-rose-700">*</span>
          </p>
          <Input className="h-12 mt-3 border-gray-700" />
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-5">
        <div className="w-1/2 flex flex-col gap-1">
          <p>
            Mobile Number <span className="text-rose-700">*</span>
          </p>
          <Input className="h-12 mt-1 border-gray-700" type="number" />
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          <p>
            Topic of Inquiry <span className="text-rose-700">*</span>
          </p>
          <Select>
            <SelectTrigger className="h-12 mt-1 border-gray-700">
              Pay & Play
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"play"}>Play & Play</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-5">
        <div className="w-full flex flex-col gap-1">
          <p>
            Feedback <span className="text-rose-700">*</span>
          </p>
          <Textarea className="w-full border-gray-700 mt-1 min-h-40 max-h-60"></Textarea>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center mt-10">
        <Checkbox />
        <p>
          I agree to receive future communications from D3, in accordance with
          the <span className="text-[#53A53F]">Privacy Policy</span>.
        </p>
      </div>

      <Button className="mt-16 w-fit px-16">Submit</Button>
    </div>
  );
};

export default FeedbackForm;

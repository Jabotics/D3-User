import { FaRegHeart } from "react-icons/fa";
import { IconType } from "react-icons/lib";
// import { LiaExpeditedssl } from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
import {
  // CalendarIcon,
  Mail,
  // Phone,
  UserRound,
} from "lucide-react";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setTitle } from "@/store/actions/slices/profileSlice";
import { FaEdit } from "react-icons/fa";
import {
  logout,
  setProfile,
  useUpdateProfileMutation,
} from "@/store/actions/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useLogoutQuery } from "@/store/actions/slices/otpSlice";
import { APIEndPoints } from "@/APIEndpoint";

interface SideMenu {
  title: "Academy" | "My Booking" | "Memberships" | "Favorite" | "Logout";
  icon: IconType;
}

const sideMenu: SideMenu[] = [
  {
    title: "My Booking",
    icon: AiOutlineFileDone,
  },
  {
    title: "Academy",
    icon: HiOutlineAcademicCap,
  },
  {
    title: "Memberships",
    icon: MdCardMembership,
  },
  {
    title: "Favorite",
    icon: FaRegHeart,
  },
  // {
  //     title: 'Terms & Conditions',
  //     icon: LiaExpeditedssl
  // },
  {
    title: "Logout",
    icon: IoLogOutOutline,
  },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // phone: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  // dob: z.date({
  //   required_error: "A date of birth is required.",
  // }),
  // gender: z.string({
  //   required_error: "Please select an gender to display.",
  // }),
});
const LeftPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [update] = useUpdateProfileMutation();

  const [open, setOpen] = useState(false);
  const [toLogout, setToLogout] = useState(false);
  useLogoutQuery({}, { skip: !toLogout });

  const { userData } = useAppSelector((state: RootState) => state.auth);
  const { title } = useAppSelector((state: RootState) => state.profile);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      // phone: "",
      // gender: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = async (values: { name: string; email: string }) => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();

    const first_name = values.name.split(" ")[0].trim();
    const last_name = values.name.split(" ")[1].trim();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", values.email);
    formData.append("profile_img", selectedFile, selectedFile.name); // Append file with name and content type

    try {
      const res = await update({
        formData,
      }).unwrap();

      if (!res) {
        throw new Error("Failed to upload file.");
      }

      userData &&
        userData.profile_img &&
        previewUrl &&
        dispatch(
          setProfile({
            email: values.email,
            first_name,
            last_name,
            profile_img: previewUrl.includes("blob")
              ? previewUrl
              : userData?.profile_img,
          })
        );

      setOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error appropriately
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const renamedFile = new File([file], "profile.jpg", { type: file.type });
      setSelectedFile(renamedFile);
      const blobUrl = URL.createObjectURL(file);
      setPreviewUrl(blobUrl);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleLogout = async () => {
    try {
      setToLogout(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch(logout());
      navigate("/");

      setToLogout(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      form.setValue("name", `${userData.first_name} ${userData.last_name}`);
      form.setValue(
        "email",
        userData?.email !== undefined ? userData.email : ""
      );

      if (userData.profile_img?.includes('blob')) {
        setPreviewUrl(userData.profile_img)
      } else {
        setPreviewUrl(`${APIEndPoints.BackendURL}/${userData.profile_img}`);
      }
    }
  }, [userData]);

  return (
    <div className="w-full h-full ">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-10 h-10 border-2 border-[#53A53F] rounded-full overflow-hidden">
            <img
              src={previewUrl ? previewUrl : `/images/male.png`}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {userData && userData.first_name && userData.last_name
                ? `${userData?.first_name + " " + userData?.last_name}`
                : "John Doe"}
            </span>
            <span className="text-xs tracking-wide font-medium text-[#53A53F]">
              {userData && userData.mobile ? `+91 ${userData?.mobile}` : ""}
            </span>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#53A53F] rounded-xl h-8 text-white flex items-center justify-center gap-2">
              {" "}
              <span>Edit</span>
              <FaEdit size={12} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="h-32 w-full space-y-0">
              <DialogTitle className="h-1/3 w-full bg-[#53A53F] flex flex-col justify-start pt-2 pl-5 text-sm text-gray-200 rounded-t-md">
                Edit profile
              </DialogTitle>
              <DialogDescription className="h-2/3 w-full relative">
                <span className="h-1/2 bg-[#53A53F]" />
                <span className="h-1/2 bg-gray-50" />
                <label className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-24 w-24 border-[5px] border-gray-50 overflow-hidden rounded-full flex items-center justify-center cursor-pointer">
                  <img
                    src={previewUrl ? previewUrl : `/images/male.png`}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                  <input
                    type="file"
                    className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </label>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-10"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <UserRound className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="pl-8"
                        />
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
                      <Mail className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="pl-8"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <Phone className="absolute top-3.5 left-2 h-4 w-4 opacity-50" />
                      <FormControl>
                        <Input
                          placeholder="phone"
                          {...field}
                          className="pl-8"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* <FormField
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
                /> */}
                {/* <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                /> */}
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className=" hidden sm:block w-[100%] h-1/2 bg-white mt-10 rounded-3xl">
        <div className="pt-6 cursor">
          {sideMenu.map((menu, index) => {
            const IconComponent = menu.icon;
            return (
              <div
                className={`px-5 mt-4 pb-4 flex justify-between items-center ${
                  menu.title !== "Logout" && "border-b-2"
                } cursor-pointer`}
                key={index}
                onClick={() => {
                  if (menu.title === "Logout") {
                    handleLogout();
                  } else {
                    dispatch(setTitle(menu.title));
                  }
                }}
              >
                <div className="flex items-center text-sm gap-2 ">
                  <IconComponent className="text-[#53A53F] text-xl" />
                  <span
                    className={` ${
                      menu.title === title && "text-[#53A53F] font-medium"
                    } ${
                      menu.title === "Logout" ? "font-medium" : "font-light"
                    } tracking-wide`}
                  >
                    {menu.title === "Logout" ? "Log out" : menu.title}
                  </span>
                </div>
                <IoIosArrowForward className="text-[#53A53F] " />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;

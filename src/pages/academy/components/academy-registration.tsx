import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { IoCallOutline, IoCloudUploadOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { RxAvatar, RxCross2 } from "react-icons/rx";
import { MdMyLocation, MdOutlineEmail } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRegistrationAcademy } from "@/store/actions/slices/academySlice";

import { motion } from "framer-motion";
import { RootState } from "@/store";
import { logout } from "@/store/actions/slices/authSlice";

interface AcademyDetailsProps {
  academyId: string;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
  email: z.string().min(1, { message: "Please enter a email" }),
  mobile: z.string().min(1, { message: "Please enter a mobile" }),
  address: z.string().min(1, { message: "Please enter a address" }),
  guardian_name: z.string().min(1, { message: "Please enter a guardian name" }),
  guardian_mobile: z
    .string()
    .min(1, { message: "Please enter a guardian mobile" }),
});

const AcademyRegistrationPage: React.FC<AcademyDetailsProps> = ({
  academyId,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      guardian_name: "",
      guardian_mobile: "",
    },
  });
  const { userData } = useAppSelector((state: RootState) => state.auth);
  const { selectedCity } = useAppSelector((state: RootState) => state.city);
  const { academies } = useAppSelector((state: RootState) => state.academy);

  const [progress, setProgress] = React.useState(0);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [imageBlobUrl, setImageBlobUrl] = React.useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [idProofFile, setIdProofFile] = useState<File | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const idFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleIdDivClick = () => {
    idFileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImageBlobUrl(blobUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const blob = new Blob([reader.result]);
          const extension = file.name.split('.').pop();
          const newFileName = `profile.${extension}`;
          const newFile = new File([blob], newFileName, {
            type: file.type,
            lastModified: file.lastModified,
          });
          setImgFile(newFile);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleIdFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onprogress = (event: ProgressEvent<FileReader>) => {
        if (event.lengthComputable) {
          const percentLoaded = Math.round((event.loaded / event.total) * 100);
          setProgress(percentLoaded);
        }
      };

      reader.onloadend = () => {
        if (reader.result) {
          const blob = new Blob([reader.result]);
          const extension = file.name.split('.').pop();
          const newFileName = `doc.${extension}`;
          const newFile = new File([blob], newFileName, {
            type: file.type,
            lastModified: file.lastModified,
          });
          setIdProofFile(newFile);
        }
        setProgress(100);
      };

      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const selectedAcademy = academies.find((i) => i.id === academyId);
    try {
      const { address, email, guardian_mobile, guardian_name, mobile, name } =
        data;
      const [first_name, last_name] = name.split(" ");

      if (!!!first_name || !!!last_name) {
        throw new Error(
          "Name is not proper, add a space between first and last name"
        );
      }
      if (!!!imgFile) {
        throw new Error("Please upload a Profile Picture");
      }
      if (!!!idProofFile) {
        throw new Error("Please upload an ID Proof");
      }
      if (!!!selectedAcademy) {
        throw new Error("Something went wrong!");
      }
      if (!!!userData?.id) {
        throw new Error("Something went wrong! Can't find User");
      }

      const admission_fee = selectedAcademy.admission_fees

      dispatch(
        setRegistrationAcademy({
          academy_fee: 0,
          admission_fee,
          address,
          email,
          first_name: first_name.trim(),
          guardian_mobile,
          guardian_name,
          last_name: last_name.trim(),
          mobile,
          profile: imgFile,
          doc: idProofFile,
          academy: academyId,
          venue: selectedAcademy.ground.venue._id,
          sport: selectedAcademy.sport._id,
          customer: userData?.id,
          city: selectedCity,
          ground: selectedAcademy.ground._id,
        })
      );

      navigate(`/academy?id=${academyId}&join=1&city=${selectedCity}&payment=true`);
    } catch (error: any) {
      setErrorMessage(error.message);
      if (error.message === "Something went wrong! Can't find User") {
        dispatch(logout());
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    if (userData?.mobile) {
      form.setValue("mobile", userData.mobile);
    }
  }, [userData?.mobile]);

  return (
    <>
      <div className="flex items-center justify-between w-full h-24 mt-0 lg:mt-4 px-5">
        <div
          className="bg-[#53A53F] p-1 rounded-lg text-gray-100 cursor-pointer"
          onClick={() => {
            navigate(`/academy?id=${academyId}`);
          }}
        >
          <HiOutlineArrowLongLeft size={30} />
        </div>
        <div className="text-xs xs:text-sm sm:text-lg md:text-xl w-full lg:w-[45%] text-center font-medium tracking-wider">
          Step into the World of Sports and Fitness at the Comfort of your Home.
        </div>
        <div />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-1 bg-[#83ca711e] rounded-3xl flex flex-col items-center gap-3 lg:gap-0 justify-center border-2 border-[#53A53F] relative">
            {errorMessage && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="absolute top-5 right-5 w-80 min-h-8 rounded-md border-[1px] border-[#53A53F] text-[#53A53F] text-xs px-2 py-1"
              >
                <p className="relative">
                  <RxCross2
                    className="absolute -top-1 -right-2 bg-green-900 rounded-full text-gray-100 cursor-pointer"
                    onClick={() => setErrorMessage(null)}
                  />
                  {errorMessage}
                </p>
              </motion.div>
            )}
            <div className="w-full h-16 flex items-center lg:items-end text-center text-sm lg:text-lg justify-center font-semibold tracking-wide text-[#53A53F]">
              Fill in the form to join this academy.
            </div>
            <div className="flex-1 w-full mt-3">
              <div className="w-full h-full flex flex-col gap-5 lg:gap-3 items-center justify-evenly">
                <div className="h-1/4 flex items-center lg:items-end justify-center ">
                  <div
                    className={`w-24 h-24 bg-green-50 border-2 border-[#53a53f] rounded-md flex items-center justify-center relative ${
                      imageBlobUrl ? "" : "cursor-pointer"
                    }`}
                    onClick={handleDivClick}
                  >
                    <input
                      ref={fileInputRef}
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={Boolean(imageBlobUrl)}
                    />
                    {imageBlobUrl && (
                      <div>
                        <img
                          src={imageBlobUrl}
                          alt="Selected"
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </div>
                    )}
                    {imageBlobUrl && (
                      <div className="absolute -bottom-2 -right-2 bg-[#53a53f] w-7 h-7 rounded-full flex items-center justify-center">
                        <div
                          className="flex items-center justify-center border-2 border-gray-50 rounded-full h-5 w-5 cursor-pointer"
                          onClick={() => {
                            setImageBlobUrl(null);
                            setImgFile(null);
                          }}
                        >
                          <MdModeEdit size={10} className="text-gray-50" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full h-1/2 grid grid-cols-2 gap-3 px-4 lg:px-24">
                  <div className="col-span-2 lg:col-span-1 flex flex-col w-full items-center justify-center gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                              <RxAvatar size={24} />
                              <Input
                                className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                                placeholder="Name"
                                style={{ outline: "none", boxShadow: "none" }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                              <IoCallOutline size={24} />
                              <Input
                                className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                                placeholder="Phone"
                                style={{ outline: "none", boxShadow: "none" }}
                                {...field}
                                disabled
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guardian_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                              <RxAvatar size={24} />
                              <Input
                                className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                                placeholder="Guardian name"
                                style={{ outline: "none", boxShadow: "none" }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1 flex flex-col w-full items-center justify-center gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                              <MdOutlineEmail size={24} />
                              <Input
                                className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                                placeholder="Email"
                                style={{ outline: "none", boxShadow: "none" }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                              <MdMyLocation size={24} />
                              <Input
                                className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                                placeholder="Address"
                                style={{ outline: "none", boxShadow: "none" }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guardian_mobile"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                              <IoCallOutline size={24} />
                              <Input
                                className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                                placeholder="Guardian Phone"
                                style={{ outline: "none", boxShadow: "none" }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="h-1/4 w-full px-5 mt-5 lg:mt-0 lg:px-24 flex flex-col">
                  <div className="text-sm font-medium tracking-wide">
                    Upload Id File (Aadhar / Pan / Driving License / Passport)
                  </div>
                  <div className="text-xs text-gray-400">
                    (Max file size: 5MB and upload only .jpg / .png / .pneg
                    file)
                  </div>
                  <div className="w-full h-full mt-3 flex flex-col lg:flex-row items-center justify-center">
                    <div
                      className="w-full lg:w-1/2 h-full flex items-center justify-center"
                      onClick={handleIdDivClick}
                    >
                      <div className="w-full h-32 lg:h-full border border-dashed border-green-500 rounded-xl bg-[#53a53f3f] flex items-center gap-12 justify-center cursor-pointer">
                        <div className="w-40 h-full flex flex-col items-center justify-center">
                          <IoCloudUploadOutline
                            size={window.innerWidth >= 1024 ? 32 : 16}
                            className="text-[#53A53F]"
                          />
                          <div className="text-[10px] whitespace-nowrap lg:whitespace-normal lg:text-xs">
                            Drag & Drop file to upload
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-gray-50 rounded-full p-2 flex items-center justify-center">
                          Or
                        </div>
                        <div className="text-xs underline font-semibold">
                          Browse File
                        </div>
                        <Input
                          ref={idFileInputRef}
                          className="hidden"
                          type="file"
                          accept="image/*"
                          onChange={handleIdFileChange}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 mt-5 lg:mt-0 h-full flex flex-col items-start ml-5 justify-start">
                      {fileName && (
                        <div className="text-sm">File Uploading...</div>
                      )}
                      <div className="h-2/3 w-full flex items-end justify-center mt-5 lg:mt-0">
                        <div className="w-[95%] h-[80%] bg-white rounded-md flex items-center justify-start gap-3 px-2 relative">
                          <CiImageOn size={30} className="text-[#53A53F]" />
                          <div className="w-[85%] h-1/2 flex flex-col items-start justify-center">
                            <div className="text-xs text-gray-500 font-medium tracking-wider">
                              {fileName || "No file selected"}{" "}
                              {/* Display the file name here */}
                            </div>
                            {fileName && (
                              <div className="w-full h-4">
                                <Progress
                                  value={progress}
                                  className="w-full h-2 mt-1"
                                />
                              </div>
                            )}
                          </div>
                          {fileName && (
                            <div
                              className="absolute top-0 right-0 p-1 cursor-pointer"
                              onClick={() => {
                                setFileName("");
                              }}
                            >
                              <RxCross2 size={10} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-20 w-full flex items-center justify-center mt-6">
              <Button
                variant={"default"}
                className="w-full mx-4 lg:mx-0 lg:w-[35%] rounded-md lg:rounded-full"
                type="submit"
              >
                Join Academy
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AcademyRegistrationPage;

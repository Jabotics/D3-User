import React from "react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { IoCallOutline, IoCloudUploadOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { RxAvatar, RxCross2 } from "react-icons/rx";
import { MdMyLocation, MdOutlineEmail } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const AcademyRegistration = () => {
  const [progress, setProgress] = React.useState(0);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const [imageBlobUrl, setImageBlobUrl] = React.useState<string | null>(null);
  const [_binaryFileData, setBinaryFileData] =
    React.useState<ArrayBuffer | null>(null);

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
          setBinaryFileData(reader.result as ArrayBuffer);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleIdFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name); // Set the file name when a file is selected
      const reader = new FileReader();

      reader.onprogress = (event: ProgressEvent<FileReader>) => {
        if (event.lengthComputable) {
          const percentLoaded = Math.round((event.loaded / event.total) * 100);
          setProgress(percentLoaded);
        }
      };

      reader.onloadend = () => {
        setProgress(100); // Set progress to 100% when done
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-24 mt-0 lg:mt-4">
        <div className="text-xs xs:text-sm sm:text-lg md:text-xl w-full lg:w-[45%] text-center font-medium tracking-wider">
          Step into the World of Sports and Fitness at the Comfort of your Home.
        </div>
      </div>

      <div className="flex-1 bg-[#83ca711e] rounded-3xl flex flex-col items-center gap-3 lg:gap-0 justify-center border-2 border-[#53A53F]">
        <div className="w-full h-16 flex items-center lg:items-end text-center text-sm lg:text-lg justify-center font-semibold tracking-wide text-[#53A53F]">
          Fill in the form to join this academy.
        </div>
        <div className="flex-1 w-full">
          <div className="w-full h-full flex flex-col gap-5 lg:gap-0 items-center justify-evenly">
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
                        setBinaryFileData(null);
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
                <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                  <RxAvatar size={24} />
                  <Input
                    className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                    placeholder="Name"
                    style={{ outline: "none", boxShadow: "none" }}
                  />
                </div>
                <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                  <IoCallOutline size={24} />
                  <Input
                    className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                    placeholder="Phone"
                    style={{ outline: "none", boxShadow: "none" }}
                  />
                </div>
                <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                  <RxAvatar size={24} />
                  <Input
                    className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                    placeholder="Guardian name"
                    style={{ outline: "none", boxShadow: "none" }}
                  />
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1 flex flex-col w-full items-center justify-center gap-5">
                <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                  <MdOutlineEmail size={24} />
                  <Input
                    className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                    placeholder="Email"
                    style={{ outline: "none", boxShadow: "none" }}
                  />
                </div>
                <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                  <MdMyLocation size={24} />
                  <Input
                    className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                    placeholder="Address"
                    style={{ outline: "none", boxShadow: "none" }}
                  />
                </div>
                <div className="flex items-center rounded-full w-full bg-stone-50 border-2 border-[#53a53f] px-2">
                  <IoCallOutline size={24} />
                  <Input
                    className="rounded-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#53a53f85]"
                    placeholder="Guardian Phone"
                    style={{ outline: "none", boxShadow: "none" }}
                  />
                </div>
              </div>
            </div>

            <div className="h-1/4 w-full px-5 mt-5 lg:mt-0 lg:px-24 flex flex-col">
              <div className="text-sm font-medium tracking-wide">
                Upload File
              </div>
              <div className="text-xs text-gray-400">
                (Max file size: 5MB and upload only .jpg / .png / .pneg file)
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
                  {fileName && <div className="text-sm">File Uploading...</div>}
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
          >
            Join Academy
          </Button>
        </div>
      </div>
    </>
  );
};

export default AcademyRegistration;

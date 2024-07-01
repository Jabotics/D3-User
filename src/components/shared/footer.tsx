import footerLogo from "../../../public/images/logo-footer.svg";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-stone-800 py-8 px-5 md:px-0 w-screen overflow-hidden ">
      <div className="container mb-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <img src={footerLogo} alt="footer logo" className=" w-36" />
            <p className="text-[13px] text-gray-400 mt-4 w-60 sm:w-full mb-2 sm:mb-0">
              We are a one-stop platform to help sports enthusiasts meet
              playpals, discover venues, skill-up their game, manage their
              activities seamlessly and buy gear.
            </p>
            <Link to={"/about"} className="text-gray-50 text-[14px] underline">Read More</Link>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-wrap">
            <div className="quick-link w-1/2">
              <h5 className="text-white mb-4">Quick Link</h5>
              <ul className="flex flex-col gap-0 md:gap-2 text-[11px] text-gray-400">
                <li>
                  <Link to={"/pay_play"}>Pay & Play</Link>
                </li>
                <li>
                  <Link to={"/#"}>Event</Link>
                </li>
                <li>
                  <Link to={"/about"}>About Us</Link>
                </li>
                <li>
                  <Link to={"/contact"}>Contact Us </Link>
                </li>
                <li>
                  <Link to={"/academy"}>Academy</Link>
                </li>
                <li>
                  <Link to={"/#"}>Blog</Link>
                </li>
                <li>
                  <Link to={"/membership"}>Membership</Link>
                </li>
              </ul>
            </div>
            <div className="legal w-1/2">
              <h5 className="text-white mb-4">Legal</h5>
              <ul className="flex flex-col gap-2 text-[11px] text-gray-400">
                <li>
                  <Link to={"/about"}>About Us </Link>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#"> Terms Of Use</a>
                </li>
                {/* <li>
                  <a href="#">Cookies Policy</a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <h5 className="text-white mb-2 md:mb-4">Contact</h5>
            <ul className="contact flex flex-col gap-0 md:gap-2 text-[11px] text-gray-400">
              <li>
                <a href="tel:+4733378901" className="flex items-center">
                  <Phone className="mr-2" size={10} />
                  <span>9874 475 988</span>
                </a>
              </li>
              <li>
                <a href="tel:+4733378901" className="flex items-center">
                  <Mail className="mr-2" size={10} />
                  <span>@d3arena.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+4733378901" className="flex items-center">
                  <MapPin className="mr-2" size={10} />
                  <span>Akshya Nagar 1st Block, Bangalore-560016.</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Separator className="bg-zinc-600" />
      <div className="copy-wright">
        <div className="container text-center text-xs text-gray-400 mt-4 mb-0">
          <p>
            © 2024{" "}
            <a href="/" className="text-theme">
              D3arena
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

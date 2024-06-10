import footerLogo from'../../../public/images/logo-footer.svg';
import { Phone,Mail,MapPin } from 'lucide-react';

export const Footer = () => {
    return (
      <div className="footer-sec">
        <div className="container">
            <div className="grid grid-cols-12 items-start">
                <div className="col-span-12 md:col-span-4">
                    <img src={footerLogo} alt="footer logo" className='mb-4'/>
                    <p>We are a one-stop platform to help sports enthusiasts meet playpals, discover venues, skill-up their game, manage their activities seamlessly and buy gear.</p>
                </div>
                <div className="col-span-12 md:col-span-5  flex flex-row ">
                    <div className="quick-link w-2/3">
                        <h5>Quick Link</h5>
                        <ul className='flex flex-col gap-4 w-full'>
                            <li><a href="#">Pay n Play</a></li>
                            <li><a href="#">Event</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact Us </a></li>
                            <li><a href="#">Academy</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Membership</a></li>
                        </ul>
                    </div>
                    <div className="legal w-1/3">
                        <h5>Legal</h5>
                        <ul className='flex flex-col gap-4 w-full'>
                            <li><a href="#">Contact Us </a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#"> Terms Of Use</a></li>
                            <li><a href="#">Cookies Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <h5>Contact</h5>
                    <ul className='contact flex flex-col gap-4 w-full'>
                        <li>
                            <a href="tel:+4733378901">
                               <span><Phone /></span> <p> Contact Us </p>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+4733378901">
                               <span><Mail /></span><p> @d3arena.com</p>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+4733378901">
                               <span><MapPin/></span> <p>Akshya Nagar 1st Block, Bangalore-560016.</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="copy-wright">
            <div className="container text-center">
                <p>© 2024 <a href="/">D3arena</a> All rights reserved.</p>
            </div>
        </div>
      </div>
    )
  
  };

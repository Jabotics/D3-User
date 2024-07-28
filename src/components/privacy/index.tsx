import { MdCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const PrivacyPolicyComponent = ({
  policies,
  certifications,
  frauds,
  identityThefts,
  cyberSecurities,
  faqs,
}: {
  policies: React.MutableRefObject<HTMLDivElement | null>;
  certifications: React.MutableRefObject<HTMLDivElement | null>;
  frauds: React.MutableRefObject<HTMLDivElement | null>;
  identityThefts: React.MutableRefObject<HTMLDivElement | null>;
  cyberSecurities: React.MutableRefObject<HTMLDivElement | null>;
  faqs: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="ml-20 pr-60 mt-20">
      <div className="mt-10 mb-20" id="policies" ref={policies}>
        <h2 className="text-4xl mb-5">Privacy Policies</h2>
        <div>
          Welcome to D3 Sports Arena! Your privacy and security are important to
          us. This Privacy Policy outlines how we collect, use, disclose, and
          safeguard your information when you visit our website, use our app, or
          engage in our services. Please read this policy carefully to
          understand our practices regarding your personal data.
        </div>

        <div className="ml-5 mt-10">
          <Link
            className="flex items-center gap-3"
            to={"/privacy-policy/privacy-security-notice"}
            target="_blank"
            rel="norefferer noopener"
          >
            <MdCircle className="text-[#53a53f]" size={10} />
            <p className="text-[#53a53f] font-medium text-lg tracking-wider hover:underline cursor-pointer">
              Privacy Notice
            </p>
          </Link>
        </div>
      </div>

      <div className="my-10 mb-20" id="certifications" ref={certifications}>
        <h2 className="text-4xl mb-5">Privacy Certifications</h2>
        <div>
          As part of our overall approach to privacy and security, D3
          occasionally participates in privacy-related programs and maintains
          privacy-related certifications on certain products, services, and
          experiences.
        </div>

        <p className="mt-5">
          Learn more about our current{" "}
          <span className="text-[#53a53f]">privacy certifications.</span>
        </p>
      </div>

      <div className="my-10 mb-20" id="frauds" ref={frauds}>
        <h2 className="text-4xl mb-5">Fraud Alerts</h2>
        <div>
          The following fraud and scams are not from Walmart. We are listing
          them here in an effort to educate you about these activities. If you
          feel that you have been defrauded, you may want to contact the Federal
          Trade Commission or the Consumer Fraud Division of your state's
          Attorney General's office.
        </div>

        <p className="mt-5">
          Learn more about important{" "}
          <span className="text-[#53a53f]">fraud alerts.</span>
        </p>
      </div>

      <div className="my-10 mb-20" id="identityThefts" ref={identityThefts}>
        <h2 className="text-4xl mb-5">Report Identity Theft</h2>
        <div>
          If you are a victim of identity theft, you may request, at no charge,
          copies of application and business records in our control relating to
          the fraudulent transactions which may have occurred at Walmart or
          Sam's Club, or one of our websites. If you are a victim of identity
          theft, use this page to request copies of records in our control.
        </div>

        <p className="mt-5">
          Learn more about{" "}
          <span className="text-[#53a53f]">reporting identity theft.</span>
        </p>
      </div>

      <div className="my-10 mb-20" id="cyberSecurities" ref={cyberSecurities}>
        <h2 className="text-4xl mb-5">
          Stay Secure Online – Cybersecurity Hygiene
        </h2>
        <div>
          Keeping your private information private is increasingly important as
          our digital world expands. There are steps you can take to protect the
          things you want to stay private – and some of them take but a few
          clicks.
        </div>

        <p className="mt-5">
          Read on for some{" "}
          <span className="text-[#53a53f]">cybersecurity hygiene</span>
          steps to take to keep yourself secure online
        </p>
      </div>

      <div className="my-10 mb-20" id="faqs" ref={faqs}>
        <h2 className="text-4xl mb-5">Privacy & Security FAQs</h2>

        <p className="mt-5">
          View the <span className="text-[#53a53f]">FAQs.</span>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;

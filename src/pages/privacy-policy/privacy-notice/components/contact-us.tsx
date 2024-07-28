import { Link } from "react-router-dom";

const ContactUs = ({
  contact,
}: {
  contact: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div id="contact" ref={contact} className="mt-10 mb-20">
      <h2 className="font-semibold text-[#54a63f] tracking-wider">
        Contact Us
      </h2>

      <p className="mt-1">
        If you have any questions or concerns about our children's privacy
        practices, please contact us{" "}
        <Link
          to={"/contact"}
          target="_black"
          rel="noreferrer noopener"
          className="text-[#54a63f] underline"
        >
          here
        </Link>
        . We are committed to addressing any issues and ensuring the safety and
        privacy of all our users, especially children.
      </p>

      <p className="mt-3">
        By ensuring strict adherence to these policies, we aim to provide a safe
        and enjoyable environment for children to engage in sports and
        recreational activities at D3 Sports Arena while protecting their
        privacy and personal information.
      </p>
    </div>
  );
};

export default ContactUs;

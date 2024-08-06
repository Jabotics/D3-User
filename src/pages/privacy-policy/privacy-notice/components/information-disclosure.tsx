const InformationDisclosure = ({
  disclosure,
}: {
  disclosure: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div id="disclosure" ref={disclosure} className="mb-20">
      <h2 className="font-semibold text-[#54a63f] tracking-wider">
        Disclosure of Your Information
      </h2>

      <p className="mt-2">
        We do not sell, trade, or otherwise transfer your personal information
        to outside parties except as described below:{" "}
      </p>

      <div className="mt-5 flex flex-col mb-3">
        <p>
          <span className="text-[#54a63f]">Service Providers:</span> We may share your information with
          third-party service providers who assist us in operating our website,
          conducting our business, or servicing you, so long as those parties
          agree to keep this information confidential.
        </p>
      </div>
      <div>
        <p>
          <span className="text-[#54a63f]">Legal Requirements:</span> We may disclose your information if
          required to do so by law or in response to valid requests by public
          authorities.
        </p>
      </div>
    </div>
  );
};

export default InformationDisclosure;

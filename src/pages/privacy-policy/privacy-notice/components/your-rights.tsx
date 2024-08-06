const YourRights = ({
  rights,
}: {
  rights: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div id="rights" ref={rights} className="mb-10">
      <h2 className="font-semibold text-[#54a63f] tracking-wider">
        Your Rights
      </h2>

      <p className="mt-2">You have the right to :</p>

      <div className="w-full h-fit flex flex-col mt-5">
        {[
          "Access, update, or delete the personal information we have about you.",
          "Object to or restrict the processing of your personal information.",
          "Withdraw your consent at any time where we rely on your consent to process your personal information.",
        ].map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-row items-center gap-2 w-full"
            >
              <p className="w-5 h-5">{index + 1}.</p>
              <p className="flex-1 h-fit">{item}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-5">
        We use cookies to enhance your experience on our website. Cookies are
        small files that a site or its service provider transfers to your
        computer&apos;s hard drive through your web browser (if you allow) that
        enables the site&apos;s or service provider&apos;s systems to recognize your
        browser and capture and remember certain information. You can choose to
        disable cookies through your individual browser options.
      </p>
    </div>
  );
};

export default YourRights;

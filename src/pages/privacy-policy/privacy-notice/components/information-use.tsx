const InformationUse = ({
  information,
}: {
  information: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <section id="information" ref={information} className="mt-20 mb-12">
      <h2 className="font-semibold text-[#54a63f] tracking-wider">
        How we Use your Information
      </h2>

      <p className="mt-2">We use the information we collect in the following ways :</p>

      <div className="w-full h-fit flex flex-col mt-5">
        {[
          "To process and confirm your bookings.",
          "To communicate with you regarding your bookings and provide customer support.",
          "To improve our website and services.",
          "To send you promotional materials, newsletters, and other information related to our services (you can opt out at any time).",
          "To comply with legal obligations.",
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
    </section>
  );
};

export default InformationUse;

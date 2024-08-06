const InformationCollect = ({
  collection,
}: {
  collection: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <section
      className="my-10"
      id="informationCollection"
      ref={collection}
    >
      <h2 className="font-semibold text-[#54a63f] tracking-wider">
        Information We Collect
      </h2>
      <div className="flex flex-col">
        {[
          {
            title: "Personal Information",
            description: "We may collect the following personal information",
            points: [
              "Name",
              "Contact details (email, phone number)",
              "Payment information (processed through our payment provider)",
              "Demographic details (age, gender)",
            ],
          },
        ].map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex flex-row w-full h-fit gap-1 mt-5">
                {/* <div className="w-5 h-5">{index + 1}.</div> */}
                <div className="flex-1 h-fit text-[#54a63f]">{item.title}</div>
              </div>
              <p className="text-gray-700 mt-2 ml-[1px]">{item.description}</p>
              <div className="flex flex-col ml-5 mt-2">
                {item.points.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-row gap-3 font-medium">
                      <p>{index + 1}.</p>
                      <div>{item}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col">
        {[
          {
            title: "To Process and Confirm Your Bookings",
            description:
              "We use your personal information to facilitate the booking process. This includes confirming your reservation, sending you booking details and receipts, and ensuring that your booking preferences are met.",
          },
          {
            title:
              "To Communicate with You Regarding Your Bookings and Provide Customer Support",
            description:
              " We may contact you via email, phone, or SMS to provide updates on your booking status, answer any questions you may have, address any issues, and offer customer support. This communication is essential to ensure a smooth and satisfactory booking experience.",
          },
          {
            title: "To Improve Our Website and Services",
            description:
              "We analyze the data collected to understand user behavior and preferences. This helps us enhance our website’s functionality, optimize our services, and provide a more personalized experience for you. Feedback and usage patterns are invaluable for continuous improvement.",
          },
          {
            title:
              "To Send You Promotional Materials, Newsletters, and Other Information Related to Our Services",
            description:
              "With your consent, we may use your contact information to send you promotional offers, newsletters, and updates about our services and events. These communications are intended to keep you informed about exciting opportunities and promotions. You can opt out of receiving these communications at any time by following the unsubscribe instructions included in the emails or contacting us directly.",
          },
          {
            title: "To Comply with Legal Obligations",
            description:
              "We may use and disclose your information as necessary to comply with applicable laws, regulations, legal processes, or governmental requests. This includes responding to lawful requests by public authorities, such as complying with national security or law enforcement requirements.",
          },
        ].map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex flex-row w-full h-fit gap-1 mt-5">
                {/* <div className="w-5 h-5">{index + 1}.</div> */}
                <div className="flex-1 h-fit text-[#54a63f]">{item.title}</div>
              </div>
              <p className="text-gray-700 mt-2 ml-[1px]">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InformationCollect;

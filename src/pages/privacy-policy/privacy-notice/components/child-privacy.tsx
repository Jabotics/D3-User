const PrivacyOfChildren = ({
  childPrivacy,
}: {
  childPrivacy: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div id="childPrivacy" ref={childPrivacy} className="my-5">
      <h2 className="font-semibold text-[#54a63f] tracking-wider">
        Privacy Of Children
      </h2>

      <p className="mt-5">
        We do not share, sell, or disclose any personal information of children
        under the age of 13 to third parties except in the following
        circumstances:
      </p>

      <div className="flex flex-col">
        {[
          {
            title: "Parental Rights",
            description: "Parents and guardians have the right to :",
          },
        ].map((item, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex flex-row w-full h-fit gap-1 mt-3">
                {/* <div className="w-5 h-5">{index + 1}.</div> */}
                <div className="flex-1 h-fit text-[#54a63f]">{item.title}</div>
              </div>
              <p className="text-gray-700 mt-2 ml-[1px]">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="my-3 flex flex-col ">
        <p>
          <span className="text-[#54a63f]">Review Information:</span> Request
          access to and review the personal information we have collected from
          their child.
        </p>
      </div>
      <div>
        <p>
          <span className="text-[#54a63f]">Revoke Consent:</span> Withdraw their
          consent to the collection, use, or disclosure of their child's
          personal information at any time. Upon revocation, we will delete the
          child's personal information from our records.
        </p>
      </div>
      <div className="mt-3">
        <p>
          <span className="text-[#54a63f]">Request Deletion:</span> Request the
          deletion of their child's personal information from our records
        </p>
      </div>
    </div>
  );
};

export default PrivacyOfChildren;

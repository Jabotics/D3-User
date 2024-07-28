const DataSecurity = ({
  security,
}: {
  security: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div id="security" ref={security} className="my-20">
      <h2 className="font-semibold text-[#54a63f] tracking-wider">
        Data Security
      </h2>

      <p className="mt-2">
        At D3 Sports Arena, safeguarding your personal information is one of our
        top priorities. We implement a variety of security measures to ensure
        the confidentiality, integrity, and availability of your data.
      </p>

      <div className="flex flex-col">
        {[
          {
            title: "Encryption and Secure Transactions",
            description:
              "Your payment information is encrypted using Secure Socket Layer (SSL) technology. SSL encryption ensures that the data transmitted between your browser and our servers is secure and cannot be intercepted by unauthorized parties. This technology is widely recognized as a standard for online transactions, providing a secure environment for processing payments.",
          },
          {
            title: "Access Controls",
            description:
              "We employ strict access controls to ensure that your personal information is only accessible to authorized personnel. Our employees are trained on the importance of privacy and the security measures we have in place. Access to sensitive information is granted based on the principle of least privilege, ensuring that individuals only have access to the data necessary for their role.",
          },
          {
            title: "Data Storage and Encryption",
            description:
              "Your personal information is stored on secure servers that are protected by firewalls and other advanced security technologies. We use encryption to protect sensitive data both in transit and at rest. This means that your data is encrypted when it is being sent over the internet and when it is stored on our servers, reducing the risk of unauthorized access.",
          },
          {
            title: "Incident Response and Monitoring",
            description:
              "We have a comprehensive incident response plan in place to address any potential security breaches. Our monitoring systems continuously track activity on our network and systems to detect and respond to any suspicious behavior. In the event of a security incident, our team is trained to take immediate action to mitigate the impact and protect your data.",
          },
          {
            title: "User Responsibilities",
            description:
              "While we take extensive measures to protect your information, it is also important for you to play a role in safeguarding your data. We recommend that you use strong, unique passwords for your accounts and avoid sharing your login information with others. Be cautious of phishing attempts and ensure that you are accessing our website through secure and trusted devices.",
          },
          {
            title: "No Absolute Security",
            description:
              "Despite our best efforts, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. However, we are committed to doing everything within our power to protect your data and maintain your trust.",
          },
          {
            title: "Continuous Improvement",
            description:
              "Data security is an ongoing process. We continuously review and enhance our security measures to adapt to new threats and technological advancements. Our commitment to data security is reflected in our dedication to providing a safe and secure environment for our users.",
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

      <p className="mt-5">
        By choosing D3 Sports Arena, you can be confident that we are committed
        to protecting your personal information and ensuring that your
        experience with us is safe and secure.
      </p>
    </div>
  );
};

export default DataSecurity;

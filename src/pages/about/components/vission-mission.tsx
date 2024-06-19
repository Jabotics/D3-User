const VissionMission = () => {
  return (
    <div className="my-6">
      <h1 className="text-2xl font-medium">Our Vision and Mission</h1>
      <div className="w-full flex items-start my-3">
        <div className="w-8">1.</div>
        <div className="flex-1 flex-col">
          <h3 className="text-lg tracking-wide font-medium">Vision</h3>
          <p className="text-sm">
            Our vision is to be a leading sports complex that fosters athletic
            excellence, community engagement, and personal growth. We aim to
            inspire and support individuals to achieve their fullest potential,
            both on and off the field.
          </p>
        </div>
      </div>
      <div className="w-full flex items-start my-3">
        <div className="w-8">2.</div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg tracking-wide font-medium mb-4">Mission</h3>
          <span className="text-sm">
            <span className="font-semibold">
              1. To provide world-class sports facilities:{" "}
            </span>
            <span className="ml-2">
              We offer top-notch infrastructure and amenities for a wide range
              of sports, ensuring that athletes have the best environment to
              train and compete.
            </span>
          </span>
          <span className="text-sm">
            <span className="font-semibold">
              2. To nurture talent and promote sportsmanship:{" "}
            </span>
            <span className="ml-2">
              We are dedicated to developing talent at all levels through
              professional coaching, training programs, and competitions.
            </span>
          </span>
          <span className="text-sm">
            <span className="font-semibold">
              3. To create a vibrant community hub:{" "}
            </span>
            <span className="ml-2">
              We foster a welcoming and inclusive atmosphere where sports
              enthusiasts, families, and community members can connect, engage,
              and thrive.
            </span>
          </span>
          <span className="text-sm">
            <span className="font-semibold">
              4. To advocate for health and wellness:{" "}
            </span>
            <span className="ml-2">
              We promote a holistic approach to fitness and well-being,
              encouraging healthy lifestyles through various sports and
              recreational activities.
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VissionMission;

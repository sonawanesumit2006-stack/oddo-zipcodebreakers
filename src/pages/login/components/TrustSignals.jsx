import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
  {
    icon: 'Shield',
    title: 'SSL Secured',
    description: 'Bank-level encryption'
  },
  {
    icon: 'Lock',
    title: 'Data Protected',
    description: 'GDPR compliant'
  },
  {
    icon: 'CheckCircle',
    title: 'Verified Platform',
    description: 'Trusted by 50K+ travelers'
  }];


  const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Frequent Traveler',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18811c304-1763296452128.png",
    avatarAlt: 'Professional woman with blonde hair in business attire smiling at camera',
    rating: 5,
    comment: 'GlobeTrotter transformed how I plan my trips. The budget tracking feature alone saved me hundreds on my last European adventure!'
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Digital Nomad',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_122c30919-1763293878826.png",
    avatarAlt: 'Asian man with glasses and casual shirt smiling outdoors',
    rating: 5,
    comment: 'As someone who travels constantly, having all my itineraries in one place with real-time budget updates is invaluable. Highly recommended!'
  }];


  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {securityFeatures?.map((feature, index) =>
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 md:p-5 lg:p-6 bg-card rounded-lg border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">

            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
              <Icon name={feature?.icon} size={24} color="var(--color-primary)" />
            </div>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-2">
              {feature?.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        )}
      </div>
      <div className="space-y-4 md:space-y-5 lg:space-y-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground text-center">
          Trusted by Travelers Worldwide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {testimonials?.map((testimonial) =>
          <div
            key={testimonial?.id}
            className="p-4 md:p-5 lg:p-6 bg-card rounded-lg border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">

              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <img
                src={testimonial?.avatar}
                alt={testimonial?.avatarAlt}
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover" />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-semibold text-foreground truncate">
                    {testimonial?.name}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    {testimonial?.role}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial?.rating)]?.map((_, i) =>
                <Icon key={i} name="Star" size={16} color="var(--color-accent)" fill="var(--color-accent)" />
                )}
                </div>
              </div>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                "{testimonial?.comment}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default TrustSignals;
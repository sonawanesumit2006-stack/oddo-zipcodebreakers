import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingDestinationCard = ({ destination }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer group h-64 hover:scale-105 duration-300 animate-fade-in border border-border/30 hover:border-border/60">
        <div className="relative h-full">
          <Image
            src={destination?.image}
            alt={destination?.imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <button
            onClick={(e) => {
              e?.stopPropagation();
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-card/80 rounded-full flex items-center justify-center hover:brightness-105 transition-all"
            aria-label="Add to favorites"
          >
            <Icon name="Heart" size={16} className="text-muted-foreground" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white mb-1">{destination?.name}</h3>

            <button
              onClick={(e) => {
                e?.stopPropagation();
                setIsOpen(true);
              }}
              className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              Explore Guide
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative bg-card rounded-2xl shadow-xl w-full max-w-3xl p-6 transform transition-all">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-48 md:h-full rounded-lg overflow-hidden">
                <img src={destination?.image} alt={destination?.imageAlt} className="w-full h-full object-cover" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{destination?.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{destination?.description}</p>

                {destination?.highlights?.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Highlights</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-sm text-foreground">
                      {destination.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </>
                )}

                {destination?.whyVisit && (
                  <>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Why Visit</h3>
                    <p className="text-sm text-foreground mb-4">{destination.whyVisit}</p>
                  </>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <Button variant="default" size="sm" onClick={() => { window.alert('Open in planner - not implemented yet'); }}>
                    Open in Planner
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingDestinationCard;
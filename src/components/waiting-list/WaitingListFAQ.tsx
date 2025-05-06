
import React from 'react';

const WaitingListFAQ = () => {
  return (
    <section className="py-16 px-4 bg-story-peach/30">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-story-purple">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card-kiddy">
            <h3 className="text-xl font-bold mb-2">When will NightKnight launch?</h3>
            <p>We're working hard to launch in the next 30 days. Join our waiting list to be notified!</p>
          </div>
          <div className="card-kiddy">
            <h3 className="text-xl font-bold mb-2">How much will it cost?</h3>
            <p>We'll offer both free and premium plans. Early subscribers may receive special pricing.</p>
          </div>
          <div className="card-kiddy">
            <h3 className="text-xl font-bold mb-2">What ages is it suitable for?</h3>
            <p>NightKnight is designed for children aged 3-10, but can be enjoyed by the whole family!</p>
          </div>
          <div className="card-kiddy">
            <h3 className="text-xl font-bold mb-2">What languages are supported?</h3>
            <p>At launch, we'll support English, French, Spanish and German, with more languages coming soon.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingListFAQ;

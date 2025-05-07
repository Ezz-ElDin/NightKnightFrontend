
import React from 'react';
import { useTranslation } from 'react-i18next';

const WaitingListFAQ = () => {
  const { t } = useTranslation('common');
  
  return (
    <section className="py-16 px-4 bg-story-peach/30">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-story-purple">{t('waitingList.faq.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card-kiddy">
            <h3 className="text-xl font-bold mb-2">{t('waitingList.faq.questions.launch.question')}</h3>
            <p>{t('waitingList.faq.questions.launch.answer')}</p>
          </div>
          <div className="card-kiddy">
            <h3 className="text-xl font-bold mb-2">{t('waitingList.faq.questions.cost.question')}</h3>
            <p>{t('waitingList.faq.questions.cost.answer')}</p>
          </div>
          <div className="card-kiddy">
            <h3 className="text-xl font-bold mb-2">{t('waitingList.faq.questions.ages.question')}</h3>
            <p>{t('waitingList.faq.questions.ages.answer')}</p>
          </div>
          <div className="card-kiddy">
            <h3 className="text-xl font-bold mb-2">{t('waitingList.faq.questions.languages.question')}</h3>
            <p>{t('waitingList.faq.questions.languages.answer')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingListFAQ;

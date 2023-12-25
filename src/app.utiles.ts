import { ButtonsData, ButtonsText } from './const/buttons.enum';
import { MessagesEnum } from "./const/messages.enum";

export const createAgeButtons = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: ButtonsText.Yes, callback_data: ButtonsData.AgeYes },
          { text: ButtonsText.No, callback_data: ButtonsData.AgeNo },
        ],
      ],
    },
  };
};

export const createReviewButtons = () => {
  return {
    caption: MessagesEnum.GetReviewText,
    reply_markup: {
      inline_keyboard: [
        [
          { text: ButtonsText.ReviewToOwner, callback_data: ButtonsData.ReviewToOwner },
        ],
        [
          { text: ButtonsText.ReviewToBot, callback_data: ButtonsData.ReviewToBot },
        ]
      ],
    },
  };
}

export const createAboutButtons = () => {
  return {
    caption: MessagesEnum.GetAboutText,
    reply_markup: {
      inline_keyboard: [
        [
          { text: ButtonsText.AboutPhilosophy, callback_data: ButtonsData.AboutPhilosophy },
        ],
        [
          { text: ButtonsText.AboutCreators, callback_data: ButtonsData.AboutCreators },
        ],
        [
          { text: ButtonsText.AboutProduct, callback_data: ButtonsData.AboutProduct },
        ]
      ],
    },
  };
}

export const createBecomePartnerButtons = () => {
  return {
    caption: MessagesEnum.GetBecomePartnerText,
    reply_markup: {
      inline_keyboard: [
        [
          { text: ButtonsText.BecomePartnerToManager, callback_data: ButtonsData.BecomePartnerToManager },
        ],
        [
          { text: ButtonsText.BecomePartnerToBot, callback_data: ButtonsData.BecomePartnerToBot },
        ],
      ],
    },
  };
}

export const getWelcomeMessage = (name) => `Привет, ${name}. Добро пожаловать. Выбери интересующий тебя раздел.`;

export const getUpdateCityMessage = (name) => `Привет, ${name}. Спасибо за интерес к табаку для кальяна "Молодость". Перед тобой разделы нашего телеграммной-бота. Выбери интересующий тебя раздел.`;

export const createName = (name) => name.replace(/\s/g, '').toLowerCase().replace(/^(.)/, (match, group1) => group1.toUpperCase())

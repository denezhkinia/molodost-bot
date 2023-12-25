import { Markup } from 'telegraf';
import { ButtonsData, ButtonsText } from "./const/buttons.enum";

export const  menuButtons = () => Markup.keyboard(
    [
      Markup.button.callback(ButtonsText.BecomePartner, ButtonsData.BecomePartner),
      Markup.button.callback(ButtonsText.Review, ButtonsData.Review),
      Markup.button.callback(ButtonsText.About, ButtonsData.About),
      Markup.button.callback(ButtonsText.Taste, ButtonsData.Taste),
      Markup.button.callback(ButtonsText.SocialNetwork, ButtonsData.SocialNetwork),
      Markup.button.callback(ButtonsText.WhereBuy, ButtonsData.WhereBuy),
    ],
    { columns: 2 },
  );
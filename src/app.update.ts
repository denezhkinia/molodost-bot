import { Action, Hears, InjectBot, On, Start, Update } from "nestjs-telegraf";
import { Telegraf } from "telegraf";
import { Context } from "./const/context.interface";
import { UserService } from "./services/user.service";
import {
  createAboutButtons,
  createAgeButtons,
  createName,
  createReviewButtons,
  getUpdateCityMessage,
  getWelcomeMessage
} from "./app.utiles";
import { ButtonsData, ButtonsText } from "./const/buttons.enum";
import { MessagesEnum } from "./const/messages.enum";
import { SessionTypes } from "./const/session-type.enum";
import { CityService } from "./services/city.service";
import { menuButtons } from "./app.buttons";
import { isLogLevelEnabled } from "@nestjs/common/services/utils";
import { LockNotSupportedOnGivenDriverError } from "typeorm";
import * as fs from "fs";

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    try {
      ctx.session.userId = ctx.message.chat.id;
      const user = await this.userService.getUserByTelegramIdWithCity(
        ctx.session.userId,
      );

      if (!user) {
        await ctx.replyWithHTML(MessagesEnum.AgeQuestion, createAgeButtons());
        return;
      }

      if (!user?.isAdult) {
        await ctx.replyWithHTML(MessagesEnum.AgeLessThanEighteen);
        return;
      }

      if (!user?.name) {
        await ctx.reply(MessagesEnum.GetName);
        ctx.session.type = SessionTypes.GetName;
        return;
      }
      
      if (!user?.city) {
        await ctx.reply(MessagesEnum.GetCity);
        ctx.session.type = SessionTypes.GetCity;
        return;
      }
      await ctx.reply(getWelcomeMessage(user.name), menuButtons());
      await ctx.telegram.setMyCommands([
        { command: 'start', description: 'Start command'},
        {
          command: "effect",
          description: "Apply text effects on the text. (usage: /effect [text])",
        }]);
      ctx.session.type = null;
    } catch (e) {
      console.log('error', e);
    }
  }

  @Action(ButtonsData.AgeYes)
  async ageMoreThanEighteen(ctx: Context) {
    try {
      await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
      await this.userService.addUser(ctx.session.userId, true);
      await ctx.deleteMessage();
      await ctx.reply(MessagesEnum.GetName);
      ctx.session.type = SessionTypes.GetName;
    } catch (e) {
      console.log('error', e);
    }
  }

  @Action(ButtonsData.AgeNo)
  async ageLessThanEighteen(ctx: Context) {
    try {
      await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
      await this.userService.addUser(ctx.session.userId, false);
      await ctx.deleteMessage();
      await ctx.replyWithHTML(MessagesEnum.AgeLessThanEighteen);
    } catch (e) {
      console.log('error', e);
    }
  }

  @Action(ButtonsData.ReviewToOwner)
  async reviewToOwner(ctx: Context) {
    try {
      await ctx.replyWithHTML(MessagesEnum.GetReviewForOwner);
    } catch (e) {
      console.log('error', e);
    }
  }

  @Action(ButtonsData.ReviewToBot)
  async reviewToBot(ctx: Context) {
    try {
      await ctx.replyWithHTML(MessagesEnum.GetReviewText, createReviewButtons());
      ctx.session.type = SessionTypes.GetReviewToBot;
    } catch (e) {
      console.log('error', e);
    }
  }

  @Action(ButtonsData.BecomePartnerToManager)
  async becomePartnerToManager(ctx: Context) {
    try {
      await ctx.replyWithHTML(MessagesEnum.GetBecomePartnerText);
    } catch (e) {
      console.log('error', e);
    }
  }

  @Action(ButtonsData.AboutPhilosophy)
  async aboutPhilosophy(ctx: Context) {
    try {
      await ctx.replyWithPhoto({source: fs.createReadStream('./src/assets/img/philosophy.webp')}, {caption: MessagesEnum.GetAboutPhilosophy});
    } catch (e) {
      console.log('error', e);
    }
  }

  @Action(ButtonsData.AboutCreators)
  async aboutCreators(ctx: Context) {
    try {
      await ctx.replyWithPhoto({source: fs.createReadStream('./src/assets/img/creators.webp')}, {caption: MessagesEnum.GetAboutCreators});
    } catch (e) {
      console.log('error', e);
    }
  }

  @Action(ButtonsData.AboutProduct)
  async aboutProduct(ctx: Context) {
    try {
      await ctx.replyWithPhoto({source: fs.createReadStream('./src/assets/img/about.webp')}, {caption: MessagesEnum.GetAboutProduct});
    } catch (e) {
      console.log('error', e);
    }
  }

  @Hears(ButtonsText.Review)
  async review(ctx: Context) {
    try {
      await ctx.replyWithPhoto({source: fs.createReadStream('./src/assets/img/menuReview.webp') }, createReviewButtons());
    } catch (e) {
      console.log('error', e);
    }
  }

  @Hears(ButtonsText.About)
  async about(ctx: Context) {
    try {
      await ctx.replyWithPhoto({source: fs.createReadStream('./src/assets/img/menuAbout.webp') }, createAboutButtons());
    } catch (e) {
      console.log('error', e);
    }
  }


  @On('text')
  async onInputText(ctx: Context) {
    try {
      if (ctx.session.type === SessionTypes.GetName) {
        if(!ctx.message?.['text']) {
          return;
        }
        const goodName = createName(ctx.message?.['text']);
        this.userService.updateUserName(ctx?.message?.chat?.id, goodName);
        await ctx.deleteMessage();
        await ctx.deleteMessage(ctx?.message?.message_id - 1);
        await ctx.reply(MessagesEnum.GetCity);
        ctx.session.priviousValue = ctx.message?.['text'];
        ctx.session.type = SessionTypes.GetCity;
      }
      if (ctx.session.type === SessionTypes.GetCity) {
        if(!ctx.message?.['text'] || ctx.message?.['text'] === ctx.session.priviousValue) {
          return;
        }
        const goodCity = createName(ctx.message?.['text']);
        const city = await this.cityService.getCityByName(goodCity);
        if(!city) {
          await ctx.deleteMessage();
          await ctx.reply(MessagesEnum.GetNoSameCity);
          return;
        } else {
          ctx.session.type = null;
          const userId = ctx?.message?.chat?.id;
          await this.userService.updateUserCity(userId, city);
          await ctx.deleteMessage();
          await ctx.deleteMessage(ctx?.message?.message_id - 1);
          const user = await this.userService.getUserByTelegramId(userId);
          ctx.session.type = null;
          await ctx.reply(getUpdateCityMessage(user.name), menuButtons());
        }
      }
      if(ctx.session.type === SessionTypes.GetReviewToBot) {
        if(!ctx.message?.['text'] || ctx.message?.['text'] === ctx.session.priviousValue) {
          return;
        }

        await ctx.replyWithHTML(MessagesEnum.GetReviewText, createReviewButtons());
        ctx.session.type = SessionTypes.GetReviewToBot;
      }
    } catch (e) {
      console.log('error', e);
    }
  }
}

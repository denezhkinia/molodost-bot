import { Context as ContextTelegraf } from 'telegraf';
import { SessionTypes } from "./session-type.enum";

export interface Context extends ContextTelegraf {
  session: {
    userId?: number;
    type?: SessionTypes;
    step?: number;
    priviousValue?: string;
  };
}

import 'i18next';
import {resources} from "@/locales"

declare module "i18next" {
    interface CustomTypeOptions {

      resources: typeof resources['en'];
      // other
    }
  }

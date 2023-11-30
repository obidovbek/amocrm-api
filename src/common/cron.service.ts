import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ICronService } from "./cron.sevice.interface";
import { AmocrmOauth2Service } from "../amocrm/amocrm-oauth2.service";
const cron = require('node-cron');

@injectable()
export class CronService implements ICronService{

    constructor(@inject(TYPES.AmocrmOauth2Service) private amocrmOauth2Service:AmocrmOauth2Service){}

    amocrmOauth2UpdateAccessToken(){
        cron.schedule('0 */20 * * *', () => {
            this.amocrmOauth2Service.updateAccessToken();
        });
    }
}
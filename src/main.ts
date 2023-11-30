import { Container, ContainerModule, interfaces } from "inversify";
import { AmocrmOauth2Service } from "./amocrm/amocrm-oauth2.service";
import { AmocrmController } from "./amocrm/amocrm.controller";
import { AmocrmService } from "./amocrm/amocrm.service";
import { IAmocrmOauth2Service } from "./amocrm/interfaces/amocrm-oauth2.service.interface";
import { IAmocrmController } from "./amocrm/interfaces/amocrm.controller.interface";
import { IAmocrmService } from "./amocrm/interfaces/amocrm.service.interface";
import { App } from "./app";
import { CronService } from "./common/cron.service";
import { ICronService } from "./common/cron.sevice.interface";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import { ExeptionFilter } from "./errors/exception.filter";
import { IExeptionFilter } from "./errors/exception.filter.interface";
import { TYPES } from "./types";

export interface IBootstrapReturn{
    appContainer: Container,
    app:App
}
const appBindings = new ContainerModule((bind:interfaces.Bind)=>{
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter),
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope(),
    bind<IAmocrmController>(TYPES.AmocrmController).to(AmocrmController),
    bind<IAmocrmService>(TYPES.AmocrmService).to(AmocrmService),
    bind<IAmocrmOauth2Service>(TYPES.AmocrmOauth2Service).to(AmocrmOauth2Service),
    bind<ICronService>(TYPES.CronService).to(CronService),
    bind<App>(TYPES.Application).to(App)
})
async function bootstrap(): Promise<IBootstrapReturn>{
    const appContainer = new Container();
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application);
    await app.init();
    return {appContainer, app};
}

export const boot = bootstrap();
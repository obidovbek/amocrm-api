import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { IAmocrmOauth2Service } from "./interfaces/amocrm-oauth2.service.interface";
import path from 'path';
import fs from 'fs';
import { TYPES } from "../types";
import { ConfigService } from "../config/config.service";
import axios from "axios";

@injectable()
export class AmocrmOauth2Service implements IAmocrmOauth2Service{
    private httpOptions = {
        headers: {
            "Authorization": `Bearer ${this.accessToken}`,
            "Content-type": "Application/json"
        }
    }
    constructor(@inject(TYPES.ConfigService) private configService:ConfigService){
    }
    async updateAccessToken(){
        const body = 
            {
                "client_id": this.configService.get('CLIENT_ID'),
                "client_secret": this.configService.get('CLIENT_SECRET'),
                "grant_type": "refresh_token",
                "refresh_token": this.refreshToken,
                "redirect_uri": "https://da38-213-230-99-94.ngrok-free.app"
            }
        const accessToken = await axios.post(this.configService.get('OAUTH2_URL'),body);
        this.accessToken = accessToken.data.access_token;
        this.refreshToken = accessToken.data.refresh_token;
    }


    get refreshToken(){
        const folder = path.join(__dirname, '..', '..', 'tokens', 'refresh_token.txt');
        const refreshToken = fs.readFileSync(folder, 'utf-8');
        return refreshToken;
    }
    get accessToken(){
        const folder = path.join(__dirname, '..', '..', 'tokens', 'access_token.txt');
        const refreshToken = fs.readFileSync(folder, 'utf-8');
        return refreshToken;
    }
    set accessToken(token:string){
        const folder = path.join(__dirname, '..', '..', 'tokens', 'access_token.txt');
        fs.writeFileSync(folder, token, 'utf-8');
    }
    set refreshToken(token:string){
        const folder = path.join(__dirname, '..', '..', 'tokens', 'refresh_token.txt');
        fs.writeFileSync(folder, token, 'utf-8');
    }
}
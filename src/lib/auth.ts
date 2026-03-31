import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";
import { admin as adminPlugin, oAuthProxy, phoneNumber } from "better-auth/plugins";
import twilio from "twilio";
import { ac, delivery, user, admin } from "#config/better-auth/permissions.js";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);


export const auth = betterAuth({
    database: new Pool({
        host: "ep-snowy-cherry-ad7zadbl-pooler.c-2.us-east-1.aws.neon.tech",
        port: 5432,
        user: "neondb_owner",
        password: "npg_lxoRV2kEZ8Ua",
        database: "neondb",
        ssl: true,
    }),
    plugins:[
        expo(),
        phoneNumber({  
            sendOTP: ({ phoneNumber, code }, ctx) => { 
                console.log(phoneNumber, code);
                client.messages.create({
                        from: 'whatsapp:+14155238886',
                        contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
                        contentVariables: `{"1":"${code}"}`,
                        to: `whatsapp:${phoneNumber}`
                    })
                    .then((message: any) => console.log(message.sid))
                    .catch((error: any) => console.log(error));
            } 
        }) ,
        adminPlugin({
            defaultRole:"user",
            ac,
            roles:{
                admin,
                delivery,
                user,
            }
        }),
        oAuthProxy({
            productionURL:"https://smooth-muskox-luckily.ngrok-free.app",
        })
    ],
    emailAndPassword:{
        enabled:true,
    },
    // advanced: {
    //     disableOriginCheck: true
    // },
    trustedOrigins:["cavaallende:///","exp://192.168.0.238:8081", "cavaallende://"],
    baseURL:"https://smooth-muskox-luckily.ngrok-free.app",
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            prompt:"select_account",
            redirectURI:"https://smooth-muskox-luckily.ngrok-free.app/api/auth/callback/google",
        },
        // apple:{
            
        // }
    }
})
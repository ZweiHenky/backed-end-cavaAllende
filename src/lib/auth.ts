import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";
import { admin as adminPlugin, oAuthProxy, phoneNumber } from "better-auth/plugins";
import twilio from "twilio";
import { generateAppleClientSecret } from "#config/better-auth/generateAppleClientSecret.js";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

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
    user:{
        additionalFields:{
            role:{
                type:["user","delivery","admin"],
                default:"user",
                required:false,
                input:false,
            }
        }
    },
    plugins:[
        expo(),
        phoneNumber({  
            sendOTP: ({ phoneNumber, code }, ctx) => { 
                console.log(phoneNumber, code);
                client.messages
                    .create({
                        to: phoneNumber,
                        messagingServiceSid: 'MGa17af1c0e3cfa8fa08347e05dc89ac29',
                        body: `El código para acceder a Cava Allende es: ${code}`,
                    })
                    .then((message: any) => console.log(message.sid))
                    .catch((error: any) => console.log(error));
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
    trustedOrigins:["cavaallende:///","exp://192.168.0.238:8081", "cavaallende://", "https://appleid.apple.com"],
    baseURL:"https://smooth-muskox-luckily.ngrok-free.app",
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            prompt:"select_account",
            redirectURI:"https://smooth-muskox-luckily.ngrok-free.app/api/auth/callback/google",
        },
         apple: { 
            clientId: process.env.APPLE_CLIENT_ID as string, 
            clientSecret: await generateAppleClientSecret(
                process.env.APPLE_CLIENT_ID!, 
                process.env.APPLE_TEAM_ID!, 
                process.env.APPLE_KEY_ID!, 
                process.env.APPLE_PRIVATE_KEY!, 
            ), 
            appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER as string, 
        }, 
    }
})
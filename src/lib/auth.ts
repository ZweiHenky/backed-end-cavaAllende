import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";
import { admin, oAuthProxy, phoneNumber } from "better-auth/plugins";

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);

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
        phoneNumber(),
        admin({
            defaultRole:"user",
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
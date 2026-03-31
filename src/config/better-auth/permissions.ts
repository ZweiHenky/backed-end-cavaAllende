import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statement = {
    project: ["create", "share", "update", "delete"], // <-- Permissions available for created roles
    ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({ 
    project: ["create", "update"], 
}); 

export const admin = ac.newRole({ 
    project: ["create", "update", "delete", "share"], 
    ...adminAc.statements,
}); 

export const delivery = ac.newRole({ 
    project: ["update"]
}); 
import { User } from "../interfaces/user.js";

export class UserEntity implements User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailVerified: boolean,
        public image: string | null,
        public createdAt: string,
        public updatedAt: string,
        public role: string | null,
        public phoneNumber: string | null,
        public phoneNumberVerified: boolean | null,
        public banned: boolean | null,
        public banReason: string | null,
        public banExpires: string | Date | null,
    ) {}
    
    static fromObject(object: { [key: string]: any }): UserEntity {
        return new UserEntity(
            object.id,
            object.name,
            object.email,
            object.emailVerified,
            object.image,
            object.createdAt,
            object.updatedAt,
            object.role,
            object.phoneNumber,
            object.phoneNumberVerified,
            object.banned,
            object.banReason,
            object.banExpires,
        );
    }
    
    toObject(): { [key: string]: any } {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            emailVerified: this.emailVerified,
            image: this.image,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            role: this.role,
            phoneNumber: this.phoneNumber,
            phoneNumberVerified: this.phoneNumberVerified,
            banned: this.banned,
            banReason: this.banReason,
            banExpires: this.banExpires,
        };
    }
}
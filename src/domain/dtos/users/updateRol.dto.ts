export class UpdateRolDto {
    constructor(
        public role: string,
    ) {}

    static create(data: { [key: string]: any }): [UpdateRolDto | null, Error | null] {
        const { role } = data;

        if (!role) {
            return [null, new Error("Role is required")];
        }

        return [new UpdateRolDto(role), null];
    }
}

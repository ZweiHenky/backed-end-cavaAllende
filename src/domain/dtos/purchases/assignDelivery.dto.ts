interface AssignDeliveryDtoInterface {
    delivery_id: string;
    id: number;
}

export class AssignDeliveryDto {
    constructor(public delivery_id: string, public id: number) {}

    static create(body: AssignDeliveryDtoInterface): [AssignDeliveryDto | null, Error | null] {
        const { delivery_id, id } = body;

        if (!delivery_id) {
            return [null, new Error("delivery_id is required")];
        }

        if (!id) {
            return [null, new Error("id is required")];
        }

        return [new AssignDeliveryDto(delivery_id, id), null];
    }
}

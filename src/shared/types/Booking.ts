export type TBooking = {
    id: number
    date_from: Date
    date_to: Date
    created_at: Date
    updated_at: Date
    status: "CREATED" | "COMPLETE"
    user_id: number,
    equipment_id: number
    equipments: {
        id: number
        area_id: number
        name: string
        description: string
        count: number
        status: "FREE" | "BOOKED"
    }
    users: {
        id: 16,
        roles: {
            id: number,
            role: "USER" | "ADMIN" | "OWNER"
        }
        first_name: string
        second_name: string
        mail: string

    }
}
export type EquipmentCardModel = {
    id: number
    name: string
    count: number
    img_hrefs: string[] | undefined
    actions: {
        edit: (id: number) => void
        delete: (id: number) => void
        confirmDelete: (cbDeleteCard: any) => void
    }
}
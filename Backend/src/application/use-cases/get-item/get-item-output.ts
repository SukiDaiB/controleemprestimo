type ItemTypeOutput = {
    id: string;
    name: string;
}
export type GetItemOutput = {
    id: string;
    name: string;
    itemType: ItemTypeOutput;
}
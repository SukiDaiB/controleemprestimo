type ItemTypeOutput = {
    id: string;
    name: string;
}
export type GetItensOutput = {
    id: string;
    name: string;
    itemType: ItemTypeOutput;
}
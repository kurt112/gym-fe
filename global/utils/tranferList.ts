export interface Transferlist {
    leftTitle: string,
    leftData: DataTransferList [],
    leftPlaceHolder: string | null,
    rightTitle: string,
    rightData: DataTransferList [],
    rightPlaceHolder: string | null,
}

export interface DataTransferList {
    id: number,
    displayData: string | number
}
export interface TABLEPROPS {
    data?: any,
    handleEditAction?(row: any): void;
    handleChangeStatus?(row: any): void;
    handleDeleteAction?(row: any): void;
    column?: any;
    isStatus?: boolean;
    isDelete?: boolean;
    isUpdate?: boolean;
}
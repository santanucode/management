
export interface BankReportInitStateDTO {
    error_getBankReport: string | boolean | undefined;
    loading_getBankReport: boolean;
    success_getBankReport: boolean;
    bankReportList?: any;
}
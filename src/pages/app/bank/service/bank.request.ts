import { axios } from "api/setup.intersepter";
import { BANKSDT, BankStatusChangeDTO, UpdateBankDTO } from "./types";

export const getAllBanks = () => {
  return axios({
    method: "GET",
    url: "/master/banks",
  });
};
export const createBank = (body: BANKSDT) => {
  return axios({
    method: "POST",
    url: "/master/banks",
    data: { bank: body },
  });
};
export const updateBank = (body: UpdateBankDTO) => {
  return axios({
    method: "PATCH",
    url: `/master/banks/${body.id}`,
    data: { bank: body.value },
  });
};
export const statusChangeBank = (body: BankStatusChangeDTO) => {
  return axios({
    method: "PATCH",
    url: `/master/banks/${body.id}`,
    data: { bank: body.bank_detail },
  });
};

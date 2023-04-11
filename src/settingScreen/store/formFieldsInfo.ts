import { atom } from "recoil";
import { FormFieldsInfo } from "../../type";

const formFieldsInfo = atom<FormFieldsInfo[]>({
  key: 'formFieldsInfo',
  default: []
});

export { formFieldsInfo };
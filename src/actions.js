import axios from "axios";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE"
export const NOT_SIL = "NOT_SIL"

export function notEkle(not) {
 return { type: NOT_EKLE, payload: not}
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId}
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  const toastMes = toast.loading("Ekleniyor...");
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        toast.update(toastMes, {
          render: "Tebrikler! Notunuz başarıyla eklendi",
          type: "success",
          autoClose: 1000,
          isLoading: false,
        });

        dispatch(notEkle(res.data.json));
      }
    })
    .catch((error) => console.log(error));
}

export const notSilAPI = (id) => (dispatch) => {
  const toasterDelete = toast.loading("Notunuz siliniyor");
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        console.log("Bağlantı silindi", res);
        toast.update(toasterDelete, {
          render: "Notunuz silindi. :(",
          type: "warn", 
          autoClose: 1000,
          isLoading: false,
        
        });
        dispatch(notSil(res.data.data));
      }
    })
    .catch((error) => {
      console.log(error);
      toast.update(toasterDelete, {
        render: "Hata oluştu. Lütfen tekrar deneyin!",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
    });
}
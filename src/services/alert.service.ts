import Swal from "sweetalert2";

export function toastAlert(txt: string, icons: any, time?: number) {
    if(!time){
        time === 5000
    }
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: time,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: icons,
        title: txt
      });
}
import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  width: 300,
  timer: 2000,
});

export const Alert = Swal.mixin({
  showConfirmButton: false,
  width: 1200,
  timer: 3000,
});

export const Dialog = Swal.mixin({
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  width: 1200,
});

export const Checkout = Swal.mixin({
  showConfirmButton: true,
  width: 1200,
});

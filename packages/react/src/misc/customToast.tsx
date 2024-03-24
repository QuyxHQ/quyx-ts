import toast from "react-hot-toast";

export enum TOAST_STATUS {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warrning",
}

export function customToast({ type, message }: { type: TOAST_STATUS; message: string }) {
  // return toast.custom((_) => <div className={type}>{message}</div>);
  if (type == TOAST_STATUS.SUCCESS) return toast.success(message);
  if (type == TOAST_STATUS.ERROR) return toast.error(message);
  return;
}

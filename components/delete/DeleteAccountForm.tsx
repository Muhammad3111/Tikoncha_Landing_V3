"use client";

import { useEffect, useMemo, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
};

type Copy = {
  title: string;
  description: string;
  phoneLabel: string;
  phonePlaceholder: string;
  sendOtp: string;
  resendOtp: string;
  otpLabel: string;
  otpHint: string;
  verifyOtp: string;
  sending: string;
  verifying: string;
  deleting: string;
  invalidPhone: string;
  invalidOtp: string;
  otpSent: string;
  deleteSuccess: string;
  sendError: string;
  verifyError: string;
  deleteError: string;
  unknownError: string;
  changePhone: string;
  timeLeftLabel: string;
  sentTo: string;
  otpVerified: string;
  confirmPrompt: string;
  confirmProceed: string;
  confirmBack: string;
  modalTitle: string;
  modalDescription: string;
  modalKeywordLabel: string;
  modalKeywordPlaceholder: string;
  modalKeywordHint: string;
  modalCancel: string;
  modalConfirm: string;
  modalKeywordError: string;
  deleteConfirmWord: string;
  userInfoName: string;
  userInfoSurname: string;
  userInfoPhone: string;
};

type Step = "phone" | "otp" | "confirm";

type ToastKind = "success" | "error" | "info";

type ToastItem = {
  id: number;
  kind: ToastKind;
  message: string;
};

const copyByLang: Record<Lang, Copy> = {
  uz: {
    title: "Hisobni o'chirish",
    description:
      "Avval telefon raqamingizni kiriting. So'ng 6 xonali OTP kod orqali tasdiqlab hisobni o'chirasiz.",
    phoneLabel: "Telefon raqami",
    phonePlaceholder: "telefon raqamingizni kiriting",
    sendOtp: "Kod yuborish",
    resendOtp: "Kodni qayta yuborish",
    otpLabel: "6 xonali kod",
    otpHint: "SMS orqali yuborilgan kodni kiriting.",
    verifyOtp: "Tasdiqlash",
    sending: "Yuborilmoqda...",
    verifying: "Tasdiqlanmoqda...",
    deleting: "O'chirilmoqda...",
    invalidPhone: "Iltimos, telefon raqamini to'g'ri kiriting.",
    invalidOtp: "Iltimos, 6 xonali kodni to'liq kiriting.",
    otpSent: "Kod yuborildi.",
    deleteSuccess: "Hisob muvaffaqiyatli o'chirildi.",
    sendError: "Kod yuborishda xatolik yuz berdi.",
    verifyError: "Kodni tasdiqlashda xatolik yuz berdi.",
    deleteError: "Hisobni o'chirishda xatolik yuz berdi.",
    unknownError: "Noma'lum xatolik yuz berdi.",
    changePhone: "Nomerni o'zgartirish",
    timeLeftLabel: "Qolgan vaqt",
    sentTo: "Kod yuborilgan raqam",
    otpVerified: "Kod tasdiqlandi. Endi hisobni o'chirishni tasdiqlang.",
    confirmPrompt: "Siz rostdan ham ushbu hisobni o'chirmoqchimisiz?",
    confirmProceed: "Ha, davom etish",
    confirmBack: "Yo'q, ortga qaytish",
    modalTitle: "O'chirishni tasdiqlang",
    modalDescription: "Davom etish uchun quyidagi so'zni kiriting:",
    modalKeywordLabel: "Tasdiqlash so'zi",
    modalKeywordPlaceholder: "O'chirish",
    modalKeywordHint: "So'z: O'chirish",
    modalCancel: "Bekor qilish",
    modalConfirm: "Hisobni o'chirish",
    modalKeywordError: "Tasdiqlash so'zini to'g'ri kiriting.",
    deleteConfirmWord: "O'chirish",
    userInfoName: "Ism",
    userInfoSurname: "Familiya",
    userInfoPhone: "Telefon",
  },
  ru: {
    title: "Удаление аккаунта",
    description:
      "Сначала введите номер телефона. Затем подтвердите удаление аккаунта через 6-значный OTP-код.",
    phoneLabel: "Номер телефона",
    phonePlaceholder: "Введите номер телефона",
    sendOtp: "Отправить код",
    resendOtp: "Отправить код повторно",
    otpLabel: "6-значный код",
    otpHint: "Введите код, отправленный по SMS.",
    verifyOtp: "Подтвердить",
    sending: "Отправка...",
    verifying: "Подтверждение...",
    deleting: "Удаление...",
    invalidPhone: "Пожалуйста, введите корректный номер телефона.",
    invalidOtp: "Пожалуйста, полностью введите 6-значный код.",
    otpSent: "Код отправлен.",
    deleteSuccess: "Аккаунт успешно удалён.",
    sendError: "Не удалось отправить код.",
    verifyError: "Не удалось подтвердить код.",
    deleteError: "Не удалось удалить аккаунт.",
    unknownError: "Произошла неизвестная ошибка.",
    changePhone: "Изменить номер",
    timeLeftLabel: "Осталось времени",
    sentTo: "Код отправлен на номер",
    otpVerified: "Код подтверждён. Теперь подтвердите удаление аккаунта.",
    confirmPrompt: "Вы действительно хотите удалить этот аккаунт?",
    confirmProceed: "Да, продолжить",
    confirmBack: "Нет, вернуться",
    modalTitle: "Подтвердите удаление",
    modalDescription: "Чтобы продолжить, введите следующее слово:",
    modalKeywordLabel: "Слово подтверждения",
    modalKeywordPlaceholder: "Удалить",
    modalKeywordHint: "Слово: Удалить",
    modalCancel: "Отмена",
    modalConfirm: "Удалить аккаунт",
    modalKeywordError: "Введите слово подтверждения корректно.",
    deleteConfirmWord: "Удалить",
    userInfoName: "Имя",
    userInfoSurname: "Фамилия",
    userInfoPhone: "Телефон",
  },
  en: {
    title: "Delete Account",
    description:
      "First enter your phone number. Then confirm account deletion using the 6-digit OTP code.",
    phoneLabel: "Phone number",
    phonePlaceholder: "Enter your phone number",
    sendOtp: "Send code",
    resendOtp: "Resend code",
    otpLabel: "6-digit code",
    otpHint: "Enter the code sent via SMS.",
    verifyOtp: "Confirm",
    sending: "Sending...",
    verifying: "Verifying...",
    deleting: "Deleting...",
    invalidPhone: "Please enter a valid phone number.",
    invalidOtp: "Please enter all 6 digits of the code.",
    otpSent: "Code sent.",
    deleteSuccess: "Account deleted successfully.",
    sendError: "Failed to send code.",
    verifyError: "Failed to verify code.",
    deleteError: "Failed to delete account.",
    unknownError: "An unknown error occurred.",
    changePhone: "Change phone number",
    timeLeftLabel: "Time left",
    sentTo: "Code was sent to",
    otpVerified: "Code verified. Now confirm account deletion.",
    confirmPrompt: "Are you sure you want to delete this account?",
    confirmProceed: "Yes, continue",
    confirmBack: "No, go back",
    modalTitle: "Confirm deletion",
    modalDescription: "To continue, type the following word:",
    modalKeywordLabel: "Confirmation word",
    modalKeywordPlaceholder: "Delete",
    modalKeywordHint: "Word: Delete",
    modalCancel: "Cancel",
    modalConfirm: "Delete account",
    modalKeywordError: "Please enter the confirmation word correctly.",
    deleteConfirmWord: "Delete",
    userInfoName: "First name",
    userInfoSurname: "Last name",
    userInfoPhone: "Phone",
  },
};

const OTP_LENGTH = 6;
const OTP_TIMEOUT_SECONDS = 60;
const TOAST_LIFETIME_MS = 5000;
const UZ_PHONE_PREFIX = "+998";
const UZ_PHONE_LOCAL_LENGTH = 9;
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.tikoncha.uz")
  .trim()
  .replace(/\/+$/, "");

const createEmptyOtp = () => Array.from({ length: OTP_LENGTH }, () => "");

const extractLocalPhoneDigits = (value: string): string => {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  if (digits.length > UZ_PHONE_LOCAL_LENGTH) {
    digits = digits.slice(0, UZ_PHONE_LOCAL_LENGTH);
  }

  return digits;
};

const hasValidPhone = (localDigits: string): boolean => localDigits.length === UZ_PHONE_LOCAL_LENGTH;

const formatLocalPhone = (localDigits: string): string => {
  const part1 = localDigits.slice(0, 2);
  const part2 = localDigits.slice(2, 5);
  const part3 = localDigits.slice(5, 7);
  const part4 = localDigits.slice(7, 9);

  return [part1, part2, part3, part4].filter(Boolean).join(" ");
};

const padTime = (value: number): string => String(Math.max(value, 0)).padStart(2, "0");

const normalizeConfirmWord = (value: string): string =>
  value
    .trim()
    .toLocaleLowerCase()
    .replace(/[ʼʻ‘’`´]/g, "'")
    .replace(/\s+/g, " ");

type VerifyResult = {
  user_id: string;
  access_token: string;
  first_name: string;
  last_name: string;
};

const getVerifyResult = (payload: unknown): VerifyResult | null => {
  if (!payload || typeof payload !== "object") return null;

  const root = payload as Record<string, unknown>;
  if (root.success !== true) return null;

  const data = root.data;
  if (!data || typeof data !== "object") return null;

  const d = data as Record<string, unknown>;
  const getString = (obj: Record<string, unknown>, key: string): string =>
    typeof obj[key] === "string" ? (obj[key] as string).trim() : "";

  const userId = getString(d, "user_id");
  const accessToken = getString(d, "access_token");
  if (!userId || !accessToken) return null;

  const userInfo = d.user_info;
  if (!userInfo || typeof userInfo !== "object") return null;

  const info = userInfo as Record<string, unknown>;

  return {
    user_id: userId,
    access_token: accessToken,
    first_name: getString(info, "first_name"),
    last_name: getString(info, "last_name"),
  };
};

const buildApiUrl = (path: string): string => {
  if (!path.startsWith("/")) return path;
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
};

const isFailedApiEnvelope = (parsed: unknown): boolean => {
  if (!parsed || typeof parsed !== "object") return false;

  const payload = parsed as {
    success?: unknown;
    code?: unknown;
    error?: unknown;
  };

  if (typeof payload.success === "boolean") {
    return !payload.success;
  }

  if (typeof payload.code === "number") {
    return payload.code >= 400;
  }

  if (typeof payload.error === "string" && payload.error.trim()) {
    return true;
  }

  return false;
};

const getApiErrorMessage = (parsed: unknown): string | null => {
  if (!parsed || typeof parsed !== "object") return null;

  const payload = parsed as Record<string, unknown>;

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message.trim();
  }

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error.trim();
  }

  return null;
};

async function readResponseData(response: Response): Promise<{ raw: string; parsed: unknown }> {
  const contentType = response.headers.get("content-type") ?? "";
  const raw = await response.text();
  if (!raw.trim()) {
    return {
      raw: `${response.status} ${response.statusText}`.trim(),
      parsed: null,
    };
  }

  if (contentType.includes("text/html")) {
    return {
      raw: `${response.status} ${response.statusText}`.trim(),
      parsed: null,
    };
  }

  try {
    return {
      raw,
      parsed: JSON.parse(raw) as unknown,
    };
  } catch {
    return {
      raw,
      parsed: null,
    };
  }
}

export function DeleteAccountForm({ lang }: Props) {
  const copy = copyByLang[lang];
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [phoneDigits, setPhoneDigits] = useState("");
  const [step, setStep] = useState<Step>("phone");
  const [otpDigits, setOtpDigits] = useState<string[]>(() => createEmptyOtp());
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isProcessingOtp, setIsProcessingOtp] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [verifiedUserId, setVerifiedUserId] = useState<string | null>(null);
  const [verifiedAccessToken, setVerifiedAccessToken] = useState<string | null>(null);
  const [verifiedUserInfo, setVerifiedUserInfo] = useState<VerifyResult | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const phoneFormatted = useMemo(() => formatLocalPhone(phoneDigits), [phoneDigits]);
  const phoneForRequest = useMemo(
    () => `${UZ_PHONE_PREFIX}${phoneDigits}`,
    [phoneDigits],
  );
  const phoneFullDisplay = useMemo(
    () => (phoneFormatted ? `${UZ_PHONE_PREFIX} ${phoneFormatted}` : UZ_PHONE_PREFIX),
    [phoneFormatted],
  );
  const otpCode = useMemo(() => otpDigits.join(""), [otpDigits]);
  const isDeleteWordMatched = useMemo(
    () => normalizeConfirmWord(deleteConfirmInput) === normalizeConfirmWord(copy.deleteConfirmWord),
    [deleteConfirmInput, copy.deleteConfirmWord],
  );

  useEffect(() => {
    if (step !== "otp" || secondsLeft <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [step, secondsLeft]);

  const pushToast = (kind: ToastKind, message: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev.slice(-2), { id, kind, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, TOAST_LIFETIME_MS);
  };

  const focusOtpInput = (index: number) => {
    const node = otpRefs.current[index];
    if (!node) return;
    node.focus();
    node.select();
  };

  const clearOtp = () => {
    setOtpDigits(createEmptyOtp());
  };

  const resetDeleteConfirmationState = () => {
    setVerifiedUserId(null);
    setVerifiedAccessToken(null);
    setVerifiedUserInfo(null);
    setDeleteConfirmInput("");
    setIsDeleteModalOpen(false);
  };

  const setOtpAt = (index: number, digit: string) => {
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
  };

  const handleOtpChange = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    setOtpAt(index, digit);
    if (digit && index < OTP_LENGTH - 1) {
      focusOtpInput(index + 1);
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      setOtpDigits((prev) => {
        const next = [...prev];
        if (next[index]) {
          next[index] = "";
          return next;
        }

        if (index > 0) {
          next[index - 1] = "";
          window.requestAnimationFrame(() => focusOtpInput(index - 1));
        }
        return next;
      });
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusOtpInput(index - 1);
      return;
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusOtpInput(index + 1);
    }
  };

  const handleOtpPaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedDigits) return;
    event.preventDefault();

    const nextDigits = pastedDigits.slice(0, OTP_LENGTH - index).split("");
    setOtpDigits((prev) => {
      const next = [...prev];
      nextDigits.forEach((digit, offset) => {
        next[index + offset] = digit;
      });
      return next;
    });

    const targetIndex = Math.min(index + nextDigits.length, OTP_LENGTH - 1);
    focusOtpInput(targetIndex);
  };

  const handlePhoneInputChange = (rawValue: string) => {
    const nextDigits = extractLocalPhoneDigits(rawValue);
    setPhoneDigits(nextDigits);
  };

  const sendOtp = async () => {
    if (!hasValidPhone(phoneDigits)) {
      pushToast("error", copy.invalidPhone);
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(buildApiUrl("/auth/send-otp"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneForRequest,
        }),
      });

      const sendPayload = await readResponseData(response);

      if (!response.ok || isFailedApiEnvelope(sendPayload.parsed)) {
        const serverMessage = getApiErrorMessage(sendPayload.parsed);
        pushToast("error", serverMessage ?? copy.sendError);
        return;
      }

      setStep("otp");
      setSecondsLeft(OTP_TIMEOUT_SECONDS);
      clearOtp();
      resetDeleteConfirmationState();
      pushToast("success", copy.otpSent);
      window.requestAnimationFrame(() => focusOtpInput(0));
    } catch {
      pushToast("error", copy.unknownError);
    } finally {
      setIsSending(false);
    }
  };

  const resendOtp = async () => {
    if (secondsLeft > 0) return;
    await sendOtp();
  };

  const handleChangePhone = () => {
    setStep("phone");
    setSecondsLeft(0);
    clearOtp();
    resetDeleteConfirmationState();
  };

  const verifyOtpAndPrepareDelete = async () => {
    if (!hasValidPhone(phoneDigits)) {
      pushToast("error", copy.invalidPhone);
      return;
    }

    if (otpCode.length !== OTP_LENGTH || otpDigits.some((digit) => !digit)) {
      pushToast("error", copy.invalidOtp);
      return;
    }

    setIsProcessingOtp(true);
    try {
      const verifyResponse = await fetch(buildApiUrl("/auth/verify-otp"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneForRequest,
          otp_code: otpCode,
        }),
      });

      const verifyPayload = await readResponseData(verifyResponse);

      if (isFailedApiEnvelope(verifyPayload.parsed)) {
        const serverMessage = getApiErrorMessage(verifyPayload.parsed);
        pushToast("error", serverMessage ?? copy.verifyError);
        return;
      }

      const result = getVerifyResult(verifyPayload.parsed);
      if (!result) {
        pushToast("error", copy.verifyError);
        return;
      }

      localStorage.setItem("user_id", result.user_id);

      setVerifiedUserId(result.user_id);
      setVerifiedAccessToken(result.access_token);
      setVerifiedUserInfo(result);
      setDeleteConfirmInput("");
      setStep("confirm");
      setSecondsLeft(0);
      pushToast("success", copy.otpVerified);
    } catch {
      pushToast("error", copy.unknownError);
    } finally {
      setIsProcessingOtp(false);
    }
  };

  const openDeleteModal = () => {
    setDeleteConfirmInput("");
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
  };

  const goBackToPhoneStep = () => {
    if (isDeleting) return;
    handleChangePhone();
  };

  const confirmAndDeleteAccount = async () => {
    if (!verifiedUserId || !verifiedAccessToken) {
      pushToast("error", copy.deleteError);
      return;
    }

    if (!isDeleteWordMatched) {
      pushToast("error", copy.modalKeywordError);
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(buildApiUrl(`/users/${verifiedUserId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifiedAccessToken}`,
        },
      });

      const deletePayload = await readResponseData(response);

      setIsDeleteModalOpen(false);

      if (isFailedApiEnvelope(deletePayload.parsed)) {
        const serverMessage = getApiErrorMessage(deletePayload.parsed);
        pushToast("error", serverMessage ?? copy.deleteError);
        return;
      }

      const successMessage = getApiErrorMessage(deletePayload.parsed);
      pushToast("success", successMessage ?? copy.deleteSuccess);
      localStorage.removeItem("user_id");
      setPhoneDigits("");
      setStep("phone");
      setSecondsLeft(0);
      clearOtp();
      resetDeleteConfirmationState();
    } catch {
      setIsDeleteModalOpen(false);
      pushToast("error", copy.unknownError);
    } finally {
      setIsDeleting(false);
    }
  };

  const toastStyleByKind: Record<ToastKind, string> = {
    success: "border-secondary/45 bg-secondary/20 text-[#d8f7df]",
    error: "border-[#ff6b6b]/50 bg-[#ff6b6b]/12 text-[#ffd8d8]",
    info: "border-white/25 bg-white/10 text-white",
  };

  return (
    <>
      <div className="fixed right-3 top-3 z-[1200] flex w-[min(94vw,460px)] flex-col gap-2 sm:right-5 sm:top-5">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-xl border px-4 py-3 text-sm shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur ${toastStyleByKind[toast.kind]}`}
          >
            <p className="whitespace-pre-wrap break-words leading-5">{toast.message}</p>
          </div>
        ))}
      </div>

      <section className="pb-12 pt-8 text-mist lg:pb-20">
        <div className="mx-auto w-full max-w-[860px] rounded-[30px] border border-white/10 bg-[linear-gradient(165deg,rgba(20,41,25,0.38)_0%,rgba(20,24,30,0.78)_55%,rgba(15,18,23,0.9)_100%)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-7 lg:p-9">
          <h1 className="text-[34px] font-bold leading-[1.1] text-white sm:text-[44px]">{copy.title}</h1>
          <p className="mt-4 max-w-[760px] text-base leading-7 text-white/80 sm:text-[18px]">{copy.description}</p>

          {step === "phone" ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <label htmlFor="delete-phone" className="mb-2 block text-sm font-medium text-white/85">
                {copy.phoneLabel}
              </label>
              <div className="flex h-12 w-full items-center rounded-xl border border-white/15 bg-[#0f141d] focus-within:border-secondary">
                <span className="border-r border-white/15 px-3 text-sm font-semibold text-white/85 sm:px-4">
                  {UZ_PHONE_PREFIX}
                </span>
                <input
                  id="delete-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phoneFormatted}
                  onChange={(event) => handlePhoneInputChange(event.target.value)}
                  placeholder={copy.phonePlaceholder}
                  className="h-full w-full rounded-r-xl bg-transparent px-3 text-white placeholder:text-white/40 focus:outline-none sm:px-4"
                />
              </div>

              <button
                type="button"
                onClick={sendOtp}
                disabled={isSending}
                className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-secondary px-5 text-sm font-semibold text-[#0f1612] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? copy.sending : copy.sendOtp}
              </button>
            </div>
          ) : step === "otp" ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/55">{copy.sentTo}</p>
                  <p className="mt-1 text-base font-semibold text-white">{phoneFullDisplay}</p>
                </div>
                <button
                  type="button"
                  onClick={handleChangePhone}
                  className="w-fit text-sm font-medium text-secondary underline underline-offset-2"
                >
                  {copy.changePhone}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white/85">{copy.otpLabel}</p>
                <p className="text-sm text-[#FDB022]">
                  {copy.timeLeftLabel}: 00:{padTime(secondsLeft)}
                </p>
              </div>
              <p className="mt-1 text-sm text-white/60">{copy.otpHint}</p>

              <div className="mt-4 grid grid-cols-6 gap-2 sm:gap-3">
                {otpDigits.map((digit, index) => (
                  <input
                    key={`otp-${index}`}
                    ref={(node) => {
                      otpRefs.current[index] = node;
                    }}
                    value={digit}
                    onChange={(event) => handleOtpChange(index, event.target.value)}
                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                    onPaste={(event) => handleOtpPaste(index, event)}
                    onFocus={(event) => event.currentTarget.select()}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    type="text"
                    aria-label={`${copy.otpLabel} ${index + 1}`}
                    className="h-12 w-full rounded-xl border border-white/15 bg-[#0f141d] text-center text-[20px] font-semibold text-white outline-none transition-colors focus:border-[#FDB022] sm:h-14 sm:text-2xl"
                  />
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={verifyOtpAndPrepareDelete}
                  disabled={isProcessingOtp}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#FDB022] px-5 text-sm font-semibold text-[#251603] transition-opacity disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isProcessingOtp ? copy.verifying : copy.verifyOtp}
                </button>
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={secondsLeft > 0 || isSending || isProcessingOtp}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isSending ? copy.sending : copy.resendOtp}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-lg font-semibold text-white sm:text-xl">{copy.confirmPrompt}</p>
              <p className="mt-3 text-sm text-white/65">{phoneFullDisplay}</p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={openDeleteModal}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#ef4444] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
                >
                  {copy.confirmProceed}
                </button>
                <button
                  type="button"
                  onClick={goBackToPhoneStep}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
                >
                  {copy.confirmBack}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-[1300] flex items-center justify-center bg-[#05070d]/75 px-4"
          onClick={closeDeleteModal}
        >
          <div
            className="w-full max-w-[520px] rounded-2xl border border-white/15 bg-[#0f141d] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-white">{copy.modalTitle}</h2>

            {verifiedUserInfo && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/55">{copy.userInfoName}</span>
                    <span className="font-medium text-white">{verifiedUserInfo.first_name || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/55">{copy.userInfoSurname}</span>
                    <span className="font-medium text-white">{verifiedUserInfo.last_name || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/55">{copy.userInfoPhone}</span>
                    <span className="font-medium text-white">{phoneFullDisplay}</span>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-4 text-sm leading-6 text-white/75">{copy.modalDescription}</p>
            <p className="mt-2 text-sm font-semibold text-[#FDB022]">{copy.modalKeywordHint}</p>

            <label htmlFor="delete-confirm-word" className="mt-4 block text-sm font-medium text-white/85">
              {copy.modalKeywordLabel}
            </label>
            <input
              id="delete-confirm-word"
              type="text"
              value={deleteConfirmInput}
              onChange={(event) => setDeleteConfirmInput(event.target.value)}
              placeholder={copy.modalKeywordPlaceholder}
              className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-[#0a1018] px-4 text-white placeholder:text-white/35 focus:border-[#FDB022] focus:outline-none"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copy.modalCancel}
              </button>
              <button
                type="button"
                onClick={confirmAndDeleteAccount}
                disabled={!isDeleteWordMatched || isDeleting}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#ef4444] px-5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? copy.deleting : copy.modalConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

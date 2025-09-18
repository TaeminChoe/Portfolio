"use client";
import { createContext, Fragment, ReactNode, useCallback, useContext, useState } from "react";
import AlertModal from "./components/AlertModal";

export const ALERT_OK = "OK";
export const CONFIRM_NO = "NO";
export const CONFIRM_OK = "OK";

type TYPE_ALERT = "alert";
type TYPE_CONFIRM = "confirm";

export interface OpenAlertType {
  message: string;
  onClose?: () => void;
}
interface OpenConfirmType {
  message: string;
  yes?: string;
  no?: string;
}
export interface AlertType {
  type: TYPE_ALERT | TYPE_CONFIRM;
  message: string;
  open: boolean;
  onClose?: (response?: any) => void;
  yes?: string;
  no?: string;
}

interface ContextType {
  openAlert: (message: string, onClose?: (res?: any) => void) => void;
  openConfirmAlert: (
    { message, yes, no }: OpenConfirmType,
    onClose?: (response: any) => void,
  ) => void;
}

export const AlertContext = createContext<ContextType>({
  openAlert: (res?: any) => {},
  openConfirmAlert: () => {},
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const openAlert = useCallback((message: string, onClose?: (res?: any) => void) => {
    const newAlert: AlertType = {
      type: "alert",
      message,
      onClose,
      open: true,
    };
    setAlerts((prev) => {
      return [...prev, newAlert];
    });
  }, []);

  const openConfirmAlert = useCallback(
    ({ message, yes, no }: OpenConfirmType, onClose?: (response?: any) => void) => {
      const newConfirmAlert: AlertType = {
        type: "confirm",
        message,
        yes,
        no,
        open: true,
        onClose,
      };
      setAlerts((prev) => {
        return [...prev, newConfirmAlert];
      });
    },
    [],
  );

  const close = useCallback(
    (index: number, response?: string) => {
      if (alerts[index].onClose) alerts[index].onClose(response);
      setAlerts((prev) => {
        const updatedAlert = [...prev];
        updatedAlert[index].open = false;
        return updatedAlert;
      });
    },
    [alerts],
  );

  return (
    <AlertContext.Provider value={{ openAlert, openConfirmAlert }}>
      {children}
      {alerts.map((alert, idx) => {
        return (
          <Fragment key={idx}>
            {alert.open && alert.type === "alert" && (
              <AlertModal
                key={idx}
                content={alert.message}
                buttons={[
                  {
                    text: "확인",
                    onClick: () => close(idx, ALERT_OK),
                  },
                ]}
                onClose={() => close(idx)}
              />
            )}
            {alert.open && alert.type === "confirm" && (
              <AlertModal
                key={idx}
                content={alert.message}
                buttons={[
                  {
                    text: alert.yes || "네",
                    onClick: () => close(idx, CONFIRM_OK),
                  },
                  {
                    text: alert.no || "아니오",
                    onClick: () => close(idx, CONFIRM_NO),
                  },
                ]}
                onClose={() => close(idx)}
              />
            )}
          </Fragment>
        );
      })}
    </AlertContext.Provider>
  );
};

export const useAlert = (): ContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("alert context error");
  }
  return context;
};

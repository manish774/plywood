import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { listInquiries } from "../api/contact";

export interface InquiriesContextValue {
  pendingCount: number;
  refresh: () => void;
}

const InquiriesContext = createContext<InquiriesContextValue | null>(null);

export function InquiriesProvider({ children }: { children: ReactNode }) {
  const [pendingCount, setPendingCount] = useState(0);

  const refresh = useCallback(() => {
    listInquiries()
      .then((inquiries) =>
        setPendingCount(inquiries.filter((inq) => inq.status !== "acknowledged").length),
      )
      .catch(() => {});
  }, []);

  useEffect(refresh, [refresh]);

  const value: InquiriesContextValue = { pendingCount, refresh };

  return <InquiriesContext.Provider value={value}>{children}</InquiriesContext.Provider>;
}

export function useInquiries(): InquiriesContextValue {
  const ctx = useContext(InquiriesContext);
  if (!ctx) throw new Error("useInquiries must be used within an InquiriesProvider");
  return ctx;
}

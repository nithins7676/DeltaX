import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type UserRole = "sales" | "manager";

interface RoleContextValue {
  role: UserRole;
  setRole: (nextRole: UserRole) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRoleState] = useState<UserRole>("sales");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("drivelead.role");
      if (stored === "sales" || stored === "manager") {
        setRoleState(stored);
      }
    } catch (_) {
      // ignore storage errors in non-browser environments
    }
  }, []);

  const setRole = (nextRole: UserRole) => {
    setRoleState(nextRole);
    try {
      localStorage.setItem("drivelead.role", nextRole);
    } catch (_) {
      // ignore
    }
  };

  const value = useMemo(() => ({ role, setRole }), [role]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = (): RoleContextValue => {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return ctx;
};



import * as React from "react";

function createSafeContext<TValue extends {} | null>() {
  const context = React.createContext<TValue | undefined>(undefined);

  function useContext() {
    const value = React.useContext(context);
    if (value === undefined) {
      throw new Error(
        "You should use useContext inside a Provider with a value"
      );
    }
    return value;
  }

  return [useContext, context.Provider] as const;
}

export default createSafeContext;

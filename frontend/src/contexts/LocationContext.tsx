import React, { createContext, useState, useEffect, ReactNode } from "react";

interface LocationContextType {
  selectedCity: string;
  selectCity: (city: string) => void;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    try {
      const storedCity = localStorage.getItem("selectedCity");
      return storedCity ? JSON.parse(storedCity) : "Hyderabad";
    } catch (error) {
      console.error("Failed to parse city from localStorage", error);
      return "Hyderabad";
    }
  });

  useEffect(() => {
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
  }, [selectedCity]);

  const selectCity = (city: string) => {
    setSelectedCity(city);
  };

  const value = { selectedCity, selectCity };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

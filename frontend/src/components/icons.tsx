import React from "react";

type IconProps = {
  className?: string;
  strokeWidth?: string;
};

// This file contains a library of SVG icons used throughout the application.
// Using them as React components makes it easy to apply styles and props.

export const DashboardIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="7" height="9" x="3" y="3" rx="1"></rect>
    <rect width="7" height="5" x="14" y="3" rx="1"></rect>
    <rect width="7" height="9" x="14" y="12" rx="1"></rect>
    <rect width="7" height="5" x="3" y="16" rx="1"></rect>
  </svg>
);

export const ProductIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
    <path d="M3 6h18"></path>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export const OrderIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" x2="8" y1="13" y2="13"></line>
    <line x1="16" x2="8" y1="17" y2="17"></line>
    <line x1="10" x2="8" y1="9" y2="9"></line>
  </svg>
);

export const PaymentsIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="2" y1="10" x2="22" y2="10"></line>
  </svg>
);

export const CustomerIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

export const BellIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

export const MoreVerticalIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </svg>
);

export const SpinnerIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    className={`animate-spin ${props.className}`}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const Logo: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 100 100" fill="currentColor">
    <path
      d="M50 10 C 25 25, 25 75, 50 90 C 75 75, 75 25, 50 10 Z M 50 25 A 5 5 0 0 1 50 35 A 5 5 0 0 1 50 25 M 40 45 L 60 55 M 60 45 L 40 55"
      stroke="currentColor"
      strokeWidth="5"
      fill="none"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const CrosshairIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="22" y1="12" x2="18" y2="12"></line>
    <line x1="6" y1="12" x2="2" y2="12"></line>
    <line x1="12" y1="6" x2="12" y2="2"></line>
    <line x1="12" y1="22" x2="12" y2="18"></line>
  </svg>
);

// Simplified City Icons
const cityIconProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const CityHyderabadIcon: React.FC<IconProps> = (props) => (
  <svg {...props} {...cityIconProps}>
    <path d="M12 25h40v27h-40zM22 52v-27M42 52v-27M12 25l20-12l20 12M25 25h14v-7h-14z" />
  </svg>
);
export const CityBangaloreIcon: React.FC<IconProps> = (props) => (
  <svg {...props} {...cityIconProps}>
    <path d="M12 52V20h40v32M12 20L32 8l20 12M20 52V20M28 52V20M36 52V20M44 52V20M12 52h40" />
  </svg>
);
export const CityChandigarhIcon: React.FC<IconProps> = (props) => (
  <svg {...props} {...cityIconProps}>
    <path d="M32 12a20 20 0 0 0-20 20v20h40V32a20 20 0 0 0-20-20zM32 52V32" />
  </svg>
);
export const CityChennaiIcon: React.FC<IconProps> = (props) => (
  <svg {...props} {...cityIconProps}>
    <path d="M12 12h40v40H12zM12 12l20 12l20-12M22 42h20v10H22zM32 42V24" />
  </svg>
);
export const CityDelhiNCRIcon: React.FC<IconProps> = (props) => (
  <svg {...props} {...cityIconProps}>
    <path d="M12 52l20-40l20 40H12zM19 38h26M23 28h18M28 18h8" />
  </svg>
);
export const CityJaipurIcon: React.FC<IconProps> = (props) => (
  <svg {...props} {...cityIconProps}>
    <rect x="12" y="22" width="40" height="30" rx="2" />
    <path d="M20 22v-8h24v8M24 14h16" />
  </svg>
);
export const CityMumbaiIcon: React.FC<IconProps> = (props) => (
  <svg {...props} {...cityIconProps}>
    <path d="M16 20v32h32V20M16 20a16 16 0 0 1 32 0M32 52V32" />
  </svg>
);
export const CityPuneIcon: React.FC<IconProps> = (props) => (
  <svg {...props} {...cityIconProps}>
    <path d="M12 52h40L32 12zM32 12v40M12 52h40v-8H12z" />
  </svg>
);

// App Download Banner Icons
export const QrCodeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#000"
      d="M32 32h64v64H32zm32 32v16h16V80H80V64h16v16zm-32-32h16v16H64v16H48V48h16zM48 48v16H32V48zm-16 16h16v16H32z"
    />
    <path
      fill="#000"
      d="M160 32h64v64h-64zm32 32v16h16V80h-16V64h16v16zm-32-32h16v16h-16v16h-16V48h16zm16 16v16h-16V48h16zM160 80h16v16h-16zm16-32h16v16h-16z"
    />
    <path
      fill="#000"
      d="M32 160h64v64H32zm32 32v16h16v-16h-16v-16h16v16zm-32-32h16v16H64v16H48v-16h16zM48 176v16H32v-16zm-16 16h16v16H32z"
    />
    <path
      fill="#000"
      d="M112 112h16v16h-16zm16 16h16v16h-16zm-16 16h16v16h-16zm-16 16h16v16h-16zm16 0h16v16h-16zm-32 16h16v16h-16zm16 16h16v16h-16zm-16-32h16v16h-16zm-16 0h16v16h-16zm32-16h16v16h-16zm16 0h16v16h-16zm16 0h16v16h-16zm16-16h16v16h-16zm0-16h16v16h-16zm-16-16h16v16h-16zm-16 0h16v16h-16zm16 32h16v16h-16zm16 16h16v16h-16zm0 16h16v16h-16zm16 16h16v16h-16zm16 0h16v16h-16zm-16 16h16v16h-16zm-32 0h16v16h-16zm-16-16h16v16h-16zm16-16h16v16h-16zm16 0h16v16h-16zm16-16h16v16h-16zm0-16h16v16h-16zm-32 0h16v16h-16zm-16 0h16v16h-16zm0-16h16v16h-16z"
    />
  </svg>
);

export const AppStoreBadgeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} width="150" height="50" viewBox="0 0 120 40">
    <rect width="120" height="40" rx="5" fill="#000" />
    <path
      fill="#fff"
      d="M12.9,29.3c-0.8,0-1.4-0.2-1.9-0.5c-0.5-0.3-0.9-0.8-1.2-1.4c-0.3-0.6-0.4-1.3-0.4-2.2c0-1.1,0.3-2.1,0.8-2.9 c0.5-0.8,1.2-1.4,2-1.8c0.8-0.4,1.7-0.6,2.6-0.6c0.8,0,1.4,0.1,1.8,0.3s0.8,0.5,1.1,0.9l-1.3,0.8c-0.2-0.3-0.5-0.5-0.8-0.6 c-0.3-0.1-0.7-0.2-1-0.2c-0.5,0-1,0.1-1.4,0.3c-0.4,0.2-0.8,0.5-1.1,0.9c-0.3,0.4-0.5,0.9-0.7,1.5c-0.1,0.6-0.2,1.2-0.2,1.9 c0,0.8,0.1,1.4,0.3,2c0.2,0.6,0.5,1,0.8,1.3c0.4,0.3,0.8,0.5,1.2,0.5c0.4,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.8-0.6l1.3,0.7 c-0.3,0.4-0.6,0.7-1.1,1C14.1,29.2,13.5,29.3,12.9,29.3z M19.4,26.5c-0.5,1-1.2,1.8-2.2,2.3c-1,0.5-2,0.8-3.3,0.8 c-1,0-1.9-0.2-2.7-0.5c-0.8-0.3-1.5-0.8-2-1.5c-0.3-0.4-0.5-0.9-0.7-1.4c-0.2-0.5-0.2-1.1-0.2-1.8c0-1.1,0.3-2,0.8-2.8 c0.5-0.8,1.2-1.4,2-1.8c0.8-0.4,1.7-0.6,2.7-0.6c0.8,0,1.5,0.1,2,0.4c0.5,0.3,1,0.6,1.3,1.1l-1.3,0.8c-0.2-0.3-0.5-0.6-0.8-0.7 c-0.4-0.2-0.8-0.2-1.2-0.2c-0.5,0-1,0.1-1.4,0.3c-0.4,0.2-0.8,0.5-1,0.9c-0.3,0.4-0.5,0.9-0.6,1.5c-0.1,0.6-0.2,1.2-0.2,1.9 c0,0.8,0.1,1.5,0.3,2.1c0.2,0.6,0.5,1.1,0.9,1.4c0.4,0.3,0.8,0.5,1.3,0.5c0.5,0,1-0.1,1.3-0.4c0.4-0.3,0.6-0.6,0.8-1L19.4,26.5z M20.9,12.2c0.9-0.9,1.9-1.4,3.1-1.4c0.3,0,0.6,0,0.9,0.1c0.3,0.1,0.6,0.2,0.8,0.4c0.2,0.2,0.4,0.4,0.6,0.6 c0.2,0.3,0.3,0.6,0.3,0.9c0,0.4-0.1,0.7-0.3,1c-0.2,0.3-0.5,0.5-0.8,0.6c-0.6,0.3-1.3,0.4-2.1,0.4h-1.1v2.8h-1.6V12.2z M22.5,14.6 h1.1c0.5,0,0.9-0.1,1.2-0.2c0.3-0.1,0.5-0.3,0.7-0.5c0.1-0.2,0.2-0.5,0.2-0.8c0-0.3-0.1-0.6-0.2-0.8c-0.1-0.2-0.3-0.3-0.5-0.4 c-0.2-0.1-0.5-0.1-0.7-0.1h-1.4V14.6z"
    />
    <text
      x="35"
      y="15"
      fill="#fff"
      font-family="Arial, sans-serif"
      font-size="8"
      font-weight="normal"
    >
      Available on the
    </text>
    <text
      x="35"
      y="29"
      fill="#fff"
      font-family="Arial, sans-serif"
      font-size="14"
      font-weight="bold"
    >
      App Store
    </text>
  </svg>
);

export const GooglePlayBadgeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} width="150" height="50" viewBox="0 0 135 40">
    <rect width="135" height="40" rx="5" fill="#000" />
    <path
      fill="#fff"
      d="M19.3,13.2l-6.8,6.8l6.8,6.8l6.1-6.1c0.4-0.4,0.6-0.9,0.6-1.5s-0.2-1.1-0.6-1.5L19.3,13.2z"
    />
    <path fill="#4CAF50" d="M25.4,26.1l-6.1-6.1l-6.8,6.8l6.8,6.8L25.4,26.1z" />
    <path
      fill="#F44336"
      d="M12.5,13.2l6.8,6.8l-6.8,6.8l-0.7-0.7c-0.4-0.4-0.6-0.9-0.6-1.5v-9.1c0-0.6,0.2-1.1,0.6-1.5L12.5,13.2z"
    />
    <path
      fill="#2196F3"
      d="M19.3,33.7l6.1-6.1l0.7,0.7c0.4,0.4,0.6,0.9,0.6,1.5v9.1c0,0.6-0.2,1.1-0.6,1.5L19.3,33.7z"
    />
    <text
      x="35"
      y="15"
      fill="#fff"
      font-family="Arial, sans-serif"
      font-size="8"
      font-weight="normal"
    >
      GET IT ON
    </text>
    <text
      x="35"
      y="29"
      fill="#fff"
      font-family="Arial, sans-serif"
      font-size="14"
      font-weight="bold"
    >
      Google Play
    </text>
  </svg>
);

export const CreditCardIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
    <line x1="2" y1="10" x2="22" y2="10"></line>
  </svg>
);

export const UpiIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 19.5V4.5H13V19.5H11Z" fill="currentColor" />
    <path
      d="M16.5 4.5H14V19.5H16.5C19.2614 19.5 21.5 17.2614 21.5 14.5V9.5C21.5 6.73858 19.2614 4.5 16.5 4.5Z"
      fill="currentColor"
    />
    <path
      d="M5.5 19.5H8V11.5C8 8.46243 5.53757 6 2.5 6V6C2.5 6 2.5 6 2.5 6V6C2.5 6 2.5 6 2.5 6C2.5 6 2.5 6 2.5 6C2.5 6 2.5 6 2.5 6C2.5 6 2.5 6 2.5 6C2.5 6 2.5 6 2.5 6C2.5 6 2.5 6 2.5 6C2.5 6 2.5 6 2.5 6V19.5H5.5Z"
      fill="currentColor"
    />
  </svg>
);

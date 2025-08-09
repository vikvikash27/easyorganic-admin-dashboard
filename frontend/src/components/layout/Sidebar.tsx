import React from "react";
import { NavLink } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import {
  DashboardIcon,
  ProductIcon,
  OrderIcon,
  CustomerIcon,
  SettingsIcon,
  Logo,
} from "../icons";

// This is the main navigation sidebar for the admin panel.
// It displays the application logo and navigation links.
const Sidebar: React.FC = () => {
  const { user } = useAdminAuth();

  const navItems = [
    {
      to: "/admin/dashboard",
      icon: <DashboardIcon className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      to: "/admin/products",
      icon: <ProductIcon className="h-5 w-5" />,
      label: "Products",
    },
    {
      to: "/admin/orders",
      icon: <OrderIcon className="h-5 w-5" />,
      label: "Orders",
    },
    {
      to: "/admin/customers",
      icon: <CustomerIcon className="h-5 w-5" />,
      label: "Customers",
    },
  ];

  const bottomNavItems = [
    {
      to: "/admin/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
      label: "Settings",
    },
  ];

  // Conditionally add items based on user role
  // Example: if (user?.role === 'admin') { ... }

  const linkClass =
    "flex items-center px-4 py-2.5 rounded-lg font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors";
  const activeLinkClass = "bg-brand-primary text-white";

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800 text-white flex flex-col">
      <div className="h-20 flex items-center px-6">
        <NavLink to="/admin/dashboard" className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-brand-secondary" />
          <span className="text-xl font-bold">EasyOrganic</span>
        </NavLink>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

import React from "react";
import { OrderStatus, StatusEvent } from "../types";
import { HomeIcon, PackageCheckIcon, TruckIcon, XCircleIcon } from "./icons";

interface OrderTrackerProps {
  statusHistory: StatusEvent[];
  currentStatus: OrderStatus;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({
  statusHistory,
  currentStatus,
}) => {
  const allStatuses: OrderStatus[] = [
    "Pending",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  // If order is cancelled, show a simplified tracker
  if (currentStatus === "Cancelled") {
    const cancelledEvent = statusHistory.find((s) => s.status === "Cancelled");
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
            <XCircleIcon className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-bold text-red-800">Order Cancelled</h4>
            {cancelledEvent && (
              <p className="text-sm text-red-600">
                {new Date(cancelledEvent.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
      case "Processing":
        return <PackageCheckIcon />;
      case "Shipped":
      case "Out for Delivery":
        return <TruckIcon />;
      case "Delivered":
        return <HomeIcon />;
      default:
        return <PackageCheckIcon />;
    }
  };

  const getStatusInfo = (status: OrderStatus): StatusEvent | undefined => {
    return statusHistory.find((s) => s.status === status);
  };

  return (
    <div className="space-y-4">
      {allStatuses.map((status, index) => {
        const info = getStatusInfo(status);
        const isCompleted = !!info;
        const isCurrent = status === currentStatus;
        const isFuture =
          allStatuses.indexOf(status) > allStatuses.indexOf(currentStatus);

        const baseColor = "slate-400";
        const activeColor = "brand-primary";

        const iconColorClass = isCompleted
          ? `bg-green-100 text-green-600`
          : isCurrent
          ? `bg-blue-100 text-blue-600`
          : `bg-slate-100 text-slate-400`;
        const textColorClass = isFuture ? "text-slate-400" : "text-slate-800";
        const lineColorClass =
          isCompleted && !isCurrent ? `bg-green-500` : `bg-slate-200`;

        return (
          <div key={status} className="flex gap-4 items-start">
            {/* Icon and Line */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${iconColorClass}`}
              >
                {getStatusIcon(status)}
              </div>
              {index < allStatuses.length - 1 && (
                <div
                  className={`w-1 flex-grow my-2 transition-colors duration-300 ${lineColorClass}`}
                ></div>
              )}
            </div>
            {/* Text Content */}
            <div className={`pt-2 ${textColorClass}`}>
              <h4 className={`font-bold ${isFuture ? "font-medium" : ""}`}>
                {status}
              </h4>
              {info && (
                <p className="text-sm">
                  {new Date(info.timestamp).toLocaleString()}
                </p>
              )}
              {info?.notes && (
                <p className="text-xs italic mt-1 text-slate-500">
                  {info.notes}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTracker;

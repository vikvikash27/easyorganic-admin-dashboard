import React from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { AppStoreBadgeIcon, GooglePlayBadgeIcon, QrCodeIcon } from "./icons";

const AppDownloadBanner: React.FC = () => {
  const VerticalDivider = () => (
    <div className="self-stretch items-center justify-center hidden lg:flex">
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <div className="w-px flex-grow bg-slate-200"></div>
        <span className="flex-shrink-0 text-xs font-semibold text-slate-400 border-2 border-slate-200 rounded-full w-9 h-9 flex items-center justify-center">
          OR
        </span>
        <div className="w-px flex-grow bg-slate-200"></div>
      </div>
    </div>
  );

  const HorizontalDivider = () => (
    <div className="self-stretch items-center justify-center flex lg:hidden w-full">
      <div className="flex items-center justify-center w-full gap-2">
        <div className="h-px flex-grow bg-slate-200"></div>
        <span className="flex-shrink-0 text-xs font-semibold text-slate-400 border-2 border-slate-200 rounded-full w-9 h-9 flex items-center justify-center">
          OR
        </span>
        <div className="h-px flex-grow bg-slate-200"></div>
      </div>
    </div>
  );

  return (
    <section className="bg-subtle-bg py-10 md:py-16">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
            {/* Section 1: Free Membership & QR */}
            <div className="flex items-center gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Free Membership
                </h3>
                <p className="text-lg text-slate-600 mt-1">On your signup</p>
              </div>
              <div className="text-center flex-shrink-0">
                <QrCodeIcon className="w-28 h-28 md:w-32 md:h-32" />
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-2">
                  Scan to download
                </p>
              </div>
            </div>

            <VerticalDivider />
            <HorizontalDivider />

            {/* Section 2: Phone Input */}
            <div className="flex items-center gap-2">
              <Input
                type="tel"
                placeholder="Enter your Number"
                className="!py-3"
                aria-label="Enter your phone number to get an app download link"
              />
              <Button
                variant="success"
                size="lg"
                className="flex-shrink-0 !py-3"
              >
                Send Link
              </Button>
            </div>

            <VerticalDivider />
            <HorizontalDivider />

            {/* Section 3: App Store Buttons */}
            <div className="flex flex-col items-center gap-3">
              <a href="#" aria-label="Download on the App Store">
                <AppStoreBadgeIcon className="h-11 w-auto" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <GooglePlayBadgeIcon className="h-11 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadBanner;

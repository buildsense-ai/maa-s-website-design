"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";

export function SponsoredBar() {
  const { t } = useLanguage();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="collaboration-bar">
      <span className="collab-label">{t("sponsoredBy")}</span>
      <div className="collab-logos">
        <div className="collab-track">
          <div className="collab-group">
            <span className="collab-item">
              <Image src={`${basePath}/collab1.png`} alt="Partner 1" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab2.png`} alt="Partner 2" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab3.png`} alt="Partner 3" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab4.png`} alt="Partner 4" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab5.png`} alt="Partner 5" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab6.png`} alt="Partner 5" width={120} height={40} />
            </span>
          </div>
          <div className="collab-group" aria-hidden="true">
            <span className="collab-item">
              <Image src={`${basePath}/collab1.png`} alt="Partner 1" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab2.png`} alt="Partner 2" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab3.png`} alt="Partner 3" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab4.png`} alt="Partner 4" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab5.png`} alt="Partner 5" width={120} height={40} />
            </span>
            <span className="collab-item">
              <Image src={`${basePath}/collab6.png`} alt="Partner 5" width={120} height={40} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

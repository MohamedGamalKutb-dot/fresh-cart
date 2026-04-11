import Link from "next/link";
import React, { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeroBannerProps {
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  icon: ReactNode;
  bgClassName?: string;
  iconBgClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  breadcrumbClassName?: string;
  breadcrumbActiveClassName?: string;
  iconColorClassName?: string;
}

export default function HeroBanner({
  title,
  subtitle,
  breadcrumbs,
  icon,
  bgClassName = "bg-[#1EBA57]",
  iconBgClassName = "bg-[#009966]",
  titleClassName = "text-white",
  subtitleClassName = "text-white/90",
  breadcrumbClassName = "text-white/80",
  breadcrumbActiveClassName = "text-white",
  iconColorClassName = "text-white",
}: HeroBannerProps) {
  return (
    <div className={`${bgClassName} py-12 md:py-16 mb-12 transition-colors`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className={`flex items-center gap-2 ${breadcrumbClassName} text-sm font-medium mb-6`}>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {crumb.href ? (
                <Link href={crumb.href} className={`hover:${breadcrumbActiveClassName} transition-colors`}>
                  {crumb.label}
                </Link>
              ) : (
                <span className={`${breadcrumbActiveClassName}`}>{crumb.label}</span>
              )}
              {/* Divider slash */}
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon Box */}
          <div className={`w-16 h-16 ${iconBgClassName} rounded-2xl flex items-center justify-center ${iconColorClassName} shadow-sm shrink-0`}>
            {icon}
          </div>
          
          {/* Typography */}
          <div>
            <h1 className={`text-3xl md:text-4xl lg:text-[40px] font-bold ${titleClassName} mb-2 tracking-tight`}>
              {title}
            </h1>
            <p className={`${subtitleClassName} text-[15px] md:text-base font-medium`}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

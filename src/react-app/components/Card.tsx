import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
  hover = false,
}: CardProps) {
  const baseStyles = `
    relative bg-white rounded-2xl transition-all duration-200
  `;

  const variantStyles = {
    default: `
      shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)]
      border border-gray-100
    `,
    elevated: `
      shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.1),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.1),0_3.62px_3.62px_-2px_rgba(0,0,0,0.09),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.09),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.07),0_30px_30px_-4px_rgba(0,0,0,0.04),inset_0_3px_1px_0_rgb(255,255,255)]
      border border-gray-200
    `,
    flat: `
      shadow-sm border border-gray-200
    `,
  };

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hoverStyles = hover
    ? "hover:shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.12),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.12),0_3.62px_3.62px_-2px_rgba(0,0,0,0.11),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.11),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.09),0_40px_40px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardWithImageProps {
  image: string;
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

export function CardWithImage({
  image,
  icon,
  title,
  description,
  className = "",
  onClick,
}: CardWithImageProps) {
  return (
    <div
      className={`
        relative bg-gray-50 rounded-2xl overflow-hidden
        shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.08),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.08),0_3.62px_3.62px_-2px_rgba(0,0,0,0.07),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.07),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.05),0_30px_30px_-4px_rgba(0,0,0,0.02),inset_0_3px_1px_0_rgb(255,255,255)]
        hover:shadow-[0_0.71px_0.71px_-0.67px_rgba(0,0,0,0.12),0_1.81px_1.81px_-1.33px_rgba(0,0,0,0.12),0_3.62px_3.62px_-2px_rgba(0,0,0,0.11),0_6.87px_6.87px_-2.67px_rgba(0,0,0,0.11),0_13.65px_13.65px_-3.33px_rgba(0,0,0,0.09),0_40px_40px_-4px_rgba(0,0,0,0.06)]
        hover:-translate-y-1
        transition-all duration-200 cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden rounded-2xl m-4 mb-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background:
              "radial-gradient(50% 100% at -5.4% 35.5%, rgba(240, 248, 255, 0.9) 0%, rgba(4, 7, 13, 0) 100%)",
          }}
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Icon Badge */}
        {icon && (
          <div
            className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl
            bg-gradient-to-b from-black to-white
            shadow-[0_0.71px_0.71px_-0.54px_rgba(171,171,171,0.64),0_1.81px_1.81px_-1.08px_rgba(171,171,171,0.63),0_3.62px_3.62px_-1.63px_rgba(171,171,171,0.61),0_6.87px_6.87px_-2.17px_rgba(171,171,171,0.58),0_13.65px_13.65px_-2.71px_rgba(171,171,171,0.51),0_30px_30px_-3.25px_rgba(171,171,171,0.35)]"
          >
            <div className="text-white">{icon}</div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 opacity-80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface CardWithIconProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBg?: string;
  className?: string;
  onClick?: () => void;
}

export function CardWithIcon({
  icon,
  title,
  description,
  iconBg = "from-blue-500 to-blue-600",
  className = "",
  onClick,
}: CardWithIconProps) {
  return (
    <Card
      variant="default"
      padding="lg"
      hover
      className={className}
      onClick={onClick}
    >
      {/* Icon Badge */}
      <div
        className={`inline-flex items-center justify-center w-14 h-14 mb-4 rounded-xl
        bg-gradient-to-br ${iconBg}
        shadow-[0_0.71px_0.71px_-0.54px_rgba(0,0,0,0.1),0_1.81px_1.81px_-1.08px_rgba(0,0,0,0.1),0_3.62px_3.62px_-1.63px_rgba(0,0,0,0.09),0_6.87px_6.87px_-2.17px_rgba(0,0,0,0.09),0_13.65px_13.65px_-2.71px_rgba(0,0,0,0.07),0_30px_30px_-3.25px_rgba(0,0,0,0.04)]`}
      >
        <div className="text-white">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 opacity-80 leading-relaxed">
        {description}
      </p>
    </Card>
  );
}

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  className?: string;
}

export function StatsCard({
  label,
  value,
  change,
  icon,
  className = "",
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card variant="default" padding="md" className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change !== undefined && (
            <p
              className={`text-sm font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

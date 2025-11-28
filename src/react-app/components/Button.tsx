import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "white" | "black" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2 font-medium
    transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-xl",
    lg: "px-6 py-3 text-lg rounded-2xl",
  };

  // Variant styles with metallic gradient effect
  const variantStyles = {
    primary: `
      text-white
      bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700
      shadow-[0_0.07px_1px_0_rgba(0,0,0,0),0_0.16px_2.39px_0_rgba(0,0,0,0),0_0.29px_4.36px_0_rgba(0,0,0,0.01),0_0.48px_7.24px_0_rgba(0,0,0,0.01),0_0.78px_11.7px_0_rgba(0,0,0,0.02),0_1.28px_19.15px_0_rgba(0,0,0,0.03),0_2.2px_32.97px_0_rgba(0,0,0,0.05),0_4px_60px_0_rgba(0,0,0,0.1),0_0.12px_0.24px_0_rgba(255,255,255,0),0_0.46px_0.92px_0_rgba(255,255,255,0),0_2px_4px_0_rgba(255,255,255,0)]
      hover:shadow-[0_0.07px_1px_0_rgba(0,0,0,0.05),0_0.16px_2.39px_0_rgba(0,0,0,0.05),0_0.29px_4.36px_0_rgba(0,0,0,0.02),0_0.48px_7.24px_0_rgba(0,0,0,0.02),0_0.78px_11.7px_0_rgba(0,0,0,0.03),0_1.28px_19.15px_0_rgba(0,0,0,0.04),0_2.2px_32.97px_0_rgba(0,0,0,0.06),0_6px_70px_0_rgba(0,0,0,0.15)]
      active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]
      focus:ring-blue-500
      before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-40
      after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_2px_4px_5px_0_rgba(0,0,0,0.1),inset_0_0_1px_1px_rgba(0,0,0,0.05)]
    `,
    secondary: `
      text-gray-700
      bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400
      shadow-[0_0.07px_1px_0_rgba(0,0,0,0),0_0.16px_2.39px_0_rgba(0,0,0,0),0_0.29px_4.36px_0_rgba(0,0,0,0.01),0_0.48px_7.24px_0_rgba(0,0,0,0.01),0_0.78px_11.7px_0_rgba(0,0,0,0.02),0_1.28px_19.15px_0_rgba(0,0,0,0.03),0_2.2px_32.97px_0_rgba(0,0,0,0.05),0_4px_60px_0_rgba(0,0,0,0.1)]
      hover:shadow-[0_0.07px_1px_0_rgba(0,0,0,0.05),0_0.16px_2.39px_0_rgba(0,0,0,0.05),0_0.29px_4.36px_0_rgba(0,0,0,0.02),0_0.48px_7.24px_0_rgba(0,0,0,0.02),0_0.78px_11.7px_0_rgba(0,0,0,0.03),0_1.28px_19.15px_0_rgba(0,0,0,0.04),0_2.2px_32.97px_0_rgba(0,0,0,0.06),0_6px_70px_0_rgba(0,0,0,0.15)]
      active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]
      focus:ring-gray-400
      before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/30 before:to-transparent before:opacity-50
      after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_2px_4px_5px_0_rgba(0,0,0,0.05),inset_0_0_1px_1px_rgba(0,0,0,0.03)]
    `,
    white: `
      text-gray-900
      bg-gradient-to-b from-white via-gray-50 to-gray-100
      shadow-[0_0.07px_1px_0_rgba(0,0,0,0.02),0_0.16px_2.39px_0_rgba(0,0,0,0.03),0_0.29px_4.36px_0_rgba(0,0,0,0.04),0_0.48px_7.24px_0_rgba(0,0,0,0.05),0_0.78px_11.7px_0_rgba(0,0,0,0.06),0_1.28px_19.15px_0_rgba(0,0,0,0.07),0_2.2px_32.97px_0_rgba(0,0,0,0.09),0_4px_60px_0_rgba(0,0,0,0.12)]
      hover:shadow-[0_0.07px_1px_0_rgba(0,0,0,0.05),0_0.16px_2.39px_0_rgba(0,0,0,0.06),0_0.29px_4.36px_0_rgba(0,0,0,0.07),0_0.48px_7.24px_0_rgba(0,0,0,0.08),0_0.78px_11.7px_0_rgba(0,0,0,0.09),0_1.28px_19.15px_0_rgba(0,0,0,0.1),0_2.2px_32.97px_0_rgba(0,0,0,0.12),0_6px_70px_0_rgba(0,0,0,0.18)]
      active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.15)]
      focus:ring-gray-300
      border border-gray-200
      before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/60 before:to-transparent before:opacity-60
      after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_2px_4px_5px_0_rgba(0,0,0,0.03),inset_0_0_1px_1px_rgba(0,0,0,0.02)]
    `,
    black: `
      text-white
      bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900
      shadow-[0_0.07px_1px_0_rgba(0,0,0,0.1),0_0.16px_2.39px_0_rgba(0,0,0,0.15),0_0.29px_4.36px_0_rgba(0,0,0,0.2),0_0.48px_7.24px_0_rgba(0,0,0,0.25),0_0.78px_11.7px_0_rgba(0,0,0,0.3),0_1.28px_19.15px_0_rgba(0,0,0,0.35),0_2.2px_32.97px_0_rgba(0,0,0,0.4),0_4px_60px_0_rgba(0,0,0,0.5)]
      hover:shadow-[0_0.07px_1px_0_rgba(0,0,0,0.15),0_0.16px_2.39px_0_rgba(0,0,0,0.2),0_0.29px_4.36px_0_rgba(0,0,0,0.25),0_0.48px_7.24px_0_rgba(0,0,0,0.3),0_0.78px_11.7px_0_rgba(0,0,0,0.35),0_1.28px_19.15px_0_rgba(0,0,0,0.4),0_2.2px_32.97px_0_rgba(0,0,0,0.45),0_6px_70px_0_rgba(0,0,0,0.6)]
      active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.4)]
      focus:ring-gray-700
      before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-30
      after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_2px_4px_5px_0_rgba(0,0,0,0.2),inset_0_0_1px_1px_rgba(0,0,0,0.1)]
    `,
    success: `
      text-white
      bg-gradient-to-b from-green-500 via-green-600 to-green-700
      shadow-[0_0.07px_1px_0_rgba(0,0,0,0),0_0.16px_2.39px_0_rgba(0,0,0,0),0_0.29px_4.36px_0_rgba(0,0,0,0.01),0_0.48px_7.24px_0_rgba(0,0,0,0.01),0_0.78px_11.7px_0_rgba(0,0,0,0.02),0_1.28px_19.15px_0_rgba(0,0,0,0.03),0_2.2px_32.97px_0_rgba(0,0,0,0.05),0_4px_60px_0_rgba(0,0,0,0.1)]
      hover:shadow-[0_0.07px_1px_0_rgba(0,0,0,0.05),0_0.16px_2.39px_0_rgba(0,0,0,0.05),0_0.29px_4.36px_0_rgba(0,0,0,0.02),0_0.48px_7.24px_0_rgba(0,0,0,0.02),0_0.78px_11.7px_0_rgba(0,0,0,0.03),0_1.28px_19.15px_0_rgba(0,0,0,0.04),0_2.2px_32.97px_0_rgba(0,0,0,0.06),0_6px_70px_0_rgba(0,0,0,0.15)]
      active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]
      focus:ring-green-500
      before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-40
      after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_2px_4px_5px_0_rgba(0,0,0,0.1),inset_0_0_1px_1px_rgba(0,0,0,0.05)]
    `,
    danger: `
      text-white
      bg-gradient-to-b from-red-500 via-red-600 to-red-700
      shadow-[0_0.07px_1px_0_rgba(0,0,0,0),0_0.16px_2.39px_0_rgba(0,0,0,0),0_0.29px_4.36px_0_rgba(0,0,0,0.01),0_0.48px_7.24px_0_rgba(0,0,0,0.01),0_0.78px_11.7px_0_rgba(0,0,0,0.02),0_1.28px_19.15px_0_rgba(0,0,0,0.03),0_2.2px_32.97px_0_rgba(0,0,0,0.05),0_4px_60px_0_rgba(0,0,0,0.1)]
      hover:shadow-[0_0.07px_1px_0_rgba(0,0,0,0.05),0_0.16px_2.39px_0_rgba(0,0,0,0.05),0_0.29px_4.36px_0_rgba(0,0,0,0.02),0_0.48px_7.24px_0_rgba(0,0,0,0.02),0_0.78px_11.7px_0_rgba(0,0,0,0.03),0_1.28px_19.15px_0_rgba(0,0,0,0.04),0_2.2px_32.97px_0_rgba(0,0,0,0.06),0_6px_70px_0_rgba(0,0,0,0.15)]
      active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]
      focus:ring-red-500
      before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-40
      after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_2px_4px_5px_0_rgba(0,0,0,0.1),inset_0_0_1px_1px_rgba(0,0,0,0.05)]
    `,
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    </button>
  );
}

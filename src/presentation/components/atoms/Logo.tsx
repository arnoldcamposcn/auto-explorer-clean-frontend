import logo from "@/presentation/assets/logos/logo-mazda.png"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
}

export const Logo = ({ size = "md", alt = "Logo" }: LogoProps) => {
  return (
    <img
      src={logo}
      alt={alt}
      className={`${sizeClasses[size]} object-contain`}
    />
  )
}
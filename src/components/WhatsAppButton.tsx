import React from "react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  text: string;
  dishName: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  text,
  dishName,
  className = "",
}) => {
  const handleClick = () => {
    const message = `Hi! I'd like to order ${dishName}.`;
    const whatsappUrl = `https://wa.me/+2348123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 bg-card hover:bg-accent dark:hover:bg-accent text-foreground dark:hover:text-accent-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:shadow-[0_0_10px_rgba(155,135,245,0.3)]",
        className
      )}
    >
      {text}
    </button>
  );
};

export default WhatsAppButton;

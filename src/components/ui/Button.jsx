import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ children, className, variant = 'primary', ...props }) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg shadow-yellow-400/20 active:scale-95",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 active:scale-95",
    outline: "border border-zinc-700 hover:border-yellow-400 hover:text-yellow-400 text-zinc-400",
    ghost: "text-zinc-400 hover:text-yellow-400"
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

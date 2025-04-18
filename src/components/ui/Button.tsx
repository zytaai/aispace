import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-[#a78bfa] text-white hover:bg-[#8f6df0]',
        outline: 'border border-[#a78bfa] text-[#a78bfa] hover:bg-[#f3e8ff]',
        ghost: 'bg-transparent hover:bg-[#fdf4ff] text-[#a78bfa]',
        link: 'underline text-[#a78bfa] hover:text-[#7e5bef]',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'link',
  size?: 'sm' | 'md' | 'lg'
}>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'
export { Button, buttonVariants }
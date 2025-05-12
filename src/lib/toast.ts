import { toast } from 'sonner'

export const toastConfig = {
  error: (title: string, description?: string, duration?: number) =>
    toast.success(title, {
      description,
      style: {
        background: 'red',
        color: '#fff'
      },
      duration
    }),
  success: (title: string, description?: string, duration?: number) =>
    toast.success(title, {
      description,
      style: {
        background: 'green',
        color: '#fff'
      },
      duration
    }),
  warning: (title: string, description?: string, duration?: number) =>
    toast.success(title, {
      description,
      style: {
        background: 'orange',
        color: '#fff'
      },
      duration
    })
}

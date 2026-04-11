"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

export default function AppButton({ children, ...prop }: React.ComponentProps<typeof Button>) {
  return (

    <Button {...prop}>{children}</Button>
  )
}

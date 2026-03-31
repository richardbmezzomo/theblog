type ContainerProps = {
  children: React.ReactNode
}
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-8 py-12">{children}</div>
    </div>
  )
}

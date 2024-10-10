
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
          <main className='w-screen h-full flex justify-center flex-col items-center gap-8'>
           <div className=''><p className='text-center text-xl font-bold'>Sign in to your account</p></div>
            {children}
          </main>


    )
  }
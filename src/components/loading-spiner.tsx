const LoadingSpinner = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='col-span-3 h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-slate-500' />
    </div>
  )
}

export default LoadingSpinner

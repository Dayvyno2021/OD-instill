import { memo } from 'react'

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-ring"></div>
    </div>
  )
}

export default memo(Loader);
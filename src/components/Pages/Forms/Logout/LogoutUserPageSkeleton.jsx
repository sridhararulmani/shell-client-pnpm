import React from 'react'
import { appContainerStyle, dataAosAnimationForContainers, dataAosOnce } from '../../../../util/AppUtils'

const LogoutUserPageSkeleton = () => {
  return (
    <div className={`skeleton-card ${appContainerStyle}`} data-aos={dataAosAnimationForContainers} data-aos-once={dataAosOnce}>
      
    </div>
  )
}

export default LogoutUserPageSkeleton

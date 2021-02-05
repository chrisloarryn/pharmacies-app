import React from 'react'

import './MainHeader.sass'

const MainHeader = (props) => {
  return <header className='main-header'>{props.children}</header>
}

export default MainHeader

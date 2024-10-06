import React from 'react'

const Header = () => {
  return (
    
    <section className='header'>
        <div className="left-header">
            <img src="src/assets/imgs/Logo.svg" height={60} alt="" />
        </div>

        <div className="right-header">
            <div className="profile">
                <img src="src/assets/imgs/profile.svg" height={30} alt="" />
            </div>
            <div className="notification">
                <img src="src/assets/imgs/notification.svg" height={30} alt="" />
            </div>
        </div>
    </section>
    
    
  )
}

export default Header
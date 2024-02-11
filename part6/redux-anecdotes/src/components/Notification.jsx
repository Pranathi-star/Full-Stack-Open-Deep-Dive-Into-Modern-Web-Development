import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";

const Notification = () => {
  const message = useSelector(state => state.notification)
  const [showNotification, setShowNotification] = useState(false)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(
    () => {
      setShowNotification(true)
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);    
    }, [message]);

  return (
    <>
      {message != '' && showNotification && 
      <div style={style}>
        {message}
      </div>
    }
    </>
  )
}

export default Notification
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Alert from './Alert';

const Form = () => {

  const sendForm = async (form) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/userform', form, config);

      console.log(res.data.data);

      setAlert(true);
      setTimeout(() => {
        setAlert(false)
      }, 3000);


    } catch (error) {
      console.error(error.response);
    }

  }

  const [userForm, setUserForm] = useState({
    name: '',
    phone: '',
    email: '',
    msg: '',
  });

  const [dangerName, setDangerName] = useState(false);
  const [dangerEmail, setDangerEmail] = useState(false);
  const [dangerPhone, setDangerPhone] = useState(false);
  const [dangerMsg, setDangerMsg] = useState(false);

  const [showAlert, setAlert] = useState(false);


  const {
    name,
    phone,
    email,
    msg,
  } = userForm;

  const onChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }



  const onSubmit = (e) => {

    e.preventDefault();
    const emailRegEx = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const phoneRegEx = new RegExp(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/);

    if (name === '') {
      setDangerName(true);
      setTimeout(() => {
        setDangerName(false)
      }, 3000)
    }

    if (msg === '') {
      setDangerMsg(true);
      setTimeout(() => {
        setDangerMsg(false)
      }, 3000)
    }

    if (!phone.match(phoneRegEx)) {
      setDangerPhone(true);
      setTimeout(() => {
        setDangerPhone(false)
      }, 3000)
    }

    if (!email.match(emailRegEx)) {
      setDangerEmail(true);
      setTimeout(() => {
        setDangerEmail(false)
      }, 3000)
    }

    if (msg && name && phone && email) {
      sendForm(userForm);
      setUserForm({
        name: '',
        phone: '',
        email: '',
        msg: '',

      });

     
    }

  }



  return (
    <Fragment >
      {showAlert && (<Alert />)}
      <form onSubmit={onSubmit} className="form">
        <h2>Contact Us</h2>
        <div className="main">
          <div className="flex">
            <div className="form-group">
              <small>Name</small>
              <input className={dangerName ? 'danger' : null} name='name' value={name} type="text" placeholder="Name" onChange={onChange} />
              <small className={dangerName ? 'danger' : 'hide'}>Enter Your Name</small>

            </div>

            <div className="form-group">
              <small>Phone</small>
              <input className={dangerPhone ? 'danger' : null} type="text" placeholder="Phone" name='phone' value={phone} onChange={onChange} />
              <small className={dangerPhone ? 'danger' : 'hide'}>Enter Your Phone</small>

            </div>
          </div>

          <div className="form-group">
            <small>Email</small>
            <input className={dangerEmail ? 'danger' : null} name='email' type="email"
              placeholder="Email" value={email} onChange={onChange} />
            <small className={dangerEmail ? 'danger' : 'hide'}>Invalid Email</small>
          </div>

          <div className="form-group">
            <small>Message</small>
            <textarea className={dangerMsg ? 'danger' : null} name="msg" value={msg} cols="30" rows="8" onChange={onChange}></textarea>
            <small className={dangerMsg ? 'danger' : 'hide'}>Please leave a message</small>
          </div>

          <div className='text'>
            <span>Отправляя форму вы соглашаетесь с <a href="!#">пользоваткльским соглашеним</a> и <a href="!#">политикой конфиденцивльности</a></span>
          </div>

          <div className='form-group'>
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default Form

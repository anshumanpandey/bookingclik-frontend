import React, { useState, useEffect } from 'react';
import useAxios, { makeUseAxios } from 'axios-hooks'
import axios from 'axios'
import { CircularProgress, InputBase } from '@material-ui/core';
import { sendEmail } from '../../crud/email.crud';
import { useMediaQuery } from 'react-responsive'
import qs from 'qs';
import { dispatchGlobalState, useGlobalState } from '../../state';


const normalUseAxios = makeUseAxios({
  axios: axios.create()
});

export const SearchWidget: React.FC = () => {
  const [name, setName] = useState('leo');
  const [email, setEmail] = useState('leo_9_t@hotmail.com');
  const [subject, setSubject] = useState('test');
  const [description, setDescription] = useState('need');
  const isSm = useMediaQuery({ query: '(min-width: 768px)' })

  const [emailReq, send] = normalUseAxios<{ ip: string }>(sendEmail(), { manual: true })
  const [success, setSuccess] = useGlobalState('success');

  return (
    <div className="main-search-input-wrap" style={{ maxWidth: '1096px' }}>
      <div style={{
        display: "flex",
        position: "relative",
        backgroundColor: "black",
        padding: "2rem",
        marginTop: "5rem",
        borderRadius: '0.25rem',
      }}>
        <div className="main-search-input fl-wrap" style={{ display: 'flex', flexDirection: 'column', boxShadow: 'unset', padding: 0, background: 'unset', marginTop: 0, height: '100%', justifyContent: 'space-around' }}>
          {success && (
            <div className="notification success fl-wrap">
              <p>{success}</p>
              <a onClick={() => setSuccess(null)} className="notification-close" href="#">
                <i className="fa fa-times"></i></a>
            </div>
          )}
          <div>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-around', flexDirection: isSm ? 'unset' : 'column' }}>
              <div style={{ marginRight: '0.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <InputBase
                  style={{ borderRadius: '6px', backgroundColor: 'white', height: '3rem', padding: '0.5rem' }}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>


              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <InputBase
                  style={{ borderRadius: '6px', backgroundColor: 'white', height: '3rem', padding: '0.5rem' }}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <InputBase
                  style={{ marginLeft: '0.5rem', borderRadius: '6px', backgroundColor: 'white', height: '3rem', padding: '0.5rem' }}
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around', flexDirection: isSm ? 'unset' : 'column' }}>
              <div style={{ marginRight: '0.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <InputBase
                  type="textarea"
                  style={{ borderRadius: '6px', backgroundColor: 'white', height: '8rem', padding: '0.5rem' }}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <button className="main-search-button" onClick={() => {
              axios.post(`https://carrentalclik.com/contact.php`, qs.stringify({
                to: email,
                title: `${name}: ${subject}`,
                body: description,
              }))
                .then(() => {
                  dispatchGlobalState({ type: 'success', state: 'Mail sended!' })
                })
            }} style={{ position: 'relative', marginTop: '1rem', borderRadius: '0.25rem', float: 'right', fontSize: '1.3rem', fontWeight: 'bold' }}>
              Send {emailReq.loading && <CircularProgress color="inherit" size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
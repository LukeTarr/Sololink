import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { getAuthToken } from '../utils/authHelper';

function Links() {

    const [links, setLinks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        populateLinks();
    }, [])

    function populateLinks() {

        const token = getAuthToken();

         fetch('http://localhost:5000/links',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          } )
          .then(response => response.json())
          .then(data => {
              if(!data.error){
                setLinks(data);
              } else {
                setError(data.error);
              }
          }
          )
        }

    return(
        <>
        <Nav/>
        
        <div className="container">
            <div className="jumbo">
                <h1>Links</h1>

                {error !== '' && 
                <>
                <h1 className={'error'}>{error}</h1>
                </>
                }

                {links.map(function(item, idx){
                    return <a  key={idx} href={'https://'+ item.link}>{item.site}</a>
                })}

            </div>
        </div>

        </>
    )
}

export default Links;
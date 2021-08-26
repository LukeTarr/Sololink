import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import '../styles/user.css';

function Users () {
    let { slug } = useParams()
    const [error, setError] = useState('');
    const [username, setUserName] = useState('');
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if(slug) {
            fetch(`http://localhost:5000/users/${slug}`, {
                method: 'GET',
                headers: {
                    'Accepts': 'application/json',
                },
            }).then(response => response.json())
            .then(data => {
                const result = data.result;
                setUserName(result.userName);
                setLinks(result.links);
            })
        } else {
            setError("No user entered.")
        }
    }, [])

    return (
        <>
        <Nav/>
        <div className="userContainer">
            <div className="userBlock">
            <img className='userImage' src="https://img.icons8.com/office/80/000000/test-account.png"/>
                <h2 className={'userTitle'}>
                    {username}
                </h2>


                {links.map(function(item, idx){
                    return <a className='link' key={idx} href={'https://'+ item.link}>{item.site}</a>;
                    })}

            </div>
        </div>
           
                
                
        </>
    );

}

export default Users;
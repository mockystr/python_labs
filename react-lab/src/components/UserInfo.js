import React from 'react';
import '../static/css/style.css';

const UserInfo = props => {
    const {userInfo} = props;
    const userInfoBlock = () => {
        console.log(userInfo);
        return (
            <div>
                <div className='row my-4'>
                    <div className="col-lg-6 col-md-6">
                        <img className='img-thumbnail' src={userInfo.avatar_url} alt=""/>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <a href={userInfo.html_url} target="_blank" className="">{userInfo.login}</a>
                        <p>{userInfo.name}</p>
                        <p className='text-muted'>{userInfo.location}</p>
                        <p>{userInfo.bio}</p>
                        <div className="d-flex">
                            {userInfo.followers &&
                            <p><span className='text-muted'>followers:</span> {userInfo.followers}</p>
                            }
                            {userInfo.following &&
                            <p><span className='text-muted'> following:</span> {userInfo.following}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className='text-center text-muted'>
                    {userInfo.public_repos &&
                    <p>All public repos ({userInfo.public_repos})</p>
                    }
                </div>
            </div>
        )
    };

    return (
        <div>
            {userInfoBlock()}
        </div>
    )
};

export default UserInfo;
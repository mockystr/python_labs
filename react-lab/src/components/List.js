import React from 'react';
import '../static/css/style.css';

const ListOfRepos = props => {
    const {reposData} = props;
    const reposList = reposData.map(repo => {
        return (
            <div>
                <hr/>
                <div className="col-lg-6 mb-2 p-3" key={repo.id}>
                    <div className=''>
                        {/*<img src={repo.owner.avatar_url} alt=""/>*/}
                        <a href={repo.html_url} target="_blank" className="">{repo.name}</a>
                        <p>{repo.description}</p>
                        <p className='text-muted'>{repo.language}</p>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div>
                {reposList}
        </div>
    )
};

export default ListOfRepos;
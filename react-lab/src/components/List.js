import React from 'react';
import '../static/css/style.css';

const ListOfRepos = props => {
    const { reposData } = props;
    const reposList = reposData.map(repo => {
        return (
            <div className="col-lg-6 mb-2 p-3 border rounded" key={repo.id}>
                <div className=''>
                    <a href={repo.html_url} target="_blank" className="">{repo.name}</a>
                    <p>{repo.description}</p>
                    <p className='text-muted'>{repo.language}</p>
                </div>
            </div>
        )
    })

    return (
        <div className="row justify-content-between">
            {reposList}
        </div>
    )
}

export default ListOfRepos;
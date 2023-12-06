import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ProfileGithub = (props) => {
  const [git, setGit] = useState({
    clientId: "062897f0c5f8fa20d6e1",
    clientSecret: "88428878f31b0299 f7e863a295db1ee85767d124",
    count: 1,
    sort: "created: asc",
    repos: [],
  });
  const myRef = useRef(null);
  //when any prop changes this function will run to hit git api to fetch 5 latest repos
  useEffect(() => {
    const fetchData = async () => {
      const { username } = props;
      const { count, sort, clientId, clientSecret } = git;
      const accessToken =
        "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";

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`,
          {
            headers: {
              "User-Agent": "DevConnect",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();

        if (data) {
          setGit((prevState) => ({
            ...prevState,
            repos: data,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.username, git.count, git.sort, git.clientId, git.clientSecret]);

  const { repos } = git;
  // const repoItems = repos.map((repo) => (
  //   <div key={repo.id} className="card card-body mb-2">
  //     <div className="row">
  //       <div className="col-md-6">
  //         <h4>
  //           <Link to={repo.html_url} className="text-info" target="_blank">
  //             {repo.name}
  //           </Link>
  //         </h4>
  //         <p>{repo.description}</p>
  //       </div>
  //       <div className="col-md-6">
  //         <span className="badge badge-info mr-1">
  //           Stars: {repo.stargazers_count}
  //         </span>
  //         <span className="badge badge-secondary mr-1">
  //           Watchers: {repo.watchers_count}
  //         </span>
  //         <span className="badge badge-success">Forks: {repo.forks_count}</span>
  //       </div>
  //     </div>
  //   </div>
  // ));

  return (
    <div ref={myRef}>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {/* {repoItems} */}
    </div>
  );
};

export default ProfileGithub;

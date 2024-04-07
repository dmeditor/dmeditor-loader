interface Repository {
  url: string;
  name: string; //eg: '@no/company_name'
}

let repositoryConfig: Array<Repository> = [];

const setRepositories = (config: Array<Repository>) => {
  repositoryConfig = config;
};

export { repositoryConfig, setRepositories };

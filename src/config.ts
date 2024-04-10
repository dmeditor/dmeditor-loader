import { init, registerRemotes } from '@module-federation/enhanced/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import * as dmeditor from 'dmeditor';
interface Repository {
  url: string;
  name: string; //eg: '@no/company_name'
}

let repositoryConfig: Array<Repository> = [];

const initRepositories = (config: Array<Repository>) => {
  repositoryConfig = config;

  init({
    name: 'app',
    remotes: repositoryConfig.map((item) => ({
      name: item.name,
      entry: item.url,
    })),
    shared: {
      react: {
        version: '18.2.0',
        scope: 'default',
        lib: () => React,
        shareConfig: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
      },
      'react-dom': {
        version: '18.2.0',
        scope: 'default',
        lib: () => ReactDOM,
        shareConfig: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
      },
      dmeditor: {
        version: '0.2.0-beta.1',
        scope: 'default',
        lib: () => dmeditor,
        shareConfig: {
          singleton: true,
          requiredVersion: '^0.2.0-beta.1',
        },
      },
    },
  });
};

const updateRepository = (config: Array<Repository>) => {
  repositoryConfig = config;

  registerRemotes(
    repositoryConfig.map((item) => ({
      name: item.name,
      entry: item.url,
    }))
  );
};

export { repositoryConfig, initRepositories, updateRepository };

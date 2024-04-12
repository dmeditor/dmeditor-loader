export * from './config';
export * from './loader';

import { init, loadRemote, registerRemotes } from '@module-federation/enhanced/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

interface Repository {
  url: string;
  name: string; //eg: '@no/company_name'
}

/**
 * 
  {
    "name": "remote2",
    "version": "1.0.0",
    "description": "",
    "exposeName": "main",
    "entry": "remoteEntry.js",
    "widgets": [
      {
        "id": "sample-widget",
        "name": "SampleWidget",
        "version": "1.0.0",
        "previewImage": "http://localhost:3002",
        "description": ""
      }
    ],
    "dependencies": {},
    "engines": {
      "dmeditor": "1.0.0"
    }
  }
 */
interface RepositoryPackage {
  name: string;
  version: string;
  description?: string;
  exposeName?: string;
  entry?: string;
  widgets: Array<{
    id: string;
    name: string;
    version: string;
    previewImage: string;
    description: string;
  }>;
  dependencies: Record<string, string>;
  engines: Record<string, string>;
}

export class RemoteLoaderPlugin {
  _dmeditor: any;
  _repoInitPromise: Promise<any>;

  repositories: Array<Repository>;
  repositoriesPackage: Array<RepositoryPackage & { url: string }> = [];

  constructor(dmeditor: any, repositories: Array<Repository>) {
    this._dmeditor = dmeditor;
    this.repositories = repositories;

    this._repoInitPromise = this.initRepositoriesPackage().then((data: any) => {
      this.repositoriesPackage = data;
      this.initShared();
    });
  }

  initShared() {
    const remotes = this.repositoriesPackage.map((item) => ({
      name: item.name,
      entry: this._joinPath(item.url, item.entry || 'remoteEntry.js'),
    }));

    init({
      name: 'app',
      remotes,
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
          lib: () => this._dmeditor,
          shareConfig: {
            singleton: true,
            requiredVersion: '^0.2.0-beta.1',
          },
        },
      },
    });
  }

  initRepositoriesPackage() {
    return Promise.allSettled(
      this.repositories.map((item) => {
        return fetch(`${item.url}/dmeditor.json`)
          .then((response) => response.json())
          .then((data) => ({
            ...data,
            url: item.url,
          }));
      })
    ).then((data) => {
      return data.map((item: any) => item.value);
    });
  }

  loadWidgets() {
    return this._repoInitPromise.then(() => {
      return this.repositoriesPackage.map((item) => {
        return loadRemote(`${item.name}/${item.exposeName || 'main'}`).then((main: any) => {
          main.default();
        });
      });
    });
  }

  _joinPath(url: string, path: string) {
    if (url[url.length - 1] === '/') {
      url = url.slice(0, -1);
    }
    if (path[0] !== '/') {
      path = '/' + path;
    }
    return url + path;
  }
}

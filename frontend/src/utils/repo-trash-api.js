import axios from 'axios';
import cookie from 'react-cookies';
import { siteRoot } from './constants';

class RepotrashAPI {

  init({ server, username, password, token }) {
    this.server = server;
    this.username = username;
    this.password = password;
    this.token = token;
    if (this.token && this.server) {
      this.req = axios.create({
        baseURL: this.server,
        headers: { 'Authorization': 'Token ' + this.token },
      });
    }
    return this;
  }

  initForSeahubUsage({ siteRoot, xcsrfHeaders }) {
    if (siteRoot && siteRoot.charAt(siteRoot.length - 1) === '/') {
      var server = siteRoot.substring(0, siteRoot.length - 1);
      this.server = server;
    } else {
      this.server = siteRoot;
    }

    this.req = axios.create({
      headers: {
        'X-CSRFToken': xcsrfHeaders,
      }
    });
    return this;
  }

  getRepoFolderTrash(repoID, page, per_page) {
    const url = this.server + '/api/v2.1/repos/' + repoID + '/trash2/';
    let params = {
      page: page || 1,
      per_page: per_page
    };
    return this.req.get(url, { params: params });
  }
}

let repoTrashAPI = new RepotrashAPI();
let xcsrfHeaders = cookie.load('sfcsrftoken');
repoTrashAPI.initForSeahubUsage({ siteRoot, xcsrfHeaders });

export { repoTrashAPI };

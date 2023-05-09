import React, { Suspense } from 'react';
import ReactDom from 'react-dom';
import { SimpleEditor } from '@seafile/sdoc-editor';
import { I18nextProvider } from 'react-i18next';
import i18n from './_i18n/i18n-sdoc-editor';
import { Utils } from './utils/utils';
import Loading from './components/loading';
import InternalLinkDialog from './components/dialog/internal-link-dialog';

const { serviceURL, avatarURL, siteRoot } = window.app.config;
const { username, name } = window.app.userInfo;
const {
  repoID, repoName, parentDir, filePerm,
  docPath, docName, docUuid, seadocAccessToken, seadocServerUrl
} = window.app.pageOptions;

window.seafile = {
  repoID,
  docPath,
  docName,
  docUuid,
  isOpenSocket: true,
  serviceUrl: serviceURL,
  accessToken: seadocAccessToken,
  sdocServer: seadocServerUrl,
  name,
  username,
  avatarURL,
  siteRoot,
  docPerm: filePerm,
  historyURL: Utils.generateHistoryURL(siteRoot, repoID, docPath),
  parentFolderURL: `${siteRoot}library/${repoID}/${Utils.encodePath(repoName + parentDir)}`,
  internalLink: <InternalLinkDialog repoID={repoID} path={docPath} />
};

ReactDom.render(
  <I18nextProvider i18n={ i18n } >
    <Suspense fallback={<Loading />}>
      <SimpleEditor />
    </Suspense>
  </I18nextProvider>,
  document.getElementById('wrapper')
);

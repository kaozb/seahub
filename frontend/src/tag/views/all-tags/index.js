import React, { useEffect, useState, useCallback } from 'react';
import { CenteredLoading } from '@seafile/sf-metadata-ui-component';
import toaster from '../../../components/toast';
import TagsTable from './tags-table';
import View from '../view';
import { TagViewProvider, useTags } from '../../hooks';
import { EVENT_BUS_TYPE, PER_LOAD_NUMBER } from '../../../metadata/constants';
import { Utils } from '../../../utils/utils';
import { PRIVATE_FILE_TYPE } from '../../../constants';
import { getRowById } from '../../../components/sf-table/utils/table';
import { getTagName } from '../../utils';
import { ALL_TAGS_ID } from '../../constants';

import './index.css';

const AllTags = ({ updateCurrentPath, ...params }) => {
  const [displayTag, setDisplayTag] = useState('');
  const [isLoadingMore, setLoadingMore] = useState(false);

  const { isLoading, isReloading, tagsData, store, context } = useTags();

  useEffect(() => {
    const eventBus = context.eventBus;
    eventBus.dispatch(EVENT_BUS_TYPE.RELOAD_DATA);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeDisplayTag = useCallback((tagID = '') => {
    if (displayTag === tagID) return;

    const tag = tagID && getRowById(tagsData, tagID);
    let path = `/${PRIVATE_FILE_TYPE.TAGS_PROPERTIES}/${ALL_TAGS_ID}`;
    if (tag) {
      path += `/${getTagName(tag)}`;
    }
    updateCurrentPath(path);

    setDisplayTag(tagID);
  }, [tagsData, displayTag, updateCurrentPath]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore) return;
    if (!tagsData.hasMore) return;
    setLoadingMore(true);

    try {
      await store.loadMore(PER_LOAD_NUMBER);
      setLoadingMore(false);
    } catch (error) {
      const errorMsg = Utils.getErrorMsg(error);
      toaster.danger(errorMsg);
      setLoadingMore(false);
      return;
    }

  }, [isLoadingMore, tagsData, store]);

  useEffect(() => {
    if (isLoading || isReloading) {
      onChangeDisplayTag();
    }
  }, [isLoading, isReloading, onChangeDisplayTag]);

  if (isLoading || isReloading) return (<CenteredLoading />);

  if (displayTag) {
    return (
      <div className="sf-metadata-all-tags-tag-files">
        <TagViewProvider { ...params } tagID={displayTag} updateCurrentPath={updateCurrentPath} >
          <View />
        </TagViewProvider>
      </div>
    );
  }

  return (
    <div className="sf-metadata-tags-wrapper sf-metadata-all-tags-wrapper">
      <TagsTable
        context={context}
        tagsData={tagsData}
        modifyColumnWidth={store.modifyColumnWidth}
        setDisplayTag={onChangeDisplayTag}
        isLoadingMoreRecords={isLoadingMore}
        loadMore={loadMore}
      />
    </div>
  );
};

export default AllTags;

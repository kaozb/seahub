import React from 'react';
import { gettext } from '../../../../utils/constants';
import { checkIsNameColumn, getColumnByIndex } from '../../../../components/sf-table/utils/column';
import EventBus from '../../../../components/common/event-bus';
import { EVENT_BUS_TYPE } from '../../../../components/sf-table/constants/event-bus-type';
import { PRIVATE_COLUMN_KEY } from '../../../constants';

const OPERATION = {
  EDIT_TAG: 'edit_tag',
  SET_SUB_TAGS: 'set_sub_tags',
  DELETE_TAG: 'delete_tag',
  DELETE_TAGS: 'delete_tags',
};

export const createContextMenuOptions = ({
  context,
  selectedPosition,
  selectedRange,
  columns,
  recordMetrics,
  isGroupView,
  hideMenu,
  recordGetterByIndex,
  recordGetterById,
  onDeleteTags,
}) => {
  const canDeleteTag = context.checkCanDeleteTag();
  const eventBus = EventBus.getInstance();

  const onClickMenuItem = (event, option) => {
    event.stopPropagation();
    switch (option.value) {
      case OPERATION.EDIT_TAG:
      case OPERATION.SET_SUB_TAGS: {
        eventBus.dispatch(EVENT_BUS_TYPE.OPEN_EDITOR);
        break;
      }
      case OPERATION.DELETE_TAG: {
        onDeleteTags(option.tagsIds);
        break;
      }
      case OPERATION.DELETE_TAGS: {
        onDeleteTags(option.tagsIds);
        break;
      }

      default: {
        break;
      }
    }
    hideMenu();
  };

  const getOptions = () => {
    let options = [];

    // handle selected multiple cells
    if (selectedRange) {
      const { topLeft, bottomRight } = selectedRange;
      let tagsIds = [];
      for (let i = topLeft.rowIdx; i <= bottomRight.rowIdx; i++) {
        const tag = recordGetterByIndex({ isGroupView, groupRecordIndex: topLeft.groupRecordIndex, recordIndex: i });
        if (tag && tag._id) {
          tagsIds.push(tag._id);
        }
      }
      if (canDeleteTag && tagsIds.length > 0) {
        if (tagsIds.length === 1) {
          options.push({
            label: gettext('Delete tag'),
            value: OPERATION.DELETE_TAG,
            tagsIds,
          });
        } else {
          options.push({
            label: gettext('Delete tags'),
            value: OPERATION.DELETE_TAGS,
            tagsIds,
          });
        }
      }
      return options;
    }

    const selectedRecordsIds = recordMetrics ? Object.keys(recordMetrics.idSelectedRecordMap) : [];
    if (selectedRecordsIds.length > 1) {
      let tagsIds = [];
      selectedRecordsIds.forEach(id => {
        const tag = recordGetterById(id);
        if (tag && tag._id) {
          tagsIds.push(tag._id);
        }
      });

      if (canDeleteTag && tagsIds.length > 0) {
        options.push({
          label: gettext('Delete tags'),
          value: OPERATION.DELETE_TAGS,
          tagsIds,
        });
      }
      return options;
    }

    // handle selected cell
    if (!selectedPosition) return options;
    const { groupRecordIndex, rowIdx: recordIndex, idx } = selectedPosition;
    const tag = recordGetterByIndex({ isGroupView, groupRecordIndex, recordIndex });
    const column = getColumnByIndex(idx, columns);
    if (!tag || !tag._id || !column) return options;

    if (checkIsNameColumn(column)) {
      options.push({
        label: gettext('Edit tag'),
        value: OPERATION.EDIT_TAG,
      });
    }

    if (column.key === PRIVATE_COLUMN_KEY.SUB_LINKS) {
      options.push({
        label: gettext('Set sub tags'),
        value: OPERATION.SET_SUB_TAGS,
      });
    }

    if (canDeleteTag) {
      options.push({
        label: gettext('Delete tag'),
        value: OPERATION.DELETE_TAG,
        tagsIds: [tag._id],
      });
    }

    return options;
  };

  return getOptions().map((option, index) => {
    return (
      <button
        key={`sf-tag-contextmenu-item-${index}`}
        className='dropdown-item sf-tag-contextmenu-item'
        onClick={(event) => onClickMenuItem(event, option)}
      >
        {option.label}
      </button>
    );
  });
};

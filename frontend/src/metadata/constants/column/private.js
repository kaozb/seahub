export const PRIVATE_COLUMN_KEY = {
  ID: '_id',

  // base key
  CTIME: '_ctime',
  MTIME: '_mtime',
  CREATOR: '_creator',
  LAST_MODIFIER: '_last_modifier',

  IS_DIR: '_is_dir',
  PARENT_DIR: '_parent_dir',
  FILE_CTIME: '_file_ctime',
  FILE_MTIME: '_file_mtime',
  FILE_CREATOR: '_file_creator',
  FILE_MODIFIER: '_file_modifier',
  FILE_NAME: '_name',
  FILE_TYPE: '_file_type',
  FILE_COLLABORATORS: '_collaborators',
  FILE_EXPIRE_TIME: '_expire_time',
  FILE_KEYWORDS: '_keywords',
  FILE_DESCRIPTION: '_description',
  FILE_EXPIRED: '_expired',
  FILE_STATUS: '_status',
  LOCATION: '_location',
  OBJ_ID: '_obj_id',
  SIZE: '_size',
  SUFFIX: '_suffix',
  FILE_DETAILS: '_file_details',
  SHOOTING_TIME: '_shooting_time',
  FILE_REVIEWER: '_reviewer',
  OWNER: '_owner',
};

export const PRIVATE_COLUMN_KEYS = [
  PRIVATE_COLUMN_KEY.ID,
  PRIVATE_COLUMN_KEY.CTIME,
  PRIVATE_COLUMN_KEY.MTIME,
  PRIVATE_COLUMN_KEY.CREATOR,
  PRIVATE_COLUMN_KEY.LAST_MODIFIER,
  PRIVATE_COLUMN_KEY.IS_DIR,
  PRIVATE_COLUMN_KEY.PARENT_DIR,
  PRIVATE_COLUMN_KEY.FILE_CTIME,
  PRIVATE_COLUMN_KEY.FILE_MTIME,
  PRIVATE_COLUMN_KEY.FILE_CREATOR,
  PRIVATE_COLUMN_KEY.FILE_MODIFIER,
  PRIVATE_COLUMN_KEY.FILE_NAME,
  PRIVATE_COLUMN_KEY.FILE_TYPE,
  PRIVATE_COLUMN_KEY.FILE_COLLABORATORS,
  PRIVATE_COLUMN_KEY.FILE_EXPIRE_TIME,
  PRIVATE_COLUMN_KEY.FILE_KEYWORDS,
  PRIVATE_COLUMN_KEY.FILE_DESCRIPTION,
  PRIVATE_COLUMN_KEY.FILE_EXPIRED,
  PRIVATE_COLUMN_KEY.FILE_STATUS,
  PRIVATE_COLUMN_KEY.LOCATION,
  PRIVATE_COLUMN_KEY.OBJ_ID,
  PRIVATE_COLUMN_KEY.SIZE,
  PRIVATE_COLUMN_KEY.SUFFIX,
  PRIVATE_COLUMN_KEY.FILE_DETAILS,
  PRIVATE_COLUMN_KEY.SHOOTING_TIME,
  PRIVATE_COLUMN_KEY.FILE_REVIEWER,
  PRIVATE_COLUMN_KEY.OWNER,
];

export const EDITABLE_PRIVATE_COLUMN_KEYS = [
  PRIVATE_COLUMN_KEY.FILE_COLLABORATORS,
  PRIVATE_COLUMN_KEY.FILE_REVIEWER,
  PRIVATE_COLUMN_KEY.FILE_EXPIRE_TIME,
  PRIVATE_COLUMN_KEY.FILE_KEYWORDS,
  PRIVATE_COLUMN_KEY.FILE_DESCRIPTION,
  PRIVATE_COLUMN_KEY.FILE_EXPIRED,
  PRIVATE_COLUMN_KEY.FILE_STATUS,
  PRIVATE_COLUMN_KEY.SHOOTING_TIME,
];

export const EDITABLE_DATA_PRIVATE_COLUMN_KEYS = [
  PRIVATE_COLUMN_KEY.SHOOTING_TIME,
  PRIVATE_COLUMN_KEY.FILE_STATUS,
];

export const DELETABLE_PRIVATE_COLUMN_KEY = [
  PRIVATE_COLUMN_KEY.FILE_COLLABORATORS,
  PRIVATE_COLUMN_KEY.FILE_REVIEWER,
  PRIVATE_COLUMN_KEY.FILE_EXPIRE_TIME,
  PRIVATE_COLUMN_KEY.FILE_KEYWORDS,
  PRIVATE_COLUMN_KEY.FILE_DESCRIPTION,
  PRIVATE_COLUMN_KEY.FILE_EXPIRED,
  PRIVATE_COLUMN_KEY.FILE_STATUS,
  PRIVATE_COLUMN_KEY.SHOOTING_TIME,
];

import dayjs from 'dayjs';

export const DEFAULT_FORMAT_DATE = 'YYYY-MM-DD HH:MM:SS.sss';

export const setDefaultFormatDate = (value: dayjs.Dayjs | string | null) => {
  if (!value) return '';

  return dayjs(value).format(DEFAULT_FORMAT_DATE);
};

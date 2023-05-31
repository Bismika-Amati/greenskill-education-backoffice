import { Select, SelectProps, Spin } from 'antd';
import debounce from 'lodash/debounce';

type OwnSearchSelectProps = SelectProps & {
  onSearch: (value: string) => void;
  fetching: boolean;
  debounceTimeout?: number;
  options: SelectProps['options'];
};

export const OwnSearchSelect: React.FC<OwnSearchSelectProps> = (props) => {
  const { fetching, options, debounceTimeout = 800, onSearch, ...rest } = props;

  const debounceFetcher = debounce(onSearch, debounceTimeout);

  return (
    <Select
      showSearch
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      {...rest}
    />
  );
};

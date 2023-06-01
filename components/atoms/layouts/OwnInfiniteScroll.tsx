import { Divider, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Props } from 'react-infinite-scroll-component';

type OwnInfiniteScrollProps = Omit<Props, 'loader'> & {
  children: React.ReactNode;
  loader?: Props['loader'];
  height?: number;
  lastPage?: number;
};

export const OwnInfiniteScroll: React.FC<OwnInfiniteScrollProps> = (props) => {
  const { children, loader, height = 400, lastPage = 0, ...rest } = props;

  return (
    <div
      id="scrollableDiv"
      style={{
        height: height,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        loader={loader ?? <Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
        {...(lastPage > 1 && {
          endMessage: <Divider plain>It is all, nothing more 🤐</Divider>,
        })}
        {...rest}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};

import { Row } from 'antd';

type OwnRowProps = {
  children: React.ReactNode;
};

export const OwnRow: React.FC<OwnRowProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Row gutter={[16, 16]}>{children}</Row>
    </>
  );
};

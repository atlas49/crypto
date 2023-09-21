import React from 'react';
import Header from '../Header';
import style from './style.module.scss';

type Props = {
  children: React.ReactNode;
};

const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className={style.pageWrapper}>
      <Header />
      <div className={style.contentWrapper}> {props.children}</div>
    </div>
  );
};
export default Wrapper;

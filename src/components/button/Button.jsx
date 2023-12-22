import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick, isHidden }) => (
  <div className={css.buttonCont}>  
    <button className={css.buttonLoad} onClick={onClick} hidden={isHidden}>
  Load more
</button>  </div>
   
  );


  export { Button };
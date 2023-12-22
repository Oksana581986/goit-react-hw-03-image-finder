import React from 'react';
import css from './ImageGalleryItem.module.css';


const ImageGalleryItem = ({ src, alt }) => (
    <li className={css.galleryItem}>
      <img className={css.galleryImg} src={src} alt={alt} />
    </li>
  );

  export { ImageGalleryItem };
  
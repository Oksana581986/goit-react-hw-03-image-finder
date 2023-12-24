import React, { Component } from 'react';
import { Searchbar } from "components/searchbar/Searchbar";
import { Button } from "components/button/Button";
import { ImageGallery } from "components/imageGallery/ImageGallery";
import { Loader } from "components/loader/Loader";
import { Modal } from "components/modal/Modal";
import axios from "axios";


const API_KEY = "40580008-174d380b9c70d9faabd5ad5fa";
const BASE_URL = 'https://pixabay.com/api/';

export default class AppHTTPRequests extends Component {
 state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    selectedImage: null,
    error: null,
  }


  fetchImages = async () => {
    try {
      const { query, page } = this.state;
      const response = await axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
      this.setState((prevState) => ({
        images: [...prevState.images, ...response.data.hits],
        page: prevState.page + 1,
        }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ error: 'Error fetching images. Please try again.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchImages();
  }


  handleSearch = (newQuery) => {
    this.setState(
      {
      query: newQuery,
      page: 1,
      images: [],
      error: null,
    }, () => {
      this.fetchImages();
    }
    );
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = (src) => {
    this.setState({
      selectedImage: src,
    });
  };

  closeModal = () => {
    this.setState({
      selectedImage: null,
    });
  };


   render () {

        const { images, isLoading, selectedImage, error } = this.state;

        return (
        <div>
        <Searchbar onSubmit={this.handleSearch} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleLoadMore} isHidden={isLoading} />}
        {selectedImage && <Modal onClose={this.closeModal} src={selectedImage} alt="" />}
      </div>         
        );
     } 
}






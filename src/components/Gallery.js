import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import LazyImage from './LazyImage';
import '../styles/Gallery.css';

// Using placeholder images from Unsplash for demo purposes
const galleryImages = [
  { 
    id: 1, 
    src: 'images/gallery/fuji_mountain.jpeg', 
    alt: 'Fuji Mountain', 
    caption: 'Fuji Mountain during my trip to Japan at Jan' 
  },
  { 
    id: 2, 
    src: 'images/gallery/dodgeball.jpeg', 
    alt: 'Dodgeball', 
    caption: 'Joint-Uni Dodgeball Competition at 2021' 
  },
  { 
    id: 3, 
    src: 'images/gallery/ocamp.jpeg', 
    alt: 'Ocamp', 
    caption: 'ELEC OCamp 2024' 
  },
  { 
    id: 4, 
    src: 'images/gallery/graduation.jpeg', 
    alt: 'Graduation', 
    caption: 'Delivering graduation speech at HKUST' 
  },
  { 
    id: 5, 
    src: 'images/gallery/japan_ship.jpeg', 
    alt: 'Japan Ship', 
    caption: 'Waiting for the ship to sail at Kyoto' 
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&w=500&q=60', 
    alt: 'Study Group', 
    caption: 'Working on a weekend project with friends' 
  },
  { 
    id: 7, 
    src: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&w=500&q=60', 
    alt: 'Books on Desk', 
    caption: 'My favorite reads this month' 
  },
  { 
    id: 8, 
    src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&w=500&q=60', 
    alt: 'City Street', 
    caption: 'Exploring the city in my free time' 
  },
  { 
    id: 9, 
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&w=500&q=60', 
    alt: 'Friends Dinner', 
    caption: 'Dinner gathering with friends last weekend' 
  }
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const openModal = (image) => {
    setIsLoading(true);
    setSelectedImage(image);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleModalImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Container className="gallery-container">
      <Row>
        {galleryImages.map((image) => (
          <Col xs={12} sm={6} md={4} className="gallery-item" key={image.id}>
            <div 
              className="gallery-image-container"
              onClick={() => openModal(image)}
            >
              <LazyImage 
                src={image.src} 
                alt={image.alt} 
                className="gallery-image"
                height="250px"
                placeholderColor="#f0f0f0"
              />
              <div className="gallery-caption">
                <p>{image.caption}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Image Modal */}
      <Modal show={selectedImage !== null} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <>
              {isLoading && (
                <div className="modal-loading-spinner">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="modal-image"
                style={{ maxWidth: '100%', display: isLoading ? 'none' : 'block' }}
                onLoad={handleModalImageLoad}
                onError={(e) => {
                  setIsLoading(false);
                  e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=800&q=60"; 
                  e.target.alt = 'Fallback image';
                }}
              />
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Gallery; 
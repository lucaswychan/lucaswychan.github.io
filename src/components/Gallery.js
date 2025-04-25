import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
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
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', 
    alt: 'Study Group', 
    caption: 'Working on a weekend project with friends' 
  },
  { 
    id: 7, 
    src: 'https://images.unsplash.com/photo-1532012197267-da84d127e765', 
    alt: 'Books on Desk', 
    caption: 'My favorite reads this month' 
  },
  { 
    id: 8, 
    src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390', 
    alt: 'City Street', 
    caption: 'Exploring the city in my free time' 
  },
  { 
    id: 9, 
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 
    alt: 'Friends Dinner', 
    caption: 'Dinner gathering with friends last weekend' 
  }
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const openModal = (image) => {
    setSelectedImage(image);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
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
              <img 
                src={image.src} 
                alt={image.alt} 
                className="gallery-image" 
                onError={(e) => {
                  e.target.src =
                      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"; // Fallback image if placeholder is unavailable
                  e.target.alt = 'Fallback image';
                }}
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
        <Modal.Body>
          {selectedImage && (
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="modal-image"
              onError={(e) => {
                e.target.src =
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"; // Fallback image if placeholder is unavailable
                e.target.alt = 'Fallback image';
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Gallery; 
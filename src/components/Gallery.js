import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import '../styles/Gallery.css';

// Using placeholder images from Unsplash for demo purposes
const galleryImages = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', 
    alt: 'Mountain Landscape', 
    caption: 'Weekend hiking in the mountains' 
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1501426029261-8c3e1b42aca6', 
    alt: 'Coffee and Workspace', 
    caption: 'Morning coffee at my favorite spot' 
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 
    alt: 'Beach Sunset', 
    caption: 'Beautiful sunset view from my window' 
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705', 
    alt: 'Home Office Setup', 
    caption: 'My workspace setup for productivity' 
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1484402628941-0bb40fc029e7', 
    alt: 'Breakfast Scene', 
    caption: 'Healthy breakfast - part of my morning routine' 
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
                  e.target.src = '/self_photo.jpg'; // Fallback image if placeholder is unavailable
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
                e.target.src = '/self_photo.jpg'; // Fallback image if placeholder is unavailable
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
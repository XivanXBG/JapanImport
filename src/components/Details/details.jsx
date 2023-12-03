import styles from "./details.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadOfferWithPhoto } from "../../services/carsService";

export default function Details() {
  const { offerId } = useParams();
  const [offer, setOffer] = useState({});
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoaded,setIsLoaded] = useState(false);

  useEffect(() => {
    loadOfferWithPhoto(offerId).then((x) => {setOffer(x);setIsLoaded(true)});
    console.log(offer);
  }, []);

  const handlePhotoClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  
  const handleThumbnailClick = (index) => {
    console.log('clivked');
    console.log(index);
    setCurrentPhotoIndex(index);
  };
  return (
    <div className={styles.wrapper}>
      {modalOpen && (
        <div className={styles.fullScreenModal} onClick={closeModal}>
          <img
            className={styles.fullScreenPhoto}
            src={offer.photos[currentPhotoIndex]}
            alt={offer.make}
          />
        </div>
      )}
      {isLoaded && (
        <div className={styles.detailsCard}>
        <div className={styles.photoWrapper}>
          <div className={styles.header}>
            <div className={styles.price}>
              <h2>
                {offer.make} {offer.model}
              </h2>
              <h2 className={styles.hPrice}>${offer.price}</h2>
            </div>

            <div className={styles.offerInfo}>
              <p>
                <i className="fa-solid fa-location-dot"></i>
                <span> {offer.loc}</span>
              </p>
              <p>
                <i className="fa-solid fa-phone"></i>
                <span>{offer.mobile}</span>
              </p>
            </div>
          </div>
          <div className={styles.photoContainer}>
          <img
            className={styles.photo}
            src={offer.photos[currentPhotoIndex]}
            alt={offer.make}
            onClick={() => handlePhotoClick()}
          />
          </div>
          
          <div className={styles.thumbnailGallery}>
            {offer.photos?.map((photo, index) => (
              <img
                key={index}
                className={styles.thumbnail}
                src={photo}
                alt={`Thumbnail ${index}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
         
        </div>
        <div className={styles.detailsInfo}>
          <h3>Overview</h3>
          <div className={styles.details}>
            <div>
              <label htmlFor="">Category:</label>
              <p>{offer.category}</p>
            </div>
            <div>
              <label htmlFor="">Year:</label>
              <p> {offer.year}</p>
            </div>
            <div>
              <label htmlFor="">Transmission:</label>
              <p> {offer.transmission}</p>
            </div>
          </div>
          <hr />
          <div className={styles.details}>
            <div>
              <label htmlFor="">Kilometers:</label>
              <p>{offer.killometers}</p>
            </div>
            <div>
              <label htmlFor="">Color:</label>
              <p> {offer.color}</p>
            </div>
            <div>
              <label htmlFor="">Engine:</label>
              <p>{offer.engine}</p>
            </div>
          </div>
          <div className={styles.description}>
            <p>{offer.description}</p>
          </div>
        </div>
      </div>
      )}
      
    </div>
  );
}

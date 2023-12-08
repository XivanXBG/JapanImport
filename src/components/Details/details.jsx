import styles from "./details.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  loadOfferWithPhoto,
  deleteOfferById,
} from "../../services/offersService";
import AuthContext from "../../contexts/authContext";
import DeleteModal from "./deleteModal";
import CartContext from "../../contexts/cartContext";

export default function Details() {
  const { offerId } = useParams();
  const [offer, setOffer] = useState({});
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    loadOfferWithPhoto(offerId).then((x) => {
      setOffer(x);
      setIsLoaded(true);
    });
  }, [offerId]);
  useEffect(() => {
  
    if (offer.ownerId === user?.uid) {
      setIsOwner(true);
    }
  }, [offer]);

  const handlePhotoClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteOfferById(offer.id);
    setIsDeleteModalOpen(false);
    navigate("/cars");
  };

  const handleThumbnailClick = (index) => {
    setCurrentPhotoIndex(index);
  };
  const buyHandler = ()=>{
    addToCart(offer)
  }
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
            {isOwner && (
              <div className={styles.ownerButtons}>
                <button
                  type="submit"
                  onClick={() => navigate(`/cars/${offer.id}/edit`)}
                >
                  Edit
                </button>
                <button type="submit" onClick={handleDelete}>
                  Delete
                </button>
                <DeleteModal
                  isOpen={isDeleteModalOpen}
                  onCancel={closeModal}
                  onConfirm={handleConfirmDelete}
                />
              </div>
            )}
            {!isOwner && isAuthenticated && (
              <div className={styles.ownerButtons}>
                <button style={{marginRight:'60px'}} type="submit" onClick={buyHandler}>
                  Buy
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

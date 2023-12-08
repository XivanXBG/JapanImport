
import { useEffect, useState } from "react";
import {
  loadReviews,
  addReviewToFirestore,
  removeReviewById,
} from "../../services/reviewsService";
import StarRating from "./StarRating";
import styles from "./Reviews.module.css";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { toastStyles } from "../toastStyle";
import { toast } from "react-toastify";
import "./starRating.css";

export default function Reviews() {
  const { user, isAuthenticated } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValues, setModalValues] = useState({
    rating: 0,
    review: "",
  });

  useEffect(() => {
    loadReviews().then((x) => setReviews(x));
  }, []);

  const createHandler = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitReview = async () => {
    modalValues.displayName = user.displayName;
    modalValues.photoUrl = user.photoURL;
    modalValues.ownerId = user.uid;
    if (modalValues.review == "") {
      toast.error("Text input is empty", toastStyles);
      return
    }
    const review = await addReviewToFirestore(modalValues);
    setReviews((state) => [review, ...state]);
    setModalValues({ rating: 0, review: "" });
    closeModal();
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      cycleIndex(prevIndex, reviews.length, 1)
    );
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      cycleIndex(prevIndex, reviews.length, -1)
    );
  };

  const cycleIndex = (currentIndex, totalElements, direction = 1) => {
    if (totalElements <= 0) {
      return 0;
    }
    const nextIndex = (currentIndex + direction) % totalElements;
    return nextIndex >= 0 ? nextIndex : totalElements - 1;
  };

  const handleModalChange = (field, value) => {
    setModalValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const deleteHandler = (id) => {
    removeReviewById(id);
    setReviews((state) => state.filter((review) => review.id !== id));
  };
  return (
    <div className={styles.wrapper}>
      {reviews.length > 0 && (
        <div className={styles.reviews}>
          <div className={styles.heading}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1>Reviews</h1>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      star <= calculateAverageRating() ? "selected" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <div className={styles.review}>
            <div className={styles.navButtons}>
              <button type="button" onClick={handlePrevReview}>
                &lt;
              </button>
            </div>

            {reviews
              .slice(currentReviewIndex, currentReviewIndex + 3)
              .map((review, index) => (
                <div key={index} className={styles.content}>
                  <div className={styles.profile}>
                    <img src={review.photoUrl} alt="profilePic" />
                    <div className={styles.stars}>
                      <p>{review.displayName}</p>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${
                              star <= review["rating"] ? "selected" : ""
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div style={{ height: "100%" }}>
                    <p style={{ textAlign: "left", marginLeft: "5px" }}>
                      {review.review}
                    </p>
                  </div>
                  <div className={styles.ownerButtons}>
                    {review.ownerId === user?.uid && (
                      <>
                        <button
                          style={{
                            backgroundColor: "#f44336",
                            borderRadius: "5px",
                            color: "white",
                            padding: "5px",
                            marginBottom: "10px",
                            marginRight: "10px",
                          }}
                          onClick={() => deleteHandler(review.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            <div className={styles.navButtons}>
              <button type="button" onClick={handleNextReview}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
      {reviews.length == 0 && <h1>No reviews found!</h1>}
      {isAuthenticated && (
        <div className={styles.buttons}>
          <button type="button" onClick={createHandler}>
            Create
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Create a Review</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StarRating
                rating={modalValues.rating}
                onChange={(rating) => handleModalChange("rating", rating)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              \
              <textarea
                placeholder="Write your review here..."
                rows="4"
                cols="50"
                onChange={(e) => handleModalChange("review", e.target.value)}
                required
              ></textarea>
            </div>

            <button onClick={handleSubmitReview}>Submit Review</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

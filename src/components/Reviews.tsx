import { getContentReviews } from "../api/requests"
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { ReviewsResponse } from "../types/types";

const Reviews = () => {
    const [reviewData, setReviewData] = useState<ReviewsResponse | null>(null)
    const selectedContent = localStorage.getItem('selectedContent') as string;
    const directedPageID = localStorage.getItem('directedPageID') as string;
    useEffect(() => {
        getContentReviews().then((response)=> setReviewData(response))
      }, [selectedContent, directedPageID])
    console.log(reviewData)
    return (
    <div hidden={reviewData?.total_results === 0}>
        <span className=" text-2xl">Reviews:</span>
        {reviewData?.results.map(review => (
        <div key={review.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '5px'}}>
          {review.author_details.avatar_path ? (
            <Avatar sx={{zIndex: 10}} alt={`${review.author}'s avatar`} src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`} />
          ) : (
            <Avatar>{review.author[0]}</Avatar>
          )}
          <h3 className=" font-bold pb-2" >{review.author}</h3>
          <p hidden={review.author_details.rating === null}><strong>Rating:</strong> {review.author_details.rating}</p>
          <p dangerouslySetInnerHTML={{ __html: review.content }}></p>
          <small><strong>Posted on:</strong> {new Date(review.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
        
    )
}

export default Reviews
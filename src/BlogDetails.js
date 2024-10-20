import { useNavigate, useParams } from 'react-router-dom';
import useFetch from './useFetch';

function BlogDetails() {
  const { id } = useParams(); // Extract the 'id' from the URL
  const { data: blog, isPending, error } = useFetch("http://localhost:8000/blogs/" + id)  
  const navigate = useNavigate()

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, { // Corrected URL with `/`
      method: 'DELETE'
    })
    .then(() => {
      navigate('/') // Navigates after successful delete
    })
    .catch(error => {
      console.error('Error deleting blog:', error); // Handle errors
    });


  }

  return (
    <div className='blog-details'>
        { isPending && <div>Loading...</div> }
        { error && <div> { error } </div> }
        { blog && (
            <article>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
                <div>  { blog.body } </div>  
                <button onClick={handleClick}>delete</button>     
            </article>
        ) }
    </div>
  );
}

export default BlogDetails;

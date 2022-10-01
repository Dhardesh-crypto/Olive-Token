import { useParams } from "react-router-dom";
import BlogList from "./BlogList";
import useSearch from "./useSearch";

const SearchResults = () => {
    const { search } = useParams();
    const {
        data: blogs,
        error,
        isPending,
      } = useSearch('http://localhost:8000/blogs', search);

    console.log(blogs);
    
    return ( 
        <div>
            <h2>Search results</h2>
            { isPending && <div>Loading...</div> }
            { error && <div>Error: { error.message }</div>}
            { blogs && <BlogList blogs={blogs} /> }
        </div>
     );
}
 
export default SearchResults;
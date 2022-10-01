import { useHistory } from "react-router-dom";

const PageNotFound = () => {
    const history = useHistory();

    const handleRedirect = () => {
        setTimeout(() => { history.push('/')}, 2000)
    }

    return ( 
        <div className="not-found">
            <h2>404 - Page not found</h2>
            <p>Redirecting back to home...</p>
            { handleRedirect() }
        </div>
     );
}
 
export default PageNotFound;
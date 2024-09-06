import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <>
          <h2> OOPS!Something went wrong</h2>
          {console.log(err)}
          <p>{err.statusText}</p>
          <p>{err.status}</p>
        </>
    )
}

export default Error;
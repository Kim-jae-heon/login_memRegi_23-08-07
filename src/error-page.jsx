import React from 'react';
import { useRouteError } from 'react-router-dom';

import './css/error-page.css';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-page">
      <section>
        <h1>이런 페이지는 없다구..</h1>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </section>
    </div>
  )
}

export default ErrorPage;
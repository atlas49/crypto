import { createBrowserRouter } from 'react-router-dom';
import Wrapper from '@components/Layout/Wrapper';

import Main from '@pages/Main';

const router = createBrowserRouter([
  {
    path: '/crypto',
    element: (
      <Wrapper>
        <Main />
      </Wrapper>
    ),
  },
]);

export default router;

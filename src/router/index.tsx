import { createHashRouter } from 'react-router-dom';
import Wrapper from '@components/Layout/Wrapper';

import Faq from '@pages/Faq';
import Main from '@pages/Main';
import Support from '@pages/Support';
import Privacy from '@pages/Privacy';
import Partners from '@pages/Partners';
import Guarantees from '@pages/Guarantees';

const router = createHashRouter(
  [
    {
      path: '/crypto',
      element: (
        <Wrapper>
          <Main />
        </Wrapper>
      ),
    },
    {
      path: '/faq',
      element: (
        <Wrapper>
          <Faq />
        </Wrapper>
      ),
    },
    {
      path: '/support',
      element: (
        <Wrapper>
          <Support />
        </Wrapper>
      ),
    },
    {
      path: '/privacy',
      element: (
        <Wrapper>
          <Privacy />
        </Wrapper>
      ),
    },
    {
      path: '/partners',
      element: (
        <Wrapper>
          <Partners />
        </Wrapper>
      ),
    },
    {
      path: '/guarantees',
      element: (
        <Wrapper>
          <Guarantees />
        </Wrapper>
      ),
    },
  ],
  { basename: '/' }
);

export default router;

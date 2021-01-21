/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from 'theme-ui';
import { Global } from '@emotion/core';
import Tableofcontent from './Tableofcontent';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Global
        styles={{
          body: {
            margin: 0,
          },
        }}
      />
      <header
        sx={{
          bg: 'primary',
          color: 'background',
          fontFamily: 'heading',
          p: 3,
          height: '2em',
          textAlign: 'center',
        }}
      >
        gatsby theme docs
      </header>
      <main sx={{ mx: 'auto', maxWidth: '950px', width: '90vw' }}>
        {children}
        <Tableofcontent />
      </main>
    </Fragment>
  );
};

export default Layout;

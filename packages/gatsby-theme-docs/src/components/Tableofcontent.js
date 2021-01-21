/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

const Tableofcontent = () => {
  const data = useStaticQuery(graphql`
    {
      allDocsPage {
        nodes {
          id
          path
          title
        }
      }
    }
  `);
  return (
    <Fragment>
      <ul sx={{ listStyle: 'none' }}>
        {data.allDocsPage.nodes.map((page) => (
          <li key={page.id}>
            <Link
              to={`${page.path}`}
              sx={{
                display: 'flex',
                textDecoration: 'none',
                fontSize: '1.2em',
                color: 'primary',
                '&.active': {
                  color: 'secondary',
                  fontWeight: 'bold',
                },
                '&.active::after': {
                  content: '"(your are visiting this page) "',
                },
              }}
              activeClassName="active"
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Tableofcontent;

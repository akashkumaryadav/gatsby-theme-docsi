const withDefault = require('./utils/default-options');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

/**
 *
 * @param { store } store default
 * @param { options } options if user want to specify other than default loaction for source folder for theme
 */
exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();
  //  get options with default
  const { contentPath } = withDefault(options);

  //  figure out the content path
  const dir = path.join(program.directory, contentPath);
  // if directory does not exist create the
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

/**
 * custom schema for graphql layer for docs pages
 * @param {actions} actions default gatsby actions
 */
exports.createSchemaCustomization = ({ actions }) => {
  // creating custom schema types for graphql layer
  actions.createTypes(`
     type DocsPage implements Node @dontInfer {
        id: ID!
        title : String!
        path: String!
        updated: Date! @dateformat
        body: String!
     }
  `);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  const { basePath } = withDefault(options);
  const parent = getNode(node.parent);
  // only mdx files/nodes are allowed
  if (
    node.internal.type !== 'Mdx' ||
    parent.sourceInstanceName !== 'gatsby-theme-docs'
  ) {
    return;
  }
  // Treact index.mdx link index.html (i.e load docs/ insted of docs/index.html)
  const pageName = parent.name !== 'index' ? parent.name : '';
  actions.createNode({
    id: createNodeId(`DocsPage-${node.id}`),
    title: node.frontmatter.title || parent.name,
    updated: parent.modifiedTime,
    path: path.join('/', basePath, parent.relativeDirectory, pageName),
    parent: node.id,
    internal: {
      type: 'DocsPage',
      contentDigest: node.internal.contentDigest,
    },
  });
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DocsPage: {
      body: {
        type: 'String!',
        resolve: (source, args, context, info) => {
          // loading the resovler for mdx type specially for body field
          const type = info.schema.getType('Mdx');
          const mdxFields = type.getFields();
          const resolver = mdxFields.body.resolve;
          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });
          return resolver(mdxNode, args, context, {
            fieldName: 'body',
          });
        },
      },
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allDocsPage {
        nodes {
          id
          path
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic('error loading docs', error);
  }
  const pages = result.data.allDocsPage.nodes;
  pages.forEach((page) => {
    actions.createPage({
      path: page.path,
      component: require.resolve('./src/templates/docs-page-template.js'),
      context: {
        pageID: page.id,
      },
    });
  });
};

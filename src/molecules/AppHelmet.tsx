import React from 'react';
import { Helmet } from 'react-helmet';

const AppHelmet: React.FC = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Inkle.xyz - Notion Widget Creator and Explorer</title>
    <meta name="title" content="Inkle.xyz - Notion Widget Creator and Explorer" />
    <meta
      name="description"
      content="Level up your notion with 100%
       customizable widgets and seamless setups. Explore community created widgets and customize them for your notion. "
    />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://inkle.xyz/" />
    <meta property="og:title" content="Inkle.xyz - Notion Widget Creator and Explorer" />
    <meta
      property="og:description"
      content="Level up your notion with 100% customizable widgets and seamless setups.
       Explore community created widgets and customize them for your notion. "
    />
    <meta property="og:image" content="https://i.imgur.com/ck7sNN4.png" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://inkle.xyz/" />
    <meta property="twitter:title" content="Inkle.xyz - Notion Widget Creator and Explorer" />
    <meta property="twitter:description" content="Level up your notion with 100% customizable widgets and seamless setups. Explore community created widgets and customize them for your notion. " />
    <meta property="twitter:image" content="https://i.imgur.com/ck7sNN4.png" />
  </Helmet>
);

export default AppHelmet;

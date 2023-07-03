import { SiteConfig, SiteConfigImage } from "./site-config";

interface OGMetaConfig {
  siteConfig: SiteConfig;
  socialImage: SiteConfigImage;
  title: string;
  description: string;
  url: string;
}

export const renderOGMeta = ({
  siteConfig,
  socialImage,
  title,
  description,
  url,
}: OGMetaConfig) => {
  return (
    <>
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={socialImage.absoluteUrl} />
      <meta
        property="og:image:width"
        content={socialImage.width.toString(10)}
      />
      <meta
        property="og:image:height"
        content={socialImage.height.toString(10)}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {siteConfig.twitterSite ? (
        <meta name="twitter:site" content={siteConfig.twitterSite} />
      ) : null}
      <meta name="twitter:creator" content={siteConfig.twitterCreator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={socialImage.absoluteUrl} />
      <meta name="twitter:description" content={description} />
    </>
  );
};

import socialDefaultImg from "./social.png";
export interface SiteConfigImage {
  absoluteUrl: string;
  width: number;
  height: number;
}

export type SiteConfig = {
  name: string;
  domain: string;
  author: string;
  title: string;
  description: string;
  url: string;
  twitterSite?: string;
  twitterCreator: string;
  socialImage: SiteConfigImage;
};

export const siteConfig: SiteConfig = {
  name: "Tip of the Tongue",
  domain: "tip.potato.horse",
  author: "Rafal Pastuszak",
  title: "Tip of the Tongue",
  url: "https://tip.potato.horse",
  description:
    "We are here when your parahippocampal gyrus decreased? We can help!",
  socialImage: {
    absoluteUrl: "https://tip.potato.horse" + socialDefaultImg.src,
    height: socialDefaultImg.height,
    width: socialDefaultImg.width,
  },
  twitterCreator: "@rafalpast",
};

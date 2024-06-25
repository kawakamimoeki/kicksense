const Fuse = require("fuse.js");

interface CosensePage {
  id: number;
  title: string | null;
  created: number;
  updated: number;
  content?: string;
  descriptions?: Array<string>;
  lines?: Array<string>;
  relatedPages: {
    links1hop: Array<CosensePage>;
    links2hop: Array<CosensePage>;
  };
}

interface CosenseData {
  pages: CosensePage[];
  projectName: string;
}

export { CosenseData };

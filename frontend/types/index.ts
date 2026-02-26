export type CaseStudyType = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  clientName?: string;
  image?: any;
  order?: number;
  isActive: boolean;
}

export type AuthorType = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  title: string;
  profileImage: any;
  bio?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
}

export type BlogPostType = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  categories?: string[];
  tags?: string[];
  heroImage?: any;
  featured?: boolean;
  author?: AuthorType;
}

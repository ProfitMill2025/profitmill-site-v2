import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type in ["blogPost", "caseStudy", "whoWeWorkWith"] && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const caseStudySlugsQuery = defineQuery(`
  *[_type == "caseStudy" && isActive == true && defined(slug.current)].slug.current
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    publishedAt,
    categories,
    tags,
    heroImage,
    featured,
    author->{
      name,
      title,
      profileImage
    }
  }
`)

export const allToolsQuery = defineQuery(`
  *[_type == "tool" && isActive == true] | order(coalesce(order, 999) asc, _createdAt desc) {
    _id,
    title,
    type,
    description,
    downloadFile {
      asset-> {
        url,
        originalFilename
      }
    },
    downloadButtonText,
    coverImage,
    tags,
    category,
    fileSize,
    fileFormat,
    lastUpdated,
    featured,
    order
  }
`)

export const allPlaybooksQuery = defineQuery(`
  *[_type == "playbook" && isActive == true] | order(coalesce(order, 999) asc, _createdAt desc) {
    _id,
    title,
    description,
    downloadFile {
      asset-> {
        url,
        originalFilename
      }
    },
    downloadButtonText,
    coverImage,
    industry,
    tags,
    pageCount,
    fileSize,
    lastUpdated,
    featured,
    order
  }
`)

export const allPodcastsQuery = defineQuery(`
  *[_type == "podcast" && isActive == true && defined(spotifyUrl) && spotifyUrl != ""] | order(_createdAt desc) {
    _id,
    title,
    spotifyUrl
  }
`)

export const authorQuery = defineQuery(`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    title,
    profileImage,
    bio,
    linkedinUrl,
    twitterUrl,
    email,
    "blogPosts": *[_type == "blogPost" && references(^._id)] | order(publishedAt desc) {
      _id,
      title,
      subtitle,
      slug,
      publishedAt,
      categories,
      tags,
      heroImage,
      featured
    }
  }
`)

export const authorSlugsQuery = defineQuery(`
  *[_type == "author"].slug.current
`)

export const pageFaqsQuery = defineQuery(`
  *[_type == "pageFaqs" && pageSlug.current == $pageSlug][0] {
    _id,
    pageTitle,
    "pageSlug": pageSlug.current,
    faqs[] {
      question,
      answer,
      defaultOpen
    }
  }
`)

export const pageLogosQuery = defineQuery(`
  *[_type == "pageLogos" && page == $page][0] {
    _id,
    page,
    logoSectionTitle,
    "logos": logos[] {
      name,
      "logoUrl": logo.asset->url
    }
  }
`)

export const whoWeWorkWithQuery = defineQuery(`
  *[_type == "whoWeWorkWith" && slug.current == $slug][0] {
    ...,
    "processedLogos": hero.logos[] {
      name,
      "logoUrl": logo.asset->url
    }
  }
`)

export const whoWeWorkWithSlugsQuery = defineQuery(`
  *[_type == "whoWeWorkWith" && isActive == true].slug.current
`)

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && isActive == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    clientName,
    image,
    order,
    isActive
  }
`)

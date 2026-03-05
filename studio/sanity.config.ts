/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'ce4idxlh'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://profitmill-v2.vercel.app'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() resolves the URL path for different document types
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'blogPost':
      return slug ? `/resources/blog/${slug}` : undefined
    case 'caseStudy':
      return slug ? `/case-studies/${slug}` : undefined
    case 'whoWeWorkWith':
      return slug ? `/who-we-work-with/${slug}` : undefined
    default:
      return undefined
  }
}

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'Profit Mill v2 Site',

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/resources/blog/:slug',
            filter: `_type == "blogPost" && slug.current == $slug`,
          },
          {
            route: '/case-studies/:slug',
            filter: `_type == "caseStudy" && slug.current == $slug`,
          },
          {
            route: '/who-we-work-with/:slug',
            filter: `_type == "whoWeWorkWith" && slug.current == $slug`,
          },
        ]),
        locations: {
          blogPost: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('blogPost', doc?.slug)!,
                },
                homeLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          caseStudy: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('caseStudy', doc?.slug)!,
                },
              ],
            }),
          }),
          whoWeWorkWith: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('whoWeWorkWith', doc?.slug)!,
                },
              ],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure,
    }),
    // Additional plugins
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration
  schema: {
    types: schemaTypes,
  },
})

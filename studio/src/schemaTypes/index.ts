import {blogPost} from './documents/blogPost'
import {author} from './documents/author'
import {caseStudy} from './documents/caseStudy'
import {whoWeWorkWith} from './documents/whoWeWorkWith'
import {tool} from './documents/tool'
import {playbook} from './documents/playbook'
import {podcast} from './documents/podcast'
import {privacyPolicy} from './documents/privacyPolicy'
import {terms} from './documents/terms'
import {pageFaqs} from './documents/pageFaqs'
import {pageLogos} from './documents/pageLogos'

// Export an array of all the schema types. This is used in the Sanity Studio configuration.
export const schemaTypes = [
  // Documents
  blogPost,
  author,
  caseStudy,
  whoWeWorkWith,
  tool,
  playbook,
  podcast,
  privacyPolicy,
  terms,
  pageFaqs,
  pageLogos,
]

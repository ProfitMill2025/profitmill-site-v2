/**
 * Figma-to-Site page mapping reference.
 * Used for copy verification against Figma designs.
 */
export const figmaPageMap = [
  { route: '/', figmaNodeId: '667:2085', figmaPageName: 'desktop-home', contentType: 'Static + FAQ' },
  { route: '/about', figmaNodeId: '668:4590', figmaPageName: 'about', contentType: 'Static' },
  { route: '/paid-ads-pricing', figmaNodeId: '1702:4457', figmaPageName: 'pricing', contentType: 'Static + Table' },
  { route: '/paid-ads-pricing (FAQ)', figmaNodeId: '1540:5746', figmaPageName: 'pricing FAQ', contentType: 'FAQ' },
  { route: '/what-we-do', figmaNodeId: '695:191', figmaPageName: 'what-we-do', contentType: 'Static' },
  { route: '/what-we-do/google-ads', figmaNodeId: '947:3107', figmaPageName: 'google-ads', contentType: 'Static + FAQ' },
  { route: '/what-we-do/google-ads (FAQ)', figmaNodeId: '1686:2382', figmaPageName: 'google-ads FAQ', contentType: 'FAQ' },
  { route: '/what-we-do/linkedin-ads', figmaNodeId: '947:8797', figmaPageName: 'linkedin-ads', contentType: 'Static + FAQ' },
  { route: '/what-we-do/linkedin-ads (FAQ)', figmaNodeId: '1686:3061', figmaPageName: 'linkedin-ads FAQ', contentType: 'FAQ' },
  { route: '/what-we-do/other-channels', figmaNodeId: '947:9836', figmaPageName: 'other-channels', contentType: 'Static + FAQ' },
  { route: '/what-we-do/other-channels (FAQ)', figmaNodeId: '1686:3764', figmaPageName: 'other-channels FAQ', contentType: 'FAQ' },
  { route: '/who-we-work-with', figmaNodeId: '698:5232', figmaPageName: 'who-we-work-with', contentType: 'Static' },
  { route: '/who-we-work-with/b2b-saas', figmaNodeId: '947:10583', figmaPageName: 'b2b-saas', contentType: 'Dynamic (Sanity) + FAQ' },
  { route: '/who-we-work-with/b2b-saas (FAQ)', figmaNodeId: '1686:4994', figmaPageName: 'b2b-saas FAQ', contentType: 'FAQ' },
  { route: '/who-we-work-with/plg', figmaNodeId: '947:11804', figmaPageName: 'PLG', contentType: 'Dynamic (Sanity) + FAQ' },
  { route: '/who-we-work-with/plg (FAQ)', figmaNodeId: '1686:5677', figmaPageName: 'PLG FAQ', contentType: 'FAQ' },
  { route: '/who-we-work-with/services', figmaNodeId: '947:12936', figmaPageName: 'services', contentType: 'Dynamic (Sanity) + FAQ' },
  { route: '/who-we-work-with/services (FAQ)', figmaNodeId: '1686:6366', figmaPageName: 'services FAQ', contentType: 'FAQ' },
  { route: '/case-studies', figmaNodeId: '698:7206', figmaPageName: 'case-studies', contentType: 'Dynamic listing' },
  { route: '/case-studies/[slug]', figmaNodeId: '950:5642', figmaPageName: 'case-study template', contentType: 'Dynamic (static CTAs only)' },
  { route: '/resources/podcasts', figmaNodeId: '947:13878', figmaPageName: 'podcasts', contentType: 'Dynamic listing' },
  { route: '/resources/tools-templates', figmaNodeId: '950:15043', figmaPageName: 'tools-templates', contentType: 'Dynamic listing' },
  { route: '/resources/author/[slug]', figmaNodeId: '1017:17468', figmaPageName: 'author-bio', contentType: 'Dynamic (static CTAs only)' },
  { route: '/resources/alternatives', figmaNodeId: '951:50552', figmaPageName: 'alternatives', contentType: 'Static' },
  { route: '/profit-studio', figmaNodeId: '951:28436', figmaPageName: 'profit-studio', contentType: 'Static' },
  { route: '/privacy-policy', figmaNodeId: '1270:7710', figmaPageName: 'privacy-policy', contentType: 'Dynamic (Sanity)' },
] as const

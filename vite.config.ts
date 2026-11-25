import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const siteUrl = loadEnv(mode, '.').VITE_SITE_URL?.replace(/\/+$/, '')

  return {
    plugins: [react(), {
      name: 'absolute-social-preview-urls',
      transformIndexHtml(html) {
        if (!siteUrl) return html
        return html
          .replaceAll('content="/og-christmas-invitation.png"', `content="${siteUrl}/og-christmas-invitation.png"`)
          .replace('</head>', `    <meta property="og:url" content="${siteUrl}/" />\n  </head>`)
      },
    }],
  }
})

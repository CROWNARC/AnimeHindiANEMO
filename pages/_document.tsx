import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add script to handle chunk loading errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Handle chunk loading errors
              window.addEventListener('error', function(event) {
                // Check if this is a chunk loading error
                if (
                  event.message && (
                    event.message.includes('ChunkLoadError') ||
                    event.message.includes('Loading chunk')
                  )
                ) {
                  console.error('Chunk loading error detected:', event);
                  
                  // Prevent default error handling
                  event.preventDefault();
                  
                  // Clear localStorage cache that might be causing issues
                  try {
                    const keys = Object.keys(localStorage);
                    for (let i = 0; i < keys.length; i++) {
                      const key = keys[i];
                      if (key.startsWith('next-')) {
                        localStorage.removeItem(key);
                      }
                    }
                  } catch (e) {
                    console.error('Failed to clear localStorage:', e);
                  }
                  
                  // Reload the page after a short delay
                  setTimeout(function() {
                    window.location.reload(true);
                  }, 1000);
                }
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
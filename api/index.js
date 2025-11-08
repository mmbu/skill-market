export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  const url = new URL(req.url)
  
  // Главная страница Frame
  if (url.pathname === '/api' || url.pathname === '/api/') {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://farcaster-skill-market.vercel.app/api/image" />
          <meta property="fc:frame:button:1" content="🛒 Купить" />
          <meta property="fc:frame:button:2" content="💼 Заказы" />
          <meta property="fc:frame:button:3" content="➕ Продать" />
          <meta property="og:image" content="https://farcaster-skill-market.vercel.app/api/image" />
        </head>
        <body>
          <h1>Farcaster Skill Market</h1>
          <p>Frame работает!</p>
        </body>
      </html>`,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }
  
  // Изображение для Frame
  if (url.pathname === '/api/image') {
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#6366f1"/>
        <text x="600" y="280" font-family="Arial" font-size="72" fill="white" text-anchor="middle" font-weight="bold">
          Farcaster Skill Market
        </text>
        <text x="600" y="360" font-family="Arial" font-size="36" fill="white" text-anchor="middle">
          Покупайте и продавайте навыки
        </text>
      </svg>
    `
    return new Response(svg, {
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  }
  
  return new Response('Not Found', { status: 404 })
}

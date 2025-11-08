export default function handler(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`)
  
  // Изображение для Frame
  if (pathname === '/api/image') {
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
    res.setHeader('Content-Type', 'image/svg+xml')
    return res.status(200).send(svg)
  }
  
  // Главная страница Frame
  const html = `<!DOCTYPE html>
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
      <h1>Farcaster Skill Market Frame</h1>
      <p>Это работает! 🎉</p>
    </body>
  </html>`
  
  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}

/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'

type Skill = {
  id: string
  title: string
  price: number
  seller: string
}

type Order = {
  id: string
  title: string
  budget: number
  buyer: string
}

const skills: Skill[] = []
const orders: Order[] = []

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: 'Farcaster Skill Market',
  imageOptions: {
    width: 1200,
    height: 630,
  },
})

// Middleware для добавления SDK ready
app.use(async (c, next) => {
  await next()
  
  const res = c.res
  if (res) {
    const originalHeaders = res.headers
    res.headers.set('X-Frame-Options', 'ALLOWALL')
  }
})

app.frame('/', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>🎯</div>
          <div style={{ fontWeight: 'bold', display: 'flex' }}>Skill Market</div>
          <div style={{ fontSize: 30, marginTop: 20, display: 'flex' }}>
            Покупайте и продавайте навыки
          </div>
          <div style={{ fontSize: 24, marginTop: 30, background: 'rgba(255,255,255,0.2)', padding: '10px 30px', borderRadius: 20, display: 'flex' }}>
            Навыков: {skills.length} | Заказов: {orders.length}
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action="/browse-skills">🛒 Купить</Button>,
      <Button action="/browse-orders">💼 Заказы</Button>,
      <Button action="/create-skill">➕ Продать</Button>,
    ],
  })
})

app.frame('/browse-skills', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'flex-start',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '40px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 'bold', color: '#2d3748', marginBottom: 30, display: 'flex' }}>
          🛒 Навыки на продажу
        </div>
        
        {skills.length === 0 ? (
          <div style={{ fontSize: 32, color: '#718096', marginTop: 50, display: 'flex' }}>
            Пока нет навыков. Создайте первый!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            {skills.slice(0, 3).map((skill) => (
              <div
                key={skill.id}
                style={{
                  background: '#f7fafc',
                  padding: '20px',
                  borderRadius: 12,
                  borderLeft: '6px solid #4c51bf',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#2d3748', display: 'flex' }}>
                  {skill.title}
                </div>
                <div style={{ fontSize: 20, color: '#718096', marginTop: 10, display: 'flex' }}>
                  💰 {skill.price} токенов
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    intents: [
      <Button action="/">🏠 Главная</Button>,
      <Button action="/create-skill">➕ Добавить</Button>,
    ],
  })
})

app.frame('/browse-orders', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'flex-start',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '40px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 'bold', color: '#2d3748', marginBottom: 30, display: 'flex' }}>
          💼 Открытые заказы
        </div>
        
        {orders.length === 0 ? (
          <div style={{ fontSize: 32, color: '#718096', marginTop: 50, display: 'flex' }}>
            Пока нет заказов. Создайте первый!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                style={{
                  background: '#fef5e7',
                  padding: '20px',
                  borderRadius: 12,
                  borderLeft: '6px solid #ed8936',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#2d3748', display: 'flex' }}>
                  {order.title}
                </div>
                <div style={{ fontSize: 20, color: '#718096', marginTop: 10, display: 'flex' }}>
                  💵 {order.budget} токенов
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    intents: [
      <Button action="/">🏠 Главная</Button>,
      <Button action="/create-order">📝 Создать</Button>,
    ],
  })
})

app.frame('/create-skill', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #4c51bf, #553c9a)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '40px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 60, color: 'white', marginBottom: 30, display: 'flex' }}>
          ➕ Создать предложение
        </div>
        <div style={{ fontSize: 32, color: 'white', textAlign: 'center', display: 'flex' }}>
          Введите название услуги
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Название услуги..." />,
      <Button action="/create-skill-price">Далее →</Button>,
      <Button action="/">Отмена</Button>,
    ],
  })
})

app.frame('/create-skill-price', (c) => {
  const skillTitle = c.inputText || 'Моя услуга'
  
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #4c51bf, #553c9a)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '40px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 48, color: 'white', marginBottom: 20, display: 'flex' }}>
          💰 Укажите цену
        </div>
        <div style={{ fontSize: 28, color: 'white', textAlign: 'center', marginBottom: 30, display: 'flex' }}>
          {skillTitle}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Цена в токенах" />,
      <Button action={`/create-skill-confirm?title=${encodeURIComponent(skillTitle)}`}>
        Создать ✓
      </Button>,
      <Button action="/">Отмена</Button>,
    ],
  })
})

app.frame('/create-skill-confirm', (c) => {
  const url = new URL(c.req.url)
  const title = url.searchParams.get('title') || 'Услуга'
  const price = parseFloat(c.inputText || '0')
  const fid = c.frameData?.fid || 999
  
  skills.push({
    id: `skill_${Date.now()}`,
    title: title,
    price: price,
    seller: `user_${fid}`,
  })
  
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #48bb78, #38a169)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '40px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 30, display: 'flex' }}>✅</div>
        <div style={{ fontSize: 48, color: 'white', fontWeight: 'bold', marginBottom: 20, display: 'flex' }}>
          Создано!
        </div>
        <div style={{ fontSize: 28, color: 'white', textAlign: 'center', marginBottom: 20, display: 'flex' }}>
          {title}
        </div>
        <div style={{ fontSize: 32, color: 'white', background: 'rgba(255,255,255,0.2)', padding: '15px 40px', borderRadius: 20, display: 'flex' }}>
          💰 {price} токенов
        </div>
      </div>
    ),
    intents: [
      <Button action="/">🏠 Главная</Button>,
      <Button action="/browse-skills">📋 Все навыки</Button>,
    ],
  })
})

app.frame('/create-order', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #ed8936, #dd6b20)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '40px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 60, color: 'white', marginBottom: 30, display: 'flex' }}>
          📝 Создать заказ
        </div>
        <div style={{ fontSize: 32, color: 'white', textAlign: 'center', display: 'flex' }}>
          Что нужно сделать?
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Описание заказа..." />,
      <Button action="/create-order-budget">Далее →</Button>,
      <Button action="/">Отмена</Button>,
    ],
  })
})

app.frame('/create-order-budget', (c) => {
  const orderTitle = c.inputText || 'Мой заказ'
  
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #ed8936, #dd6b20)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '40px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 48, color: 'white', marginBottom: 20, display: 'flex' }}>
          💵 Укажите бюджет
        </div>
        <div style={{ fontSize: 28, color: 'white', textAlign: 'center', marginBottom: 30, display: 'flex' }}>
          {orderTitle}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Бюджет в токенах" />,
      <Button action={`/create-order-confirm?title=${encodeURIComponent(orderTitle)}`}>
        Создать ✓
      </Button>,
      <Button action="/">Отмена</Button>,
    ],
  })
})

app.frame('/create-order-confirm', (c) => {
  const url = new URL(c.req.url)
  const title = url.searchParams.get('title') || 'Заказ'
  const budget = parseFloat(c.inputText || '0')
  const fid = c.frameData?.fid || 999
  
  orders.push({
    id: `order_${Date.now()}`,
    title: title,
    budget: budget,
    buyer: `user_${fid}`,
  })
  
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #48bb78, #38a169)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '40px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 30, display: 'flex' }}>✅</div>
        <div style={{ fontSize: 48, color: 'white', fontWeight: 'bold', marginBottom: 20, display: 'flex' }}>
          Заказ создан!
        </div>
        <div style={{ fontSize: 28, color: 'white', textAlign: 'center', marginBottom: 20, display: 'flex' }}>
          {title}
        </div>
        <div style={{ fontSize: 32, color: 'white', background: 'rgba(255,255,255,0.2)', padding: '15px 40px', borderRadius: 20, display: 'flex' }}>
          💵 {budget} токенов
        </div>
      </div>
    ),
    intents: [
      <Button action="/">🏠 Главная</Button>,
      <Button action="/browse-orders">📋 Все заказы</Button>,
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)

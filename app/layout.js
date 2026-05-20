export const metadata = {
  title: '냉장고를부탁앱',
  description: '냉장고 재료로 레시피 추천',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '냉장고를부탁앱',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/냉부앱.png"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-title" content="냉장고앱"/>
        <meta name="theme-color" content="#0d1b2a"/>
      </head>
      <body style={{margin:0, fontFamily:"'Noto Sans KR', sans-serif"}}>
        {children}
      </body>
    </html>
  )
}

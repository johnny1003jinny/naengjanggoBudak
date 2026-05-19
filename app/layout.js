export const metadata = {
  title: '냉장고를부탁앱',
  description: '냉장고 재료로 레시피 추천',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{margin:0, fontFamily:"'Noto Sans KR', sans-serif"}}>
        {children}
      </body>
    </html>
  )
}

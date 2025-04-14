import Navbar from './Navbar'
import Logo from './Logo'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <div style={{
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem',
        flex: 1
      }}>
        <Logo />
        {children}
      </div>
    </div>
  )
}
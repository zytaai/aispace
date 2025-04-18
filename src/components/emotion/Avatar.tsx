import * as AvatarPrimitive from '@radix-ui/react-avatar'

export default function Avatar({ src, alt, fallback }: { src?: string, alt?: string, fallback?: string }) {
  return (
    <AvatarPrimitive.Root style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '9999px',
      overflow: 'hidden',
      width: '40px',
      height: '40px',
      backgroundColor: '#eee'
    }}>
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <AvatarPrimitive.Fallback delayMs={300}>
          <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>
            {fallback || '?'}
          </span>
        </AvatarPrimitive.Fallback>
      )}
    </AvatarPrimitive.Root>
  )
}
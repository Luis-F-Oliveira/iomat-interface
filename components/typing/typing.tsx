import React from "react"
import './style.css'

interface Props {
  text: string
  speed: number | 50
  repeatDelay: number | 10000
}

export const TypingEffect: React.FC<Props> = ({ text, speed, repeatDelay }) => {
  const [displayedText, setDisplayedText] = React.useState('')
  const [isTyping] = React.useState(true)

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined

    const startTyping = () => {
      let i = 0
      const type = () => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i))
          i++
          timeoutId = setTimeout(type, speed)
        } else {
          timeoutId = setTimeout(() => {
            setDisplayedText('')
            startTyping()
          }, repeatDelay)
        }
      }
      type()
    }

    if (isTyping) {
      startTyping()
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isTyping, text, speed, repeatDelay])

  return <p className="typing-effect">{displayedText}</p>
}
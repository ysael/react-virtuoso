import React, { useRef, useState } from 'react'
import * as ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { Virtuoso } from '../src/'
import faker from 'faker'

interface BubbleProps {
  text: string
  fromUser?: boolean
  className?: string
}

const BubbleWrap = styled.div<{ fromUser?: boolean }>`
  display: flex;
  justify-content: ${({ fromUser }) => fromUser && 'flex-end'};
  width: 100%;
  padding: 12px 0;
`

const Content = styled.div<{ fromUser?: boolean }>`
  background: ${({ fromUser }) => (fromUser ? 'orange' : 'red')};
  color: white;
  width: 60%;
  padding: 12px;
  border-radius: 4px;
  word-break: break-word;
`

function Bubble({ text, fromUser, className }: BubbleProps) {
  return (
    <BubbleWrap fromUser={fromUser} className={className}>
      <Content fromUser={fromUser}>{text}</Content>
    </BubbleWrap>
  )
}

interface ChatListProps {
  messages: { id: string; message: string }[]
  userId: string
  onSend: (message: string) => void
  height?: number
  placeholder?: string
}

const Root = styled.div<{ fromUser?: boolean }>`
  padding: 12px 24px;
`

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-top: 12px;
`

function ChatList({ userId, messages = [], onSend, placeholder }: ChatListProps) {
  const [newMessage, setNewMessage] = useState('')
  const ref = useRef(null)
  const onSendMessage = () => {
    onSend(newMessage)
    setNewMessage('')
  }

  const row = React.useMemo(
    () => (i: number, { message, id }: any) => {
      const fromUser = id === userId
      return <Bubble key={i} fromUser={fromUser} text={message} />
    },
    [userId]
  )

  return (
    <Root
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid red',
      }}
    >
      <Virtuoso
        ref={ref}
        style={{ flex: 1 }}
        initialTopMostItemIndex={messages.length - 1}
        followOutput="smooth"
        itemContent={row}
        data={messages}
      />
      <TextWrapper style={{ flex: 0, minHeight: 30 }}>
        <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder={placeholder} />
        <button onClick={onSendMessage}>send</button>
      </TextWrapper>
    </Root>
  )
}

const data = [...Array(30)].map(_ => ({
  id: faker.random.number({ min: 1, max: 2 }).toString(),
  message: faker.lorem.sentences(),
}))

function App() {
  const [messages, setMessages] = React.useState(data)
  const userId = '1'
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ChatList
        messages={messages}
        userId="1"
        placeholder="Say hi!"
        onSend={message => setMessages(x => [...x, { id: userId, message }])}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

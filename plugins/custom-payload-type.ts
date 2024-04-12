export default definePayloadPlugin(() => {
    definePayloadReducer('BlinkingText', data => data === '<original-blink>' && '_')
    definePayloadReviver('BlinkingText', () => '<revivified-blink>')
  })
  
import Typography from 'typography'

const typography = new Typography({
  googleFonts: [
    { name: 'Noto Sans JP', styles: [ 400 ] }
  ],
})

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography

import { app } from './app'

process.on('uncaughtException', (err) => {
    console.log(err)
    process.exit(1)
})

const PORT = process.env.PORT || 80

app.listen(PORT, () => {
    console.log(`First Hi is Ready to Receive Messages`)
})

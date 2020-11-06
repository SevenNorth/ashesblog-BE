const express = require('express')
const cors = require('cors')

const userRouter=require('./router/user')
const catalogueRouter=require('./router/catalogue')
const articleRouter=require('./router/article')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
  console.log(123)
  res.send('123')
})

app.use('/catalogue',catalogueRouter)
app.use('/user',userRouter)
app.use('/article',articleRouter)

const port = 9527
app.listen(port, () => console.log(`server app listening on port ${port}!`))
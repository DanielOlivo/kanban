import express from "express";
import cors from 'cors'
import { useClient } from "./services/database.service";
import { usersRouter } from "./routes/user.router";
import { boardsRouter } from "./routes/board.router";

const port = process.env.PORT || 3000

async function run(){
    const app = express()
    const { connect } = useClient()
    await connect()

    var corsOptions = {
        origin: ['http://localhost:4200']
    }

    app.use(cors(corsOptions))
    app.use('/users', usersRouter)
    app.use('/board', boardsRouter)

    app.listen(port, () => {
        console.log('http://localhost:' + port)
    })
}

run()
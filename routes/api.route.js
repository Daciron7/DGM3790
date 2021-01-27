import { Router } from 'express'

export const apiRouter = Router()

apiRouter.get('/', (req, res) => {
    res.json({
        status: 'awesomeness',
        name: 'Dcarp',
        averageGamer: true,
        favorites: [
            'Playing with Glaceon',
            'Strasbourgs cooking',
            'I paused my anime to be here'
        ]
    })
})
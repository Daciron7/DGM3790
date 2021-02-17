export const api = ((req, res) => {
    res.json({
        status: 'snowy',
        name: 'Dcarp',
        awesomenessMeter: true,
        likes: [
            'Video Games',
            'Doing internet and web stuff',
            'Building websites and apps'
        ]
    })
})

export const status = ((req, res) => {
    res.json({
        status: 'friendly',
        info: 'Bisko likes this page.'
    })
})
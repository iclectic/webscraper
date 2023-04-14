const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.eurosport.co.uk'
axios(url)
    .then(response => {
        const html = response.data
        try {
            const $ = cheerio.load(html)
            const articles = []

            $('.wrapper', html).each(function() {
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            console.log(articles)
        } catch (error) {
            console.log(`Error scraping HTML: ${error.message}`)
        }
    }).catch(error => {
    if (error.response) {
        console.log(`HTTP error ${error.response.status}: ${error.response.statusText}`)
    } else if (error.request) {
        console.log(`Network error: ${error.request}`)
    } else {
        console.log(`Error: ${error.message}`)
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

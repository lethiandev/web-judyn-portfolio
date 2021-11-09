const fs = require('fs')
const path = require('path')
const parseurl = require('parseurl')

const connect = require('connect')
const serveStatic = require('serve-static')
const livereload = require('livereload')

const port = process.env.PORT || 3000
const public = path.join(__dirname, 'public')

const app = connect()
app.use(serveIndex(public))
app.use(serveStatic(public))

app.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}/`)
})

const lrServer = livereload.createServer()
lrServer.watch(public)

function serveIndex(public) {
  const indexFile = path.join(public, 'index.html')
  const indexPath = ['/', '/index.html']

  return (req, res, next) => {
    const path = parseurl(req).pathname
    if (indexPath.includes(path)) {
      const content = fs.readFileSync(indexFile).toString()
      const decorated = attachLiveReloadScript(content)
      res.end(decorated)
    } else {
      next()
    }
  }
}

function attachLiveReloadScript(content) {
  const src = 'http://localhost:35729/livereload.js?snipver=1'
  const script = `<script src="${src}"></script>`
  return content.replace('</body>', `${script}</body>`)
}

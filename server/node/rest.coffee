require "coffee-script"

express = require "express"
async = require "async"
fs = require "fs"
settings = require "settings"
tokenparser = require "misc/tokenparser"

debug_mode = (settings.server.environment == "debug")

app = express()
app.use express.compress()
app.use express.bodyParser()
#app.use express.session()
#app.use express.csrf()
app.use tokenparser

paths = []
scanDirectory = (dir, cb) ->
  fs.readdir dir, (err,files) ->
    if err
      throw err
    async.each files, (item, next) ->
      if item == "route.js"
        paths.push dir
        next()
        return
      fs.lstat "#{dir}/#{item}", (err, stats) ->
        if err
          throw err
        if stats.isDirectory() && !stats.isSymbolicLink()
          scanDirectory "#{dir}/#{item}", next
          return
        next()
    , (err) ->
      if err
        throw err
      cb()

methods = ["get", "post", "put", "del"]
scanDirectory "./rest", () ->
  async.each paths, (dir, next) ->
    path = ((dir.replace /^\.\/rest/, "").replace /\/\!/g,"/:") + "/?"
    rest = require "#{dir}/route.js"
    for method in methods
      if rest[method] instanceof Function
        if debug_mode
          do (path, rest, method) ->
            app[method] path, (req, res) ->
              console.log "Requesting: #{path}"
              rest[method](req, res)
        else
          app[method] path, rest[method]
    next()
  , (err) ->
    if err
      throw err
    app.listen 82
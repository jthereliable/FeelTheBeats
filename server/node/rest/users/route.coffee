require "coffee-script"

mysql =         require "database/mysql"
requestable =   require "misc/requestable"
__ =            require "underscore"
logger =        require "debug/logger"

get_fields = {
  uid: {
    default_order: true
    sort: 1
  },
  name: {
    queryable: true,
    sort: 1,
    type: "string"
  },
  image: {
  }
  tier: {
    queryable: true,
    sort: -1
  }
  points: {
    sort: -1
  }
  experience: {
    sort: -1
  }
  mod_level: {
    queryable: true
  }
  charter_level: {
    queryable: true
  }
  date_join: {
    sort: 1
    ignore: true
  }
  date_login: {
    ignore: true
  }
}
exports.get = (req, res) ->
  requestable.collection.get req, "Users", null, get_fields, 25, (err, rows) ->
    if(err)
      res.json {
        err: "Database error"
      }
      return
    res.json rows
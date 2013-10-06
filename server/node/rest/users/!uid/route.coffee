require "coffee-script"

mysql =         require "database/mysql"
mongo =         require "database/mongo"
requestable =   require "misc/requestable"
__ =            require "underscore"
logger =        require "debug/logger"
flat =          require "flat"
async =         require "async"

get_fields = {
  uid: {
  }
  name: {
  }
  image: {
  }
  tier: {
  }
  points: {
  }
  experience: {
  }
  mod_level: {
  }
  charter_level: {
  }
  date_join: {
  }
  date_login: {
  }
  "group.gid": {
    tables: [
      {
        table: "GroupMembers"
        on: [
          "Users.uid"
          "GroupMembers.uid"
        ]
      }
      {
        table: "Groups",
        on: [
          "GroupMembers.gid",
          "Groups.gid"
        ]
      }
    ]
    name: "Groups.name"
  }
  "group.name": {
    tables: [
      {
        table: "GroupMembers"
        on: [
          "Users.uid"
          "GroupMembers.uid"
        ]
      }
      {
        table: "Groups"
        on: [
          "GroupMembers.gid"
          "Groups.gid"
        ]
      }
    ]
    name: "Groups.name"
  }
  "group.image": {
    tables: [
      {
        table: "GroupMembers"
        on: [
          "Users.uid"
          "GroupMembers.uid"
        ]
      }
      {
        table: "Groups"
        on: [
          "GroupMembers.gid"
          "Groups.gid"
        ]
      }
    ]
    name: "Groups.image"
  }
  "ratings.reputation": {
    collection: "UserRatings"
    name: "reputation"
  }
  "ratings.rating": {
    collection: "UserRatings"
    name: "rating"
  }
}

exports.get = (req, res) ->
  uid = req.params.uid | 0
  requestable.model.get req, "Users", {uid}, get_fields, (err, row) ->
    if err
      res.json {
        err: "Database error"
      }
    res.json row
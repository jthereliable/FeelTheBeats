
/** ChartRatings indexes **/
db.getCollection("ChartRatings").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** ChartRatings indexes **/
db.getCollection("ChartRatings").ensureIndex({
  "id": NumberLong(1)
},{
  "unique": true
});

/** GroupRequests indexes **/
db.getCollection("GroupRequests").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** GroupRequests indexes **/
db.getCollection("GroupRequests").ensureIndex({
  "gid": NumberLong(1)
},[
  
]);

/** GroupRequests indexes **/
db.getCollection("GroupRequests").ensureIndex({
  "user.uid": NumberLong(1)
},{
  "unique": true
});

/** PostRatings indexes **/
db.getCollection("PostRatings").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** PostRatings indexes **/
db.getCollection("PostRatings").ensureIndex({
  "pid": NumberLong(1)
},{
  "unique": true
});

/** Scores indexes **/
db.getCollection("Scores").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** Scores indexes **/
db.getCollection("Scores").ensureIndex({
  "song.sid": NumberLong(1),
  "song.chart.id": NumberLong(1),
  "user.uid": NumberLong(1),
  "stats.score": NumberLong(-1)
},[
  
]);

/** Scores indexes **/
db.getCollection("Scores").ensureIndex({
  "song.sid": NumberLong(1),
  "song.chart.id": NumberLong(1),
  "user.uid": NumberLong(1)
},{
  "unique": true
});

/** UserBadges indexes **/
db.getCollection("UserBadges").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** UserBadges indexes **/
db.getCollection("UserBadges").ensureIndex({
  "uid": NumberLong(1)
},{
  "unique": true
});

/** UserFavorites indexes **/
db.getCollection("UserFavorites").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** UserFavorites indexes **/
db.getCollection("UserFavorites").ensureIndex({
  "uid": NumberLong(1)
},{
  "unique": true
});

/** UserFollows indexes **/
db.getCollection("UserFollows").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** UserFollows indexes **/
db.getCollection("UserFollows").ensureIndex({
  "uid": NumberLong(1)
},{
  "unique": true
});

/** UserMessages indexes **/
db.getCollection("UserMessages").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** UserMessages indexes **/
db.getCollection("UserMessages").ensureIndex({
  "uid": NumberLong(1)
},{
  "unique": true
});

/** UserPasswordRecoverCodes indexes **/
db.getCollection("UserPasswordRecoverCodes").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** UserPasswordRecoverCodes indexes **/
db.getCollection("UserPasswordRecoverCodes").ensureIndex({
  "uid": NumberLong(1)
},{
  "unique": true
});

/** UserRatings indexes **/
db.getCollection("UserRatings").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** UserRatings indexes **/
db.getCollection("UserRatings").ensureIndex({
  "uid": NumberLong(1)
},{
  "unique": true
});

/** UserRegisterCodes indexes **/
db.getCollection("UserRegisterCodes").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** UserRegisterCodes indexes **/
db.getCollection("UserRegisterCodes").ensureIndex({
  "uid": NumberLong(1)
},{
  "unique": true
});

/** UserTokens indexes **/
db.getCollection("UserTokens").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** UserTokens indexes **/
db.getCollection("UserTokens").ensureIndex({
  "uid": NumberLong(1)
},{
  "unique": true
});

/** ChartRatings records **/
db.getCollection("ChartRatings").insert({
  "_id": ObjectId("51ad1828d34a15bb59a42608"),
  "id": 1,
  "mod_rating": {
    "quality_sum": 1,
    "difficulty_sum": 1,
    "count": 1,
    "ratings": [
      {
        "uid": 1,
        "quality": 8,
        "difficulty": 8
      },
      {
        "uid": 2,
        "quality": 6,
        "difficulty": 2
      }
    ]
  },
  "sid": 1,
  "user_rating": {
    "quality_sum": 1,
    "difficulty_sum": 1,
    "count": 1,
    "ratings": [
      {
        "uid": 1,
        "quality": 8,
        "difficulty": 8
      },
      {
        "uid": 2,
        "quality": 6,
        "difficulty": 2
      }
    ]
  }
});

/** GroupRequests records **/
db.getCollection("GroupRequests").insert({
  "_id": ObjectId("51ad3494d34a15345a4d6ddf"),
  "block": false,
  "gid": 1,
  "user": {
    "uid": 1,
    "name": "SomeName"
  }
});

/** PostRatings records **/
db.getCollection("PostRatings").insert({
  "_id": ObjectId("51ad13aed34a15a059aec99c"),
  "pid": 1,
  "ratings": [
    {
      "uid": 1,
      "rating": 1
    },
    {
      "uid": 2,
      "rating": 1
    },
    {
      "uid": 3,
      "rating": -1
    }
  ]
});

/** Scores records **/
db.getCollection("Scores").insert({
  "_id": ObjectId("51ad16e8d34a15cd59e1624f"),
  "song": {
    "sid": 1,
    "name": "Some song name",
    "chart": {
      "id": 1,
      "name": "Some Chart Name"
    }
  },
  "user": {
    "uid": 1,
    "name": "SomeUserName"
  },
  "stats": {
    "score": 1000,
    "base": 100,
    "completion": 99.99
  },
  "tournament": {
    "id": 1,
    "score": 1000.1
  },
  "cheated": false
});

/** UserBadges records **/
db.getCollection("UserBadges").insert({
  "_id": ObjectId("51ad1930d34a15af59de7817"),
  "uid": 1,
  "badges": [
    {
      "name": "Badge Name",
      "image": "Some Image",
      "timestamp": ISODate("2013-06-03T22:31:12.669Z")
    }
  ]
});

/** UserFavorites records **/
db.getCollection("UserFavorites").insert({
  "_id": ObjectId("51ad1aa6d34a15b959f5f808"),
  "uid": 1,
  "songs": [
    {
      "sid": 1,
      "name": "Some Name",
      "image": "Some Image"
    }
  ]
});

/** UserFollows records **/
db.getCollection("UserFollows").insert({
  "_id": ObjectId("51ad1b2fd34a15a059da4923"),
  "uid": 1,
  "followers": [
    2,
    3,
    4,
    5
  ]
});

/** UserMessages records **/
db.getCollection("UserMessages").insert({
  "_id": ObjectId("51ad31bcd34a15cb59d4255b"),
  "uid": 1,
  "messages": [
    {
      "user": {
        "uid": 1,
        "name": "SomeName",
        "image": "Some Image"
      },
      "message": "some message",
      "timestamp": ISODate("2013-06-04T00:15:56.870Z")
    }
  ]
});

/** UserPasswordRecoverCodes records **/
db.getCollection("UserPasswordRecoverCodes").insert({
  "_id": ObjectId("51ad2ef4d34a15f859da4923"),
  "uid": 1,
  "code": "",
  "expire": ISODate("2013-06-04T00:04:04.577Z")
});

/** UserRatings records **/
db.getCollection("UserRatings").insert({
  "_id": ObjectId("51ad1bc1d34a15f75257bff9"),
  "mod_level": 1,
  "points": 1,
  "rating": -1,
  "reputation": 10,
  "uid": 1
});

/** UserRegisterCodes records **/
db.getCollection("UserRegisterCodes").insert({
  "_id": ObjectId("51ad2f27d34a152e5a253988"),
  "uid": 1,
  "code": ""
});

/** UserTokens records **/
db.getCollection("UserTokens").insert({
  "_id": ObjectId("51ad28dcd34a15da5957b279"),
  "uid": 1,
  "token": "SomeToken"
});

/** system.indexes records **/
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.UserFollows",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.UserFavorites",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.UserBadges",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.UserRatings",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.Scores",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.PostRatings",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.ChartRatings",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.UserTokens",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "pid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.PostRatings",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "pid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "song.sid": NumberLong(1),
    "song.chart.id": NumberLong(1),
    "user.uid": NumberLong(1),
    "stats.score": NumberLong(-1)
  },
  "ns": "ftb3.Scores",
  "background": NumberLong(1),
  "name": "sid_cid_uid_score"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "song.sid": NumberLong(1),
    "song.chart.id": NumberLong(1),
    "user.uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.Scores",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "sid_cid_uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.UserBadges",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.UserFavorites",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.UserFollows",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.UserRatings",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "id": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.ChartRatings",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "cid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.UserTokens",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.UserPasswordRecoverCodes",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.UserPasswordRecoverCodes",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.UserRegisterCodes",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.UserRegisterCodes",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.UserMessages",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.UserMessages",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "_id": NumberInt(1)
  },
  "ns": "ftb3.GroupRequests",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "gid": NumberLong(1)
  },
  "ns": "ftb3.GroupRequests",
  "background": NumberLong(1),
  "name": "gid"
});
db.getCollection("system.indexes").insert({
  "v": NumberInt(1),
  "key": {
    "user.uid": NumberLong(1)
  },
  "unique": true,
  "ns": "ftb3.GroupRequests",
  "dropDups": NumberLong(1),
  "background": NumberLong(1),
  "name": "uid"
});

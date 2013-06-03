
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

/** UserRatings records **/
db.getCollection("UserRatings").insert({
  "_id": ObjectId("51ad1bc1d34a15f75257bff9"),
  "uid": 1,
  "reputation": 10,
  "rating": -1,
  "points": 1
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
    "_id": NumberInt(1)
  },
  "ns": "ftb3.ChartRatings",
  "name": "_id_"
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

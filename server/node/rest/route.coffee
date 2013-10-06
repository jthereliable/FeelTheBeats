require "coffee-script"

exports.get = (req, res) ->
   res.json {
     api: "Feel the Beats Beta 3 REST API"
     version: "0.0.1"
     "easter-egg": "Because nejuer requested this."
   }
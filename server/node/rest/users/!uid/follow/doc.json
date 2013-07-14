{
	"title": "Retrieve user following status (whether current user is following !uid or not)",
	"path": "/users/!uid/followers/?",
	"methods": [
		{
			"method": "post",
			"notes": "Follow user.",
			"parameters": [
				{
					"name": "token",
					"notes": "User token.",
					"required": true
				}
			],
			"success": {
				"notes": "Success output notes",
				"example": {
					"success": true
				}
			},
			"error": {
				"notes": "Error output notes",
				"example": {
					"success": false,
					"error": "error message",
					"code": 1
				}
			}
		},
		{
			"method": "get",
			"notes": "Get following status.",
			"parameters": [
				{
					"name": "token",
					"notes": "User token.",
					"required": true
				}
			],
			"success": {
				"notes": "Success output notes",
				"example": {
					"success": true,
					"following": false
				}
			},
			"error": {
				"notes": "Error output notes",
				"example": {
					"success": false,
					"error": "error message",
					"code": 1
				}
			}
		},
		{
			"method": "delete",
			"notes": "Unfollow user.",
			"parameters": [
				{
					"name": "token",
					"notes": "User token.",
					"required": true
				}
			],
			"success": {
				"notes": "Success output notes",
				"example": {
					"success": true
				}
			},
			"error": {
				"notes": "Error output notes",
				"example": {
					"success": false,
					"error": "error message",
					"code": 1
				}
			}
		}
	]
}
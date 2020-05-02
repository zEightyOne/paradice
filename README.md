# PARADISE
Service which provides simulated dice results for a given # of n-sided dice

###Temporary set up instructions.

1) Install Docker on your machine
2) Run the following: ```docker run -d --name dice-mongo -d mongo:latest -P```
3) From a Mongo client of your choice add ```db: paradice``` and ```collection: dice```
4) From the commandline run ```node server.js```
5) Use the example below to add your first dice (I use postman)


## Routes

```text
POST /dice
```

Validates against the following schema

```json
  schema: {
    body: {
      "type": "object",
        "properties": {
        "name": {
          "type": "string"
          },
            "sides": {
            "type": "array",
              "items": {
                "type": "object",
                "patternProperties": {
                  "^.*$": {
                    "type": "integer"
                    }
                  },
                "additionalProperties": false
              }
            }
          }
        }
      }
    };
```

For example:

```json
{
    "name": "Four-sided Die",
    "sides": [
        {
            "one": 1
        },
        {
            "two": 2
        },
        {
            "three": 3
        },
        {
            "four": 4
        }
    ]
}
```

Successful response:

```json
{
    "id": "5e5b0666267d7589fbd15dad"
}
```
```text
POST /dice/:id
```

Response is validated against the following schema:

```json
   schema: {
    response: {
     200: {
      "type": "object",
        "properties": {
        "name": {
          "type": "string"
          },
            "sides": {
            "type": "array",
              "items": {
                "type": "object",
                "patternProperties": {
                  "^.*$": {
                    "type": "integer"
                    }
                  },
                "additionalProperties": false
              }
            }
          }
        }
      }
    };
```

```
POST /dice/:id
```
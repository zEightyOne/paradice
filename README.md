# PARADISE
Service which provides simulated dice results for a given # of n-sided dice

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

### POST /dice/:id

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
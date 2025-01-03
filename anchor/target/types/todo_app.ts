/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/todo_app.json`.
 */
export type TodoApp = {
  "address": "BU8nAiw1qPvbipixuTcF6APc7PP7SYbhZBSVFjvWVf2h",
  "metadata": {
    "name": "todoApp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "changeTodoStatus",
      "discriminator": [
        255,
        192,
        213,
        219,
        99,
        4,
        34,
        105
      ],
      "accounts": [
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111,
                  95,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "taskId",
          "type": "u64"
        },
        {
          "name": "isCompleted",
          "type": "bool"
        }
      ]
    },
    {
      "name": "createTodo",
      "discriminator": [
        250,
        161,
        142,
        148,
        131,
        48,
        194,
        181
      ],
      "accounts": [
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111,
                  95,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "dueDate",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111,
                  95,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "pda",
          "docs": [
            "CHECK"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111,
                  95,
                  108,
                  105,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "todoList",
      "discriminator": [
        237,
        16,
        56,
        14,
        45,
        138,
        67,
        245
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "dataNotFound",
      "msg": "Data not found"
    }
  ],
  "types": [
    {
      "name": "todoList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "count",
            "type": "u8"
          },
          {
            "name": "todoTasks",
            "type": {
              "vec": {
                "defined": {
                  "name": "todoTask"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "todoTask",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "isCompleted",
            "type": "bool"
          },
          {
            "name": "dueDate",
            "type": "string"
          }
        ]
      }
    }
  ]
};

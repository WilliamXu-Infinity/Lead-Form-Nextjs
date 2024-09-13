/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ta5jmtmnjamkr5g",
    "created": "2024-09-12 04:05:00.344Z",
    "updated": "2024-09-12 04:05:00.344Z",
    "name": "leaderTable",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pslahmi9",
        "name": "firstName",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cojhycch",
        "name": "lastName",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "1cxxpwn2",
        "name": "email",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7aqrjwjk",
        "name": "message",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_Y5uZF5u` ON `leaderTable` (\n  `firstName`,\n  `lastName`,\n  `email`,\n  `message`,\n  `created`,\n  `updated`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ta5jmtmnjamkr5g");

  return dao.deleteCollection(collection);
})

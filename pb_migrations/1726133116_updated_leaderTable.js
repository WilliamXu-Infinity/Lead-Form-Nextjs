/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ta5jmtmnjamkr5g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Y5uZF5u` ON `leaderTable` (\n  `name`,\n  `email`,\n  `message`,\n  `created`,\n  `updated`,\n  `createAt`\n)"
  ]

  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sg87juuv",
    "name": "createAt",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ta5jmtmnjamkr5g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Y5uZF5u` ON `leaderTable` (\n  `name`,\n  `email`,\n  `message`,\n  `created`,\n  `updated`\n)"
  ]

  collection.schema.removeField("sg87juuv")

  return dao.saveCollection(collection)
})

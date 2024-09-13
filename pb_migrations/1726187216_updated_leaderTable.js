/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ta5jmtmnjamkr5g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Y5uZF5u` ON `leaderTable` (\n  `name`,\n  `email`,\n  `message`,\n  `created`,\n  `updated`,\n  `createAt`,\n  `linkedin`,\n  `visaInterest`,\n  `status`,\n  `citizenship`,\n  `resume`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gou005gv",
    "name": "resume",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ta5jmtmnjamkr5g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Y5uZF5u` ON `leaderTable` (\n  `name`,\n  `email`,\n  `message`,\n  `created`,\n  `updated`,\n  `createAt`,\n  `linkedin`,\n  `visaInterest`,\n  `status`,\n  `citizenship`\n)"
  ]

  // remove
  collection.schema.removeField("gou005gv")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ta5jmtmnjamkr5g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_Y5uZF5u` ON `leaderTable` (\n  `name`,\n  `email`,\n  `message`,\n  `created`,\n  `updated`,\n  `createAt`,\n  `linkedin`,\n  `visaInterest`,\n  `status`,\n  `citizenship`\n)"
  ]

  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hut32zzy",
    "name": "status",
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

  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wtycyooc",
    "name": "citizenship",
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
    "CREATE UNIQUE INDEX `idx_Y5uZF5u` ON `leaderTable` (\n  `name`,\n  `email`,\n  `message`,\n  `created`,\n  `updated`,\n  `createAt`\n)"
  ]

  collection.schema.removeField("hut32zzy")

  collection.schema.removeField("wtycyooc")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ta5jmtmnjamkr5g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k4qgzqjp",
    "name": "linkedin",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rpfhrfhk",
    "name": "visaInterest",
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

  // remove
  collection.schema.removeField("k4qgzqjp")

  // remove
  collection.schema.removeField("rpfhrfhk")

  return dao.saveCollection(collection)
})

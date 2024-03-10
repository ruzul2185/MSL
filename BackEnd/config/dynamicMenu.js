const mongoose = require('mongoose');

const dynamicMenu = async () => {
  try{
      const collections = await mongoose.connection.db.listCollections().toArray();
      const collectionNameOne = collections.filter(element => element.name !== "sessions");
      const collectionName = collectionNameOne.filter(element => element.name !== "userprofiles");
      return collectionName.map(collection => ({
          name: collection.name.toUpperCase(),
          add: `Add ${collection.name}`,
          view: `View ${collection.name}`,
          href: collection.name,
      }))
  }catch (err) {
      console.log(err);
  }
};

module.exports = dynamicMenu;

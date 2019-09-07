import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  // fetchUtils,
} from 'react-admin';
import Dexie from 'dexie';


/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */

export default (databaseName, databaseVersion, databaseStores) => {

  const db = new Dexie(databaseName);
  // db.delete();
  db.version(databaseVersion).stores(databaseStores);

  return (type, resource, params) => new Promise((resolve, reject) => {
 
    db.open();
    
    switch (type) {


      case DELETE:

        break;


      case GET_ONE:
        // alert("OK");
        // console.log(db.table(resource).schema.instanceTemplate);
        // alert("OK");
        db.table(resource).get(parseInt(params.id)).then((data) => {
          // console.log(data);
          // alert("OI");
          resolve({ data });
        });


        break;

      case CREATE:

        db.table(resource)
          .add(params.data)
          .then((id) => {
            resolve(params)
          });

        // db.table(this.tableName)
        break;


      case UPDATE:
        // alert("UPDATE");
        // console.log(params);
        // return false;
        db.table(resource).update(params.data.id, params.data).then((updated) => {
          // console.log(updated);
          // alert('update made');
          resolve(params);
        });

        break;

      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:
        db.table(resource).count((count) => {

          let collection = db.table(resource);
          collection
            .offset(0)
            .limit(100)
            .toArray()
            .then((data) => {
              console.log(data);
              resolve({
                data: data,
                total: count,
                page: 1,
                totalCount: count,
              })
            })
        })

        break;



      default:

        break;
    }

  })
}

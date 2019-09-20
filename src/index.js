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
  alert('db online');
  db.version(databaseVersion).stores(databaseStores);

  return (type, resource, params) => new Promise((resolve, reject) => {
 
    db.open();
    
    switch (type) {


      case DELETE:
        db.table(resource).delete(parseInt(params.id)).then((data) => {
          console.log(data);
          alert("OI");
          resolve({ data });
        });
        break;


      case GET_ONE:
        db.table(resource).get(parseInt(params.id)).then((data) => {
          resolve({ data });
        });
        break;

      case CREATE:
        db.table(resource)
          .add(params.data)
          .then((id) => {
            resolve(params)
          });
        break;


      case UPDATE:
        db.table(resource).update(params.data.id, params.data).then((updated) => {
          resolve(params);
        });

        break;

      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        db.table(resource).count((count) => {

          let collection = db.table(resource);
          collection = collection.orderBy(field)
  
          if(order === 'desc'){
            collection = collection.reverse();
          }
          
          collection

          let collection = db.table(resource);
          .offset(params.offset)
          .limit(params.limit)
          .toArray()
            .then((data) => {

              // console.log(data);
              resolve({
                data: data,
                total: count,
                page: page,
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

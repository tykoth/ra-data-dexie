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




const db = new Dexie('APP');



// db.delete();
db.version(1).stores({
  // from 
  people:"++id,first_name,last_name,email,address,zipcode,city,avatar,birthday,first_seen,last_seen,has_ordered,latest_purchase,has_newsletter,groups,nb_commands,total_spent",
  customers:"++id,first_name,last_name,email,address,zipcode,city,avatar,birthday,first_seen,last_seen,has_ordered,latest_purchase,has_newsletter,groups,nb_commands,total_spent",
  categories:"++id,name,parent_id",
  products:"++id,category_id,reference,width,height,price,thumbnail,image,description,stock",
  commands:"++id,reference,date,customer_id,basket,total_ex_taxes,delivery_fees,tax_rate,taxes,total,status,returned",
  invoices:"++id,date,command_id,customer_id,total_ex_taxes,delivery_fees,tax_rate,taxes,total",
  reviews:"++id,date,status,command_id,product_id,customer_id,rating,comment",

  tags:"++id,name,parent_id,published",
  servers: '++id,name,description,ip,hostname,status,operating_system,ssh_port,created,updated',
  todos: '++id,title',
  history:'++id,url,src,alt,href,time',
  galleries:'++id,title,host,url,slug,src,hash',

  users:"++id,name,username,email,avatar,created,updated",
  posts:"++id,title,body,created,updated"
});

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => new Promise((resolve, reject) => {
  console.log([type, resource, params]);
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
         resolve({data});
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
                total:count,
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

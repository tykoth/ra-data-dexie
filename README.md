# ra-data-dexie



## Instalation
```sh
npm install --save ra-data-dexie
```
or
```sh
yarn add ra-data-dexie
```

## Usage

  
```js

import React, { Component } from "react"; 
import ReactDOM from 'react-dom'; 
import { Admin, Resource, ListGuesser, ShowGuesser, EditGuesser } from "react-admin";
import dexieDataProviter from 'ra-data-dexie';

const dataProvider = dexieDataProvider(
	'DATABASE_NAME', 
	1, // database version
	{
		"tableName":"++id,name,text,date,bool"
	}
);

class  App  extends  Component {
	render() {
		return (
			<Admin dataProvider={dataProvider}>
				<Resource name="tableName" list={ListGuesser} />
		</Admin>
		);
	}
}

    ReactDOM.render(<App />, document.getElementById('app'));


```
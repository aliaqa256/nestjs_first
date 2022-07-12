#apis
- /auth/signup {email, password} -> {created: true}
- /auth/signin {email, password} -> {token: string}

- /products/create -> {id, name, price, description, image,} // checks if is unique

- /products/list -> [{id, name, price, description, image,}]

- /products/detail/{id} -> {id, name, price, description, image,}

- /products/update/{id} -> {id, name, price, description, image,}

- /products/delete/{id} 


-category/create -> 

-transactions/create {english ,persian}

//note: 
- translation is implemented in create and detailview of products to show the algorithm of translation
- most of the routes are protected by guards, so only authenticated(superuser) users can access them

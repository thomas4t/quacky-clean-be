## AUTH - USER

### **Register**

TODO

### **Login**

```
POST /auth/login
```

+ `params`: username, password

Example:

`/auth/login?username=johnny&password=twins`

If succesful, it returns a **JWT**:

```
{
    "access_token": "abcd123..."
}
```

... otherwise code 401

---
## CART ITEMS

User has to be logged in (JWT bearer token in request's headers)
```
GET /cart
```

---

## CATEGORIES

- List all categories:

```
GET /categories
```

---

## PRODUCTS

- List all products:

```
 GET /products
```

- List product by `id`

```
 GET /products/<id>
```

- List products by `category`

```
GET /products/category/<id>
```

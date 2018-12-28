# Welcome to acuarela-server

### Required tools
    - Nodejs
    - npm

### Run the project
    1. Clone proyect
    2. inside /acuarela-server folder run ***npm install***
    3. inside /acuarela-server folder run ***node app.js***
    4. That's it! now you can use available endpoints running on port 1234

## Available endpoints

### USER

- **CREATE USER**

    ***url:*** localhost:1234/users
    ***method:*** POST
    ***body:*** raw
    ***body example:***

	   {
			"name": "user name",
			"userName": "userName",
			"birthDate": "1/12/1991",
			"country": "es",
			"email": "user@example.com",
			"password": "123456789"
		}
    ***required values:*** birthDate, country, email, name, password
    ***response example:*** 

       {
          message: 'User created',
          token: 'some_authorization_token',
          data: {
            name: 'user name',
            userName: 'userName'
            email: 'user@example.com',
            country: 'Brazil',
            birthDate: '12-01-1991',
            _id: 'userId'
          }
        }
    
- **GET USER**
	  Get user by _id (returns only certain fields: birthDate, country, email, name)

    ***url:*** localhost:1234/users/:id
    ***method:*** GET
    ***response: example***

	     {
	        "message": "Get user successfully",
	        "user": {
	            "_id": "userId",
	            "birthDate": "1997-04-10",
	            "country": "ar",
	            "description": "hey I am Fran and I have 21 years old, I like design and I love music, my favorite group is Arctic Monkeys yeiiii XDDDDDDDDDDDD",
	            "email": "fran@gmail.com",
	            "name": "francisco",
	            "phoneNumber": "(011) 4578-8956"
	        }
	    }
    
- **LOGIN USER**

    ***url:*** localhost:123/users/login
    ***method:*** POST
    ***body:*** raw
    ***required values:*** email, password
    ***response example:***

	     {
	        "message": "User successfully logged in",
	        "token": "user_token",
	        "data": {
	            "name": "fran@gmail.com",
	            "email": "fran@gmail.com",
	            "country": "us",
	            "birthDate": "2018-12-13",
	            "userName": "fran",
	            "_id": "userId"
	        }
	    }

### ACUAS

- **GET ALL** 
Only authorized user can access to this information.  (returns only certain fields: _id, name, technique, rating)

	***url:*** localhost:1234/acuarelas
	***method:*** GET
	***headers:*** Authorization Beared user_token
	***response example:***

	    [ {
            "_id": "acua_id",
            "name": "the bote",
            "technique": "water with...",
            "rating": 5,
        }, {
            "_id": "acua_id_2",
            "name": "silvestre",
            "technique": "cl",
            "rating": 5
        } ]

- **CREATE ACUA**
Only authorized user can access to this information.

***url:*** localhost:1234/acuarelas
***method:*** POST
***body:*** raw
***body example:***

	    {
	    	"name": "the bote",
	    	"startDate": "12-02-2015",
	    	"endDate": "12-02-2016",
	    	"image": null,
	    	"technique": "water with...",
	    	"material": "paper",
	    	"country": "Australia",
	    	"approved": false,
	    	"rating": 5
    	}
	***headers:*** Authorization Beared user_token
	***response example:***

	     {
            "message": "Acuarela Created successfully",
            "data": {
                "name": "the bote",
                "rating": 5
            }
         }
        

- Update acua (_building_)
- Delete acua (_building_)


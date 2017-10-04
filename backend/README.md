# Who's Hungry API Server

This is the backend API server to handle Who's Hungry requests.

## API Documentation

### User/Profile Actions

#### `/session/create-user`

Takes a `POST` request with potential new user information 

*Data Type:* `"application/json"`

*Data Values:*
* `username`: String representing the username.
* `email`: String representing the email.
* `password`: String representing the password. 

*Returns*
* `response`: Either `ok` or `error` based on if the request worked/was valid.
* `message`: Message depicting what happened, whether good or bad.

### Token Actions

#### `/api-token-auth/`

Takes a `POST` request with user information and returns a JWT Token to authenticate against.

*Data Type:* `"application/json"`

*Data Values:*
* `username`: String representing the username.
* `password`: String representing the password. 

*Returns*
`non_field_errors`: In the case of an invalid request, this is a list of errors that occurred.



### Food Actions


## API Development

Follow the steps below to start developing on the API server.

### With Docker

If you have Docker and Docker Compose installed, you can run the entire application 
using the command below.

```bash
$ make debug
```

### Without Docker

If you are not using Docker, you will need to have `virtualenv` installed.

To develop this server, clone the repo, and move into the `backend` directory.

#### Create the Virtual Environment

Create the virtual environment the Python interpreter will live in.

```bash
$ virtualenv -p python3 venv
```

You can then `source` into the virtual environment to use it.

```bash
$ source venv/bin/activate
```

Then install any dependencies that are needed.

```bash
$ pip install -r requirements.txt
```

#### Running the server

After installing the virtual environment, you can start the server using the 
command below.

```bash
$ make local
```



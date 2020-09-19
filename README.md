# NodeJS REST API template API Documentation

- [FormSpace API REST API Documentation](#formspace-api-rest-api-documentation)
  * [Host](#host)
  * [Headers](#headers)
- [Models](#models)
  * [Organization](#organization)
    + [organization model](#organization-model)
  * [Session](#session)
    + [session model](#session-model)
  * [User](#user)
    + [User model](#user-model)
      - [User parent models](#user-parent-models)
      - [User child models](#user-child-models)
  * [Post](#post)
    + [Post model](#post-model)
      - [Post parent models](#post-parent-models)
      - [Post child models](#post-child-models)
  * [Category](#category)
    + [Category model](#category-model)
      - [Category parent models](#category-parent-models)
      - [Category child models](#category-child-models)
  * [CategoryLog](#category_log)
    + [CategoryLog model](#category_log-model)
      - [CategoryLog parent models](#category_log-parent-models)
  * [PostLog](#post_log)
    + [PostLog model](#post_log-model)
      - [PostLog parent models](#post_log-parent-models)
- [Predefined values](#predefined-values)
  * [LogAction enum](#logaction-enum)
  * [UserType enum](#usertype-enum)
- [Queries](#queries)
  * [Query string parameters](#query-string-parameters)
    + [Sorting](#prisma-sorting)
    + [Filtering](#prisma-filtering)
    + [selecting](#prisma-selecting)

## Host
> http://localhost:3000

## Headers
Header | Value | Description
------------ | ------------- | -------------
Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6MiwibmFtZSI6IkdhbGVubyJ9.M7aiCB-TY9-BzPkk0zN5jsXJMHbbqoXT-zjehyOtMuw |  JWT generated through this APIs authentication endpoint
Content-Type | application/json | Requests body must be JSON

# Models

## Organization
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/organization | Find many profile | Organization | N/A
GET | /api/organization/:id | Find one profile | [[Organization](#organization-model)] | N/A
GET | /api/organization/:id | Find one profile | [[Organization](#organization-model)] | N/A
POST | /api/organization | Create organization | Organization | [Organization](#organization-model) or [[Organization](#organization-model)]
PUT | /api/organization/:id | Edit organization | Organization | [Organization](#organization-model) or [Organization](#organization-model) or [[Organization](#organization-model)]
DELETE | /api/organization/:id | Delete organization | Organization | [Organization](#organization-model)

### organization model
```
model Organization {
  id    String    @default(uuid()) @id
  createdAt DateTime    @default(now()) 
  title String
  description String?
  logo String?
  user User[]
}
```

## Session
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/session | Find many profile | Session | N/A
GET | /api/session/:id | Find one profile | [[Session](#session-model)] | N/A
POST | /api/session | Create session | Session | [Session](#session-model) or [[Session](#session-model)]
PUT | /api/session/:id | Edit session | Session | [Session](#session-model) or [Session](#session-model) or [[Session](#session-model)]
DELETE | /api/session/:id | Delete session | Session | [Session](#session-model)

### session model
```
model Session {
  access_token          String
  createdAt             DateTime @default(now())
  device                String?
  device_info           String?
  id                    String   @id @default(uuid())
  id_token              String
  ip                    String?
  isAlive               Boolean
  refresh_token         String
  refresh_token_expires String?
  userId                String
  user                  User     @relation(fields: [userId], references: [id])
}
```

## User
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/user | Find many user | User | N/A
GET | /api/userCount | Count user | [[User](#user-model)] | N/A
GET | /api/user/:id | Find one user | [[User](#user-model)] | N/A
GET | /api/organization/:id/user | Find user through its parent organization | [[User](#user-model)] | N/A
POST | /api/user | Create user | User | [User](#user-model) or [[User](#user-model)]
PUT | /api/user/:id | Update user | User | [User](#user-model) or [[User](#user-model)]
DELETE | /api/user/:id | Delete user | User | [User](#user-model)

### user model
```
model User {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    authId String?   
    email String  @unique 
    name String   
    picture String?   
    type UserType   
    organizationId String?
    organization  Organization?  @relation(fields: [organizationId], references: [id])
    post Post[]
    session Session[]
}
```

#### user parent models

Models on which User depends on

- [Organization](#organization-model)

#### user child models

Models that depend on User

- [Post](#post-model)
- [Session](#session-model)


## Post
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/post | Find many post | Post | N/A
GET | /api/postCount | Count post | [[Post](#post-model)] | N/A
GET | /api/post/:id | Find one post | [[Post](#post-model)] | N/A
GET | /api/user/:id/post | Find post through its parent user | [[Post](#post-model)] | N/A
POST | /api/post | Create post | Post | [Post](#post-model) or [[Post](#post-model)]
PUT | /api/post/:id | Update post | Post | [Post](#post-model) or [[Post](#post-model)]
DELETE | /api/post/:id | Delete post | Post | [Post](#post-model)

### post model
```
model Post {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    deletedAt DateTime?
    isArchived Boolean @default(false)
    title String   
    description String?   
    body Json?   
    config Json?   
    isPublished Boolean    @default(false) 
    userId String?
    user  User?  @relation(fields: [userId], references: [id])
    post_log PostLog[]
}
```

#### post parent models

Models on which Post depends on

- [User](#user-model)

#### post child models

Models that depend on Post

- [PostLog](#post_log-model)


## Category
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/category | Find many category | Category | N/A
GET | /api/categoryCount | Count category | [[Category](#category-model)] | N/A
GET | /api/category/:id | Find one category | [[Category](#category-model)] | N/A
GET | /api/user/:id/category | Find category through its parent user | [[Category](#category-model)] | N/A
POST | /api/category | Create category | Category | [Category](#category-model) or [[Category](#category-model)]
PUT | /api/category/:id | Update category | Category | [Category](#category-model) or [[Category](#category-model)]
DELETE | /api/category/:id | Delete category | Category | [Category](#category-model)

### category model
```
model Category {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    deletedAt DateTime?
    isArchived Boolean @default(false)
    title String   
    coverURL String   
    userId String?
    user  User?  @relation(fields: [userId], references: [id])
    category_log CategoryLog[]
}
```

#### category parent models

Models on which Category depends on

- [User](#user-model)

#### category child models

Models that depend on Category

- [CategoryLog](#category_log-model)


## CategoryLog
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/category_log | Find many category_log | CategoryLog | N/A
GET | /api/category_logCount | Count category_log | [[CategoryLog](#category_log-model)] | N/A
GET | /api/category_log/:id | Find one category_log | [[CategoryLog](#category_log-model)] | N/A
GET | /api/user/:id/category_log | Find category_log through its parent user | [[CategoryLog](#category_log-model)] | N/A
POST | /api/category_log | Create category_log | CategoryLog | [CategoryLog](#category_log-model) or [[CategoryLog](#category_log-model)]
PUT | /api/category_log/:id | Update category_log | CategoryLog | [CategoryLog](#category_log-model) or [[CategoryLog](#category_log-model)]
DELETE | /api/category_log/:id | Delete category_log | CategoryLog | [CategoryLog](#category_log-model)

### category_log model
```
model CategoryLog {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    action LogAction   
    record Json   
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### category_log parent models

Models on which CategoryLog depends on

- [User](#user-model)


## PostLog
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/post_log | Find many post_log | PostLog | N/A
GET | /api/post_logCount | Count post_log | [[PostLog](#post_log-model)] | N/A
GET | /api/post_log/:id | Find one post_log | [[PostLog](#post_log-model)] | N/A
GET | /api/post/:id/post_log | Find post_log through its parent post | [[PostLog](#post_log-model)] | N/A
GET | /api/user/:id/post_log | Find post_log through its parent user | [[PostLog](#post_log-model)] | N/A
POST | /api/post_log | Create post_log | PostLog | [PostLog](#post_log-model) or [[PostLog](#post_log-model)]
PUT | /api/post_log/:id | Update post_log | PostLog | [PostLog](#post_log-model) or [[PostLog](#post_log-model)]
DELETE | /api/post_log/:id | Delete post_log | PostLog | [PostLog](#post_log-model)

### post_log model
```
model PostLog {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    action LogAction   
    record Json   
    postId String
    post  Post  @relation(fields: [postId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### post_log parent models

Models on which PostLog depends on

- [Post](#post-model)
- [User](#user-model)



# Predefined values


## LogAction enum

- OPEN
- DELETE
- UPDATE
- CREATE

## UserType enum

- OPERATIVO
- ADMIN
- SUPERVISOR

# Queries

This API implements [qs](https://github.com/ljharb/qs) on a middleware to parse query string parameters.  You can use [qs.Stringify](https://github.com/ljharb/qs#stringifying) on your frontend to encode your queries as strings (already implemented in API Client).  Since this project implements [Prisma.io](https://prisma.io) as client to access DB, please refer to the following docs:

## Prisma sorting

- [Prisma sorting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/sorting)

## Prisma filtering

- [Prisma filtering reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/filtering)

## Prisma selecting

- [Prisma selecting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/field-selection)
# Course Platform API

A Spring Boot–based backend for managing structured course content with authentication, enrollment, and progress tracking.

---

## 1. Create PostgreSQL Database

Make sure PostgreSQL is installed and running on your system.

Run the following command in `psql` or your SQL client:

```sql
CREATE DATABASE courseapi;
```

---

## 2. Configure Application Properties

Create this file:

```
src/main/resources/application.properties
```

Add the following configuration:

```properties
spring.application.name=course-platform-api

spring.datasource.url=jdbc:postgresql://localhost:5432/courseapi
spring.datasource.username=postgres
spring.datasource.password=VedangDB@77

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

jwt.secret=de5772cba7d176b14f112dfa950e1e675bb61830b549176c60d2010eae4062b3
```

---

## 3. Build the Project

Use Maven to build the application:

```bash
mvn clean install
```

---

## 4. Run the Application

Start the Spring Boot server:

```bash
mvn spring-boot:run
```

The server will start at:

```
http://localhost:8080
```

---

## 5. Seed Data

On first startup, the database is automatically populated with structured course content from a JSON seed file.

If the database already contains course data, the seeder skips execution.

---

## 6. API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:8080/swagger-ui.html
```

---

## 7. Public Deployment

The application must be deployed publicly with Swagger UI accessible.

**Deployment URL:**  
ADD_YOUR_DEPLOYMENT_URL_HERE

---

## 8. Default Admin Credentials

**Email:**  
admin@email.com

**Password:**  
admin

---

## 9. Example API Endpoints

## API Endpoints

Base URL:
http://localhost:8080


Swagger OpenAPI Docs:
/v3/api-docs


---

### Course Controller

#### Create Topic in Course
POST /api/courses/{id}/topics


#### Enroll in Course
POST /api/courses/{courseId}/enroll


#### Get Subtopics of a Topic
GET /api/courses/topics/{topicId}/subtopics


#### Create Subtopic in Topic
POST /api/courses/topics/{topicId}/subtopics


#### Mark Subtopic as Completed
POST /api/courses/subtopics/{subtopicId}/progress


#### Get All Courses
GET /api/courses/


#### Create Course
POST /api/courses/


#### Get Course by ID
GET /api/courses/{courseId}


#### Get Topics of a Course
GET /api/courses/{courseId}/topics


#### Get Topic by ID
GET /api/courses/topics/{topicId}


#### Get Subtopic by ID
GET /api/courses/subtopics/{subtopicId}


#### Search Courses
GET /api/courses/search?query=your_search_text


---

### Auth Controller

#### Register User
POST /api/auth/register


#### Login User
POST /api/auth/login

---

## 10. Notes

- Course content is read-only and managed through seed data
- Search is case-insensitive and spans across courses, topics, and subtopics
- DTOs are used to prevent infinite recursion caused by bidirectional relationships
- JWT authentication is required for protected endpoints  
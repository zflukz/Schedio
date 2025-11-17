# 🚀 Schedio Backend APIs Documentation

## 📋 สรุป APIs ที่เพิ่มใหม่

### ✅ **Event Management APIs**

#### 1. Create Event

```http
POST /api/events/create
Authorization: Bearer {JWT_TOKEN}
Roles: ORGANIZER, ADMIN
```

**Request Body:**

```json
{
  "title": "Workshop: Introduction to AI",
  "description": "Learn the basics of artificial intelligence",
  "startsAt": "2025-12-01T09:00:00Z",
  "endsAt": "2025-12-01T17:00:00Z",
  "capacity": 50,
  "location": "Building A, Room 101",
  "walkIn": false,
  "activityHour": 8,
  "categories": ["WORKSHOP", "ACADEMIC"],
  "eventBy": "Computer Engineering Department",
  "eventContactEmail": "contact@example.com",
  "eventContactPhone": "0812345678",
  "poster": "https://example.com/poster.jpg",
  "filePdf": "https://example.com/details.pdf"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Event created successfully. Pending approval.",
  "data": {
    "eventId": "uuid",
    "title": "Workshop: Introduction to AI",
    "organizerId": "uuid",
    "organizerName": "john_doe",
    "registeredCount": 0,
    "availableSlots": 50,
    ...
  }
}
```

**Features:**

- ✅ สร้าง Event ใหม่
- ✅ Auto-create Approval record (PENDING status)
- ✅ รองรับ Multiple Categories
- ✅ Validation ครบถ้วน

---

#### 2. Get Event by ID

```http
GET /api/events/{eventId}
Authorization: Not required (Public)
```

**Response:**

```json
{
  "success": true,
  "message": "Event retrieved successfully",
  "data": {
    "eventId": "uuid",
    "title": "Event Title",
    "description": "Event description",
    "startsAt": "2025-12-01T09:00:00Z",
    "endsAt": "2025-12-01T17:00:00Z",
    "capacity": 50,
    "location": "Building A",
    "walkIn": false,
    "activityHour": 8,
    "categories": ["WORKSHOP", "ACADEMIC"],
    "eventBy": "Organizer Name",
    "eventContactEmail": "contact@example.com",
    "eventContactPhone": "0812345678",
    "poster": "url",
    "filePdf": "url",
    "organizerId": "uuid",
    "organizerName": "username",
    "organizerEmail": "email@example.com",
    "createdAt": "2025-11-16T10:00:00Z",
    "updatedAt": "2025-11-16T10:00:00Z",
    "editRequested": false,
    "isDeleted": false,
    "isCancelled": false,
    "registeredCount": 25,
    "availableSlots": 25
  }
}
```

---

#### 3. Get My Events (Organizer)

```http
GET /api/events/my-events
Authorization: Bearer {JWT_TOKEN}
Roles: ORGANIZER, ADMIN
```

**Response:**

```json
{
  "success": true,
  "message": "Your events retrieved successfully",
  "data": [
    {
      "eventId": "uuid",
      "title": "My Event",
      ...
    }
  ]
}
```

**Features:**

- ดู events ที่ตัวเองสร้าง
- ไม่แสดง events ที่ถูกลบ

---

#### 4. Get Approved Events

```http
GET /api/events/approved
Authorization: Not required (Public)
```

**Response:**

```json
{
  "success": true,
  "message": "Approved events retrieved successfully",
  "data": [
    {
      "eventId": "uuid",
      "title": "Approved Event",
      ...
    }
  ]
}
```

**Features:**

- Public API
- แสดงเฉพาะ events ที่ approved แล้ว
- ไม่แสดง events ที่ถูกลบหรือ cancel

---

#### 5. Filter Events (Public)

```http
POST /api/events/filter
Authorization: Not required (Public)
```

**Request Body:**

```json
{
  "search": "workshop",
  "category": ["WORKSHOP", "ACADEMIC"],
  "startDate": "2025-12-01T00:00:00Z",
  "endDate": "2025-12-31T23:59:59Z"
}
```

**Features:**

- Search: title, location, eventBy
- Filter by categories (multiple)
- Filter by date range
- แสดงเฉพาะ approved events

---

#### 6. Update Event

```http
PUT /api/events/update/{eventId}
Authorization: Bearer {JWT_TOKEN}
Roles: ORGANIZER (เฉพาะของตัวเอง), ADMIN
```

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "capacity": 100
}
```

**Features:**

- อัพเดทได้เฉพาะ fields ที่ส่งมา (partial update)
- ตรวจสอบสิทธิ์ (Organizer หรือ Admin)
- ถ้า event approved แล้ว จะ set `editRequested = true`

---

#### 7. Cancel Event

```http
POST /api/events/cancel/{eventId}
Authorization: Bearer {JWT_TOKEN}
Roles: ORGANIZER (เฉพาะของตัวเอง), ADMIN
```

**Response:**

```json
{
  "success": true,
  "message": "Event cancelled successfully",
  "data": null
}
```

**Features:**

- Soft cancel (set `isCancelled = true`)
- ตรวจสอบสิทธิ์

---

#### 8. Delete Event

```http
DELETE /api/events/{eventId}
Authorization: Bearer {JWT_TOKEN}
Roles: ORGANIZER (เฉพาะของตัวเอง), ADMIN
```

**Response:**

```json
{
  "success": true,
  "message": "Event deleted successfully",
  "data": null
}
```

**Features:**

- Soft delete (set `isDeleted = true`)
- ตรวจสอบสิทธิ์

---

### ✅ **Admin User Management APIs**

#### 9. Get All Users

```http
GET /api/admin/users
GET /api/admin/getAll
Authorization: Bearer {JWT_TOKEN}
Roles: ADMIN
```

**Response:**

```json
{
  "success": true,
  "message": "Fetch users success",
  "data": [
    {
      "userID": "uuid",
      "userName": "john_doe",
      "firstName": "John",
      "lastName": "Doe",
      "userEmail": "john@example.com",
      "userRole": "ORGANIZER",
      "userPhone": "0812345678"
    }
  ]
}
```

---

#### 10. Get User by ID

```http
GET /api/admin/users/{userId}
Authorization: Bearer {JWT_TOKEN}
Roles: ADMIN
```

---

#### 11. Change User Role

```http
POST /api/admin/users/role
Authorization: Bearer {JWT_TOKEN}
Roles: ADMIN
```

**Request Body:**

```json
{
  "userId": "uuid",
  "role": "ORGANIZER"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User role updated successfully to ORGANIZER",
  "data": {
    "userID": "uuid",
    "userName": "john_doe",
    "userRole": "ORGANIZER",
    ...
  }
}
```

**Available Roles:**

- `ATTENDEE`
- `ORGANIZER`
- `ADMIN`

---

#### 12. Delete User

```http
DELETE /api/admin/users/{userId}
Authorization: Bearer {JWT_TOKEN}
Roles: ADMIN
```

**Response:**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

---

## 📊 **สรุปการเปลี่ยนแปลง**

### ✅ **DTOs ที่เพิ่มใหม่**

1. `CreateEventDto` - สำหรับสร้าง event
2. `UpdateEventDto` - สำหรับอัพเดท event
3. `EventResponseDto` - สำหรับ response ข้อมูล event
4. `ChangeRoleDto` - สำหรับเปลี่ยน role ของ user

### ✅ **Services ที่อัพเดท**

1. `EventService` - เพิ่ม CRUD operations ครบ
   - `createEvent()` - สร้าง event + approval record
   - `getEventById()` - ดู event ตาม ID
   - `getMyEvents()` - ดู events ของ organizer
   - `getApprovedEvents()` - ดู approved events
   - `updateEvent()` - แก้ไข event
   - `cancelEvent()` - ยกเลิก event
   - `deleteEvent()` - ลบ event (soft delete)
   - `mapToResponseDto()` - แปลง entity เป็น DTO พร้อมข้อมูล registration

### ✅ **Controllers ที่อัพเดท**

1. `EventController` - เพิ่ม endpoints ครบทุก operation
2. `AdminController` - เพิ่ม user management APIs

### ✅ **Database Changes**

- ไม่มี ManyToMany relationship ระหว่าง Users และ Events แล้ว
- ใช้ EventRegistration table แทน
- Events มี `organizerId` เป็น ManyToOne กับ Users
- Approval table สำหรับระบบ approval

---

## 🧪 **วิธีทดสอบ**

### 1. เปิด Swagger UI

```
http://localhost:8080/swagger-ui.html
```

### 2. Login เพื่อรับ JWT Token

```http
POST /login
{
  "usernameOrEmail": "your_username",
  "userPassword": "your_password"
}
```

### 3. ใช้ Token ใน Swagger

1. คลิก "Authorize" ปุ่มด้านบน
2. ใส่ `Bearer YOUR_TOKEN`
3. ทดสอบ APIs ต่างๆ

---

## 🔐 **Authorization Summary**

| Endpoint                     | Public | ATTENDEE | ORGANIZER | ADMIN |
| ---------------------------- | ------ | -------- | --------- | ----- |
| GET /api/events/{id}         | ✅     | ✅       | ✅        | ✅    |
| GET /api/events/approved     | ✅     | ✅       | ✅        | ✅    |
| POST /api/events/filter      | ✅     | ✅       | ✅        | ✅    |
| POST /api/events/create      | ❌     | ❌       | ✅        | ✅    |
| GET /api/events/my-events    | ❌     | ❌       | ✅        | ✅    |
| PUT /api/events/update/{id}  | ❌     | ❌       | ✅\*      | ✅    |
| POST /api/events/cancel/{id} | ❌     | ❌       | ✅\*      | ✅    |
| DELETE /api/events/{id}      | ❌     | ❌       | ✅\*      | ✅    |
| POST /api/registrations/\*\* | ❌     | ✅       | ✅        | ✅    |
| POST /api/approval/\*\*      | ❌     | ❌       | ❌        | ✅    |
| GET /api/admin/\*\*          | ❌     | ❌       | ❌        | ✅    |

_\* ORGANIZER สามารถทำได้เฉพาะ events ของตัวเอง_

---

## 🎯 **Next Steps**

1. ✅ **ทดสอบ APIs ทั้งหมดด้วย Swagger**
2. ✅ **Integration กับ Frontend**
3. ❓ **Forgot Password** (Optional - รอตัดสินใจ)
4. ✅ **Deploy to Production**

---

## 📝 **Notes**

- ทุก API ใช้ `ApiResponse<T>` wrapper เหมือนเดิม
- Event ที่สร้างใหม่จะมี status = PENDING (รอ admin approve)
- การ update event ที่ approved แล้วจะ set `editRequested = true`
- Soft delete ใช้ `isDeleted` และ `isCancelled` flags
- Categories เก็บเป็น comma-separated string ใน database

---

**Generated:** November 16, 2025  
**Branch:** frontend-korn  
**Developer:** GitHub Copilot 🤖

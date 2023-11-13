# Globalsoft_CodeCamp_Fullstack_vol1

Frontend: React

Backend: Node.JS Express

DB: - MySql


# DB scheme:

## user table
 USER 
 ----------
 ID (big integer)
 username (varchar)
 password (varchar)
 timestamps (created_at, updated_at)

## chat table
 CHAT 
 ----------
 ID (big integer)
 name (varchar)
 timestamps (created_at, updated_at)

## pivot table
 CHAT_DETAILS 
 ----------
 ID (big integer)
 user_id (big integer)
 chat_id (big integer)
 message (varchar)
 timestamps (created_at, updated_at) 
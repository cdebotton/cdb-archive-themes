# Migration `20190804100628-add-last-login-to-user-table`

This migration has been generated by Christian de Botton at 8/4/2019, 10:06:28 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "cdb"."User" ADD COLUMN "lastLogin" timestamp(3)   ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190803202608-create-users-table..20190804100628-add-last-login-to-user-table
--- datamodel.dml
+++ datamodel.dml
@@ -11,13 +11,14 @@
   url      = env("POSTGRESQL_URL")
 }
 model User {
-  id        String   @default(cuid()) @unique @id
-  email     String   @unique
+  id        String    @default(cuid()) @unique @id
+  email     String    @unique
   password  String
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+  lastLogin DateTime?
   profile   Profile
 }
 model Profile {
```

## Photon Usage

You can use a specific Photon built for this migration (20190804100628-add-last-login-to-user-table)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190804100628-add-last-login-to-user-table'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
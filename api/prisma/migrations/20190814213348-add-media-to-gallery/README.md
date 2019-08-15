# Migration `20190814213348-add-media-to-gallery`

This migration has been generated by Christian de Botton at 8/14/2019, 9:33:48 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."GalleryMedia" ADD COLUMN "gallery" text   REFERENCES "public"."Gallery"("id") ON DELETE SET NULL,DROP COLUMN "media",ADD COLUMN "media" text   REFERENCES "public"."Media"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Gallery" DROP COLUMN "galleryMedia",DROP COLUMN "author",ADD COLUMN "author" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Media" DROP COLUMN "author",ADD COLUMN "author" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190814183534-make-deleted-optional..20190814213348-add-media-to-gallery
--- datamodel.dml
+++ datamodel.dml
@@ -20,17 +20,18 @@
   lastLogin DateTime?
 }
 model Gallery {
-  id          String   @default(cuid()) @unique @id
-  uri         String   @unique
+  id          String         @default(cuid()) @unique @id
+  uri         String         @unique
   title       String
   description String
+  deleted     Boolean        @default(false)
+  publishedAt DateTime       @default(now())
+  createdAt   DateTime       @default(now())
+  updatedAt   DateTime       @updatedAt
+  media       GalleryMedia[]
   author      User
-  deleted     Boolean  @default(false)
-  publishedAt DateTime @default(now())
-  createdAt   DateTime @default(now())
-  updatedAt   DateTime @updatedAt
 }
 model GalleryMedia {
   id          String   @default(cuid()) @unique @id
```

## Photon Usage

You can use a specific Photon built for this migration (20190814213348-add-media-to-gallery)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190814213348-add-media-to-gallery'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
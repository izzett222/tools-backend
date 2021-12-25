/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "List_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "List_id_name_key" ON "List"("id", "name");

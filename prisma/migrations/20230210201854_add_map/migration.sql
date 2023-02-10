/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rpg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Character";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rpg";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "rpgs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,
    "picture" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "maxLife" INTEGER NOT NULL DEFAULT 0,
    "life" INTEGER NOT NULL DEFAULT 0,
    "maxSanity" INTEGER NOT NULL DEFAULT 0,
    "sanity" INTEGER NOT NULL DEFAULT 0,
    "maxWeight" REAL NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL,
    "rpgId" TEXT NOT NULL,
    CONSTRAINT "characters_rpgId_fkey" FOREIGN KEY ("rpgId") REFERENCES "rpgs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

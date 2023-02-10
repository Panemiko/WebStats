-- CreateTable
CREATE TABLE "Rpg" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Character" (
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
    CONSTRAINT "Character_rpgId_fkey" FOREIGN KEY ("rpgId") REFERENCES "Rpg" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

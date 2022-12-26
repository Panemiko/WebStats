-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "maxLife" INTEGER NOT NULL,
    "life" INTEGER NOT NULL,
    "maxSanity" INTEGER NOT NULL,
    "sanity" INTEGER NOT NULL,
    "maxWeight" DOUBLE PRECISION NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attributeId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterAttribute" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,

    CONSTRAINT "CharacterAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSkill" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "CharacterSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAttribute" ADD CONSTRAINT "CharacterAttribute_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAttribute" ADD CONSTRAINT "CharacterAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ability" ADD CONSTRAINT "Ability_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

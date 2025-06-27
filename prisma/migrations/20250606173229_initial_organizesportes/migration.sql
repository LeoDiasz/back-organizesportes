-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "phoneNumber" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matchs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "modality" TEXT NOT NULL,
    "numberPlayers" INTEGER NOT NULL,
    "numberMaxPlayers" INTEGER NOT NULL,
    "numberMinPlayers" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idOrganization" INTEGER NOT NULL,

    CONSTRAINT "matchs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "rank" TEXT,
    "phoneNumber" TEXT,
    "preferencePosition" TEXT,
    "idMatch" INTEGER NOT NULL,
    "idTeam" INTEGER NOT NULL,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "nameTeam" TEXT NOT NULL,
    "countPlayers" INTEGER NOT NULL,
    "idMatch" INTEGER NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_userId_key" ON "organizations"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "matchs_idOrganization_key" ON "matchs"("idOrganization");

-- CreateIndex
CREATE UNIQUE INDEX "guests_idMatch_key" ON "guests"("idMatch");

-- CreateIndex
CREATE UNIQUE INDEX "guests_idTeam_key" ON "guests"("idTeam");

-- CreateIndex
CREATE UNIQUE INDEX "teams_idMatch_key" ON "teams"("idMatch");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matchs" ADD CONSTRAINT "matchs_idOrganization_fkey" FOREIGN KEY ("idOrganization") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_idMatch_fkey" FOREIGN KEY ("idMatch") REFERENCES "matchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_idTeam_fkey" FOREIGN KEY ("idTeam") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_idMatch_fkey" FOREIGN KEY ("idMatch") REFERENCES "matchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

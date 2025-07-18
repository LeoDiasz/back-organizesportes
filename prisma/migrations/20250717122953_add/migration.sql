/*
  Warnings:

  - Added the required column `duration` to the `matchs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matchs" ADD COLUMN     "duration" INTEGER NOT NULL;

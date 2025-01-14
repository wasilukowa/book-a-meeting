/*
  Warnings:

  - You are about to drop the column `calendarOwnerId` on the `Booking` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `googleID` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `googleToken` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Notification` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `CalendarOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CalendarOwner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkingHours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CalendarOwnerUsers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,userId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `surname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE', 'FACEBOOK', 'GITHUB');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BOOKING_REQUEST', 'BOOKING_CONFIRMATION', 'BOOKING_CANCELLATION', 'BOOKING_REMINDER');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_calendarOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarOptions" DROP CONSTRAINT "CalendarOptions_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarOptions" DROP CONSTRAINT "CalendarOptions_workingHoursId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CalendarOwnerUsers" DROP CONSTRAINT "_CalendarOwnerUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_CalendarOwnerUsers" DROP CONSTRAINT "_CalendarOwnerUsers_B_fkey";

-- DropIndex
DROP INDEX "Credential_userId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "calendarOwnerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "googleID",
DROP COLUMN "googleToken",
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "provider" "AuthProvider" NOT NULL,
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "ownerId",
ADD COLUMN     "bookingId" INTEGER NOT NULL,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "type" "NotificationType" NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "surname" VARCHAR(255) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "CalendarOptions";

-- DropTable
DROP TABLE "CalendarOwner";

-- DropTable
DROP TABLE "WorkingHours";

-- DropTable
DROP TABLE "_CalendarOwnerUsers";

-- CreateTable
CREATE TABLE "CalendarSettings" (
    "id" SERIAL NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "workingDays" JSONB NOT NULL,
    "exceptions" JSONB,
    "userId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slotDuration" INTEGER NOT NULL DEFAULT 60,
    "bookingLeadTime" INTEGER NOT NULL DEFAULT 24,
    "maxBookingsPerDay" INTEGER,

    CONSTRAINT "CalendarSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CalendarSettings_userId_key" ON "CalendarSettings"("userId");

-- CreateIndex
CREATE INDEX "Booking_ownerId_idx" ON "Booking"("ownerId");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_date_startTime_endTime_idx" ON "Booking"("date", "startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_provider_userId_key" ON "Credential"("provider", "userId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarSettings" ADD CONSTRAINT "CalendarSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('FEMALE', 'MALE');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('CREW', 'STUDENT');

-- CreateEnum
CREATE TYPE "occupation" AS ENUM ('CAMP_LEADER', 'WEEK_LEADER', 'DOCTOR', 'PSYCHOLOGIST', 'TEACHER', 'ENGLISH_TEACHER', 'SMALL_TEACHER', 'SQUIRREL', 'SMALL_SQUIRREL', 'BUFE', 'GUEST', 'CAMPER');

-- CreateEnum
CREATE TYPE "topic" AS ENUM ('ENGLISH', 'VIDEOGRAPHER', 'GAMER', 'PROGRAMER', 'ROBOTICS', 'DRONE', 'GAMES', 'PHOTOGRAPHER', 'CRAFTSMAN', 'SCIENTIST', 'COOKING', 'ACTOR', 'SPORT', 'DANCER', 'PRINTING_3D', 'BROKER', 'WRITER', 'AI', 'ASTRONOMER', 'DOZEN');

-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "public_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender" "gender" NOT NULL,
    "role" "role" NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application" (
    "id" SERIAL NOT NULL,
    "member_pid" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "occupation" "occupation" NOT NULL,
    "topic" "topic",

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_public_id_key" ON "member"("public_id");

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_member_pid_fkey" FOREIGN KEY ("member_pid") REFERENCES "member"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;


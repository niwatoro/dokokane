/*
  Warnings:

  - You are about to drop the `Statement` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[securities_code]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `average_age` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `average_annual_salary` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `net_sales` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_employees` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operating_income` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_title` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_url` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Statement" DROP CONSTRAINT "Statement_company_id_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "average_age" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "average_annual_salary" INTEGER NOT NULL,
ADD COLUMN     "net_sales" BIGINT NOT NULL,
ADD COLUMN     "number_of_employees" INTEGER NOT NULL,
ADD COLUMN     "operating_income" BIGINT NOT NULL,
ADD COLUMN     "source_title" TEXT NOT NULL,
ADD COLUMN     "source_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Statement";

-- CreateIndex
CREATE UNIQUE INDEX "Company_securities_code_key" ON "Company"("securities_code");

-- CreateEnum
CREATE TYPE "public"."PreorderStatus" AS ENUM ('PENDING_VERIFICATION', 'VERIFIED', 'INVOICED', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Preorder" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "bottles" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "status" "public"."PreorderStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "verifyTokenHash" TEXT,
    "verifyExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Preorder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invoice" (
    "id" TEXT NOT NULL,
    "preorderId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "unitPriceCents" INTEGER NOT NULL,
    "totalCents" INTEGER NOT NULL,
    "paypalLink" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'sent',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_preorderId_key" ON "public"."Invoice"("preorderId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "public"."Invoice"("number");

-- AddForeignKey
ALTER TABLE "public"."Preorder" ADD CONSTRAINT "Preorder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_preorderId_fkey" FOREIGN KEY ("preorderId") REFERENCES "public"."Preorder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

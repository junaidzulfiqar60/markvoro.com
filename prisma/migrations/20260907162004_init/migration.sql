-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'QUALIFIED', 'CONVERTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('WEBSITE', 'CONTACT_FORM', 'WHATSAPP', 'AI_AGENT', 'OTHER');

-- CreateEnum
CREATE TYPE "AgentType" AS ENUM ('AI Sales Agent', 'AI Customer Support Agent', 'AI WhatsApp Agent', 'AI Booking Agent', 'AI Receptionist', 'Custom AI Agent', 'Business Automation');

-- CreateEnum
CREATE TYPE "PreferredCommunication" AS ENUM ('EMAIL', 'PHONE', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED');

-- CreateEnum
CREATE TYPE "PortfolioCategory" AS ENUM ('Website Development', 'Digital Marketing', 'Branding', 'AI Automation', 'AI Agents');

-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('Digital Marketing', 'Web Development', 'Branding', 'AI Solutions');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactLead" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessName" TEXT,
    "selectedService" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "source" "LeadSource" NOT NULL DEFAULT 'CONTACT_FORM',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceInquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessName" TEXT,
    "service" TEXT NOT NULL,
    "budget" TEXT,
    "projectDetails" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIAgentInquiry" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessName" TEXT,
    "industry" TEXT NOT NULL,
    "agentType" "AgentType" NOT NULL,
    "currentProcess" TEXT,
    "businessProblem" TEXT NOT NULL,
    "estimatedMonthlyCustomers" TEXT,
    "preferredCommunication" "PreferredCommunication" NOT NULL DEFAULT 'EMAIL',
    "message" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIAgentInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "SubscriberStatus" NOT NULL DEFAULT 'ACTIVE',
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "PortfolioCategory" NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "clientName" TEXT,
    "projectUrl" TEXT,
    "thumbnail" TEXT,
    "images" TEXT[],
    "technologies" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientCompany" TEXT NOT NULL,
    "clientImage" TEXT,
    "testimonial" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "category" "ServiceCategory" NOT NULL,
    "features" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "ContactLead_status_idx" ON "ContactLead"("status");

-- CreateIndex
CREATE INDEX "ContactLead_createdAt_idx" ON "ContactLead"("createdAt");

-- CreateIndex
CREATE INDEX "ServiceInquiry_status_idx" ON "ServiceInquiry"("status");

-- CreateIndex
CREATE INDEX "ServiceInquiry_createdAt_idx" ON "ServiceInquiry"("createdAt");

-- CreateIndex
CREATE INDEX "AIAgentInquiry_status_idx" ON "AIAgentInquiry"("status");

-- CreateIndex
CREATE INDEX "AIAgentInquiry_createdAt_idx" ON "AIAgentInquiry"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioProject_slug_key" ON "PortfolioProject"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_title_key" ON "Service"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

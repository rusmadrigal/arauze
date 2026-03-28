# 🧱 Arauze.com – Project Structure & Setup Guide

## 🪶 Overview
This document serves as a quick reference for maintaining and scaling the **Arauze.com** project.  
It summarizes the stack, folder structure, commands, and conventions used across the app and CMS.

---

## ⚙️ Stack Overview
| Layer | Technology |
|--------|-------------|
| **Frontend** | Next.js 14 (App Router, Turbopack) |
| **Language** | TypeScript (.tsx) |
| **Styling** | TailwindCSS |
| **CMS** | Sanity v3 (Embedded Studio) |
| **Database (planned)** | Supabase (for feedback and stats) |
| **Charts** | Chart.js + react-chartjs-2 |
| **Animations** | Framer Motion |
| **Hosting** | Vercel |

---

## 🗂️ Folder Structure

/arauze/
│
├── sanity/ # Sanity CMS (embedded)
│ ├── schemaTypes/ # Schemas: homeSettings, codeEntry, faq, guide
│ ├── sanity.config.ts # Main Sanity configuration
│ ├── structure.ts # Custom Studio structure
│ ├── env.ts # Sanity environment variables
│ └── deskPreview.tsx # Optional live preview
│
├── src/ # Next.js application
│ ├── app/
│ │ ├── layout.tsx
│ │ ├── page.tsx # Homepage
│ │ ├── raccomandata/
│ │ │ ├── page.tsx # Code list page
│ │ │ └── [code]/page.tsx # Single page per raccomandata code
│ │ └── guide/[slug]/page.tsx
│ │
│ ├── components/
│ │ ├── layout/ # Layout and global UI
│ │ ├── home/ # Homepage components
│ │ ├── raccomandata/ # Code detail and list UI
│ │ ├── shared/ # Shared utilities
│ │ └── ui/ # Generic UI elements (Button, Card, Badge)
│ │
│ ├── lib/
│ │ ├── sanity/
│ │ │ ├── client.ts # Sanity client setup
│ │ │ └── queries.ts # GROQ queries
│ │ └── utils/ # Misc. helpers and calculations
│ │
│ ├── styles/
│ │ └── globals.css # Tailwind base styles
│ │
│ └── types/ # Shared TypeScript types
│
├── public/
│ ├── icons/
│ ├── images/
│ └── og/ # Open Graph / social preview images
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── PROJECT_STRUCTURE.md # (this file)
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## Minimalist Commerce

Phase 1 establishes the technical foundation for a modern Arabic/English e-commerce application.

## Stack

React, TypeScript, Vite, Tailwind CSS v4, Shadcn UI primitives, React Router, Firebase, and Cloudinary.

## Setup

1. Copy `.env.example` to `.env.local` and provide Firebase and Cloudinary values.
2. Install dependencies with `npm install`.
3. Start development with `npm run dev`.

## Commands

`npm run dev` starts Vite.
`npm run build` runs TypeScript and the production build.
`npm run lint` runs ESLint.
`npm run typecheck` runs TypeScript without emitting files.

## Structure

`src/components` contains shared UI primitives. `src/contexts` owns theme and locale state. `src/lib` contains Firebase and Cloudinary boundaries. `src/routes` defines navigation. `src/types` contains shared domain contracts.

The current phase is documented in `CURRENT_PHASE.md`; business features intentionally remain placeholders until later phases.

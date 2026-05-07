# 🎓 SISTEMA DE GESTÃO ESCOLAR (SGE) - SKILL COMPLETA

## 🎯 IDENTIDADE
Nome: SGE Cada Base
GitHub: https://github.com/0211200224/sgecada
Supabase: eyzxbacfdbfxwlumgrby.supabase.co (RLS ativo)

## 🏗️ STACK RÍGIDA
Backend: NestJS + TypeORM + BullMQ
Frontend: Next.js 14+ App Router + Tailwind
DB: Supabase PostgreSQL

## 🔒 MULTI-TENANT OBRIGATÓRIO
- school_id uuid em TODAS tabelas escolares
- RLS: current_setting('app.current_school_id') = school_id

## 👥 ROLES
PlatformAdmin → Director → Professor → Estudante

## 📂 ESTRUTURA
backend/src/auth/ users/ tenants/ students/
frontend/app/dashboard/director/ teacher/ student/

## FASES
1. Database + Tenants
2. Auth + RBAC  
3. Students + Grades
4. Payments
5. Reports + Email

## .env
DATABASE_URL=postgresql://postgres.Vagabond@123@@:aws-0-eu-west-1.pooler.supabase.com:5432/postgres
SUPABASE_URL=https://eyzxbacfdbfxwlumgrby.supabase.co
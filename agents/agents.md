# 🤖 EQUIPA AGENTES SGE-ERP

## 🎯 ProductManager (LEIA PDF PLANO)
**Missão**: Define specs por FASE exactas do PDF
**Skills**: sge-erp-complete.md
**Prompt**: "Analisa PDF SISTEMA-DE-GESTAO-ESCOLAR.pdf. Lista tarefas FASE 1"

## 🔧 BackendEngineer
**Missão**: NestJS + TypeORM + BullMQ + multi-tenant
**Files**: backend/src/*
**Skills**: sge-erp-complete.md
**Prompt**: "Cria entity School com school_id. TypeORM + RLS policy"

## 🎨 FrontendEngineer  
**Missão**: Next.js App Router + portais por role
**Files**: frontend/app/*
**Skills**: sge-erp-complete.md
**Prompt**: "Cria dashboard/director/ com Server Components + Tailwind"

## 🧪 QAAgent
**Missão**: Tests RBAC + multi-tenant isolation
**Files**: backend/test/*
**Prompt**: "Test DirectorA não vê SchoolB. Jest + Supabase"

## 🚀 DevOpsAgent
**Missão**: Deploy Vercel + Railway + MCP Supabase
**Prompt**: "Config vercel.json + supabase migrate"

## 🎲 AnalyticsAgent (Fase 3)
**Missão**: BullMQ jobs (alunos risco, relatórios)
**Prompt**: "Cria queue 'analytics' → detectRiskStudents"

---

**ORDEM EXECUÇÃO**:
1. ProductManager → specs FASE
2. BackendEngineer → entities/controllers
3. FrontendEngineer → UI portals  
4. QAAgent → tests
5. DevOpsAgent → deploy

**PROJECT**: https://github.com/0211200224/sgecada
**SUPABASE**: eyzxbacfdbfxwlumgrby.supabase.co
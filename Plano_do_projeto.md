SISTEMA DE GESTÃO ESCOLAR (SGE) — PLANO COMPLETO 
1. VISÃO GERAL DO PRODUTO 
O sistema será uma plataforma ERP escolar modular, multi-tenant e analítica, desenhada para 
escolas em Moçambique. 
Ele integra: 
• Gestão académica completa  
• Gestão financeira  
• Recursos humanos  
• Analytics educacional avançado  
• Comunicação automática (email)  
• Relatórios inteligentes com gráficos  
• Sistema de permissões rigoroso  
• Portal do estudante  
2. ARQUITECTURA GERAL DO SISTEMA 
2.1 Tipo de arquitectura 
• Modular Monolith (fase inicial)  
• Preparado para microserviços (fase futura)  
• Event-driven (desde o início)  
2.2 Stack tecnológica 
Backend 
• NestJS (Node.js)  
• PostgreSQL (Supabase)  
• Redis (cache + filas)  
• BullMQ (jobs assíncronos)  
Frontend 
• Next.js (React)  
• PWA (mobile-friendly)  
• Chart.js / ECharts  
Storage 
• Supabase Storage (S3 compatível)  
Email 
• Resend API (event-driven)  
2.3 Arquitectura de fluxo 
Frontend → API NestJS → Módulos → Events → Queue → Services → DB / Email / Storage 
3. MULTI-TENANT (ESCOLAS) 
Cada escola é isolada: 
• school_id em todas as tabelas  
• isolamento lógico  
• possível expansão SaaS  
4. SISTEMA DE UTILIZADORES E PERMISSÕES 
4.1 Hierarquia 
Platform Admin (global) 
• cria escolas  
• cria utilizadores  
• gere sistema global  
• NÃO executa operações escolares  
Dentro da escola: 
• Director  
• Secretaria Académica  
• Pedagógico  
• Financeiro  
• RH  
• Professor  
• Estudante  
4.2 Modelo de segurança 
• RBAC (Role Based Access Control)  
• Permissões por módulo + ação  
• Escopo por escola + turma + disciplina  
5. PORTAIS DO SISTEMA 
5.1 Portal do Director 
• Dashboard executivo  
• KPIs da escola  
• performance académica geral  
• relatórios financeiros  
• aprovação de decisões  
5.2 Portal da Secretaria Académica 
• matrícula de alunos  
• gestão de turmas  
• documentação escolar  
• histórico académico  
• transferência de alunos  
5.3 Portal Pedagógico 
• criação de disciplinas  
• associação professor ↔ turma  
• gestão de avaliações  
• análise pedagógica  
• supervisão de desempenho  
5.4 Portal de Professores 
• lançamento de notas  
• presenças  
• configuração de fórmulas de avaliação  
• relatórios de alunos  
5.5 Portal Financeiro 
• propinas  
• pagamentos  
• multas  
• relatórios financeiros  
• controlo de dívidas  
5.6 Portal de RH 
• funcionários  
• salários  
• descontos  
• horas extras  
• folhas salariais automáticas  
5.7 Portal de Configuração 
• classes  
• disciplinas  
• regras da escola  
• modelos de avaliação  
• regras financeiras  
• regras salariais  
5.8 Portal do Estudante 
• notas  
• média  
• ranking  
• relatórios  
• situação financeira  
• reclamações  
• feedback de professores  
6. MÓDULO DE ANALYTICS (CORE DO SISTEMA) 
6.1 Ranking de estudantes 
• por turma  
• por classe  
• geral da escola  
• por disciplina  
6.2 Dashboards gráficos 
• evolução de notas  
• barras por disciplina  
• pizza de desempenho  
• tendências temporais  
6.3 Insights automáticos 
• aluno em risco  
• queda de desempenho  
• disciplina problemática  
• turma com baixa performance  
6.4 Indicadores institucionais 
• taxa de aprovação  
• taxa de reprovação  
• assiduidade  
• performance docente  
7. SISTEMA DE RELATÓRIOS INTELIGENTES 
7.1 Relatório do estudante (central) 
Versão dinâmica (web) 
• gráficos interactivos  
• evolução académica  
• desempenho por disciplina  
• ranking  
• feedback  
Versão PDF (oficial) 
• snapshot imutável  
• gerado por período  
• enviado por email  
• arquivado no sistema  
7.2 Conteúdo do relatório 
• dados académicos  
• gráficos (barras, linha, pizza)  
• comportamento  
• habilidades  
• áreas a melhorar  
• recomendações  
7.3 Visualização 
• Portal do estudante  
• Portal pedagógico  
• Portal director  
8. SISTEMA DE EMAIL (RESEND) 
8.1 Arquitetura 
Evento → Queue → Notification Service → Resend API → Email 
8.2 Eventos que geram email 
• matrícula  
• notas publicadas  
• propina em atraso  
• pagamento confirmado  
• relatórios gerados  
• alertas académicos  
8.3 Estratégia de custo 
• batching de emails  
• evitar spam interno  
• uso de free tier inicial  
• escalável para AWS SES no futuro  
9. MEDIA SYSTEM (IMAGENS E DOCUMENTOS) 
Funcionalidades 
• upload de foto de estudante  
• documentos escolares  
• PDFs  
• thumbnails automáticos  
Storage 
• Supabase Storage  
10. MÓDULO FINANCEIRO 
Funcionalidades 
• propinas configuráveis  
• multas automáticas  
• recibos PDF  
• histórico financeiro  
• dashboard de dívida  
 
                                   11. MÓDULO RH 
 
Funcionalidades 
• gestão de funcionários  
• salários configuráveis  
• descontos por falta  
• horas extras  
• cálculo automático da folha salarial  
 
    12. CONFIGURAÇÃO DO SISTEMA (CORE FLEXÍVEL) 
 
Permite definir: 
• classes  
• disciplinas  
• escalas de avaliação  
• regras financeiras  
• regras salariais  
• políticas escolares  
 
      13. UX / DESIGN SYSTEM 
 
13.1 Cor base 
• Verde institucional (identidade da escola)  
 
13.2 Layout padrão 
• Sidebar fixa  
• Topbar com notificações  
• Dashboard central  
13.3 Princípios UX 
• simplicidade  
• baixa carga cognitiva  
• poucos cliques  
• mobile-first (estudantes)  
14. SISTEMA DE NOTIFICAÇÕES 
• email (Resend)  
• logs internos  
• histórico de eventos  
15. SEGURANÇA 
• JWT + refresh tokens  
• RBAC granular  
• isolamento por escola  
• auditoria de ações  
• logs de alterações críticas  
16. EVENT-DRIVEN CORE 
Eventos principais: 
• GradeCreated  
• PaymentRegistered  
• ReportGenerated  
• AttendanceMarked  
Processamento assíncrono via Redis queue. 
17. ESCALABILIDADE 
Fase 1 
• monólito modular  
Fase 2 
• separar analytics service  
Fase 3 
• microserviços (notifications, reports)  
18. RESULTADO FINAL DO SISTEMA 
Este sistema será: 
• ERP escolar completo  
• Plataforma analítica educacional  
• Sistema financeiro escolar  
• Sistema de RH completo  
• Plataforma de comunicação automática  
• Sistema de relatórios inteligentes  
CONCLUSÃO 
O projecto que definiste não é um simples sistema escolar. 
É um: 
ERP educacional inteligente multi-tenant com analytics avançado e automação institucional. 
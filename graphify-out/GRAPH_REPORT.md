# Graph Report - .  (2026-08-03)

## Corpus Check
- 63 files · ~64,040 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 320 nodes · 563 edges · 26 communities (15 shown, 11 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.75)
- Token cost: 118,101 input · 0 output

## Community Hubs (Navigation)
- Public Site Pages & Components
- Admin Panel & API Client
- Backend README API Docs
- Backend Server & Routes
- Frontend Package Dependencies
- Backend Package Dependencies
- Project Coordination & Env Config
- Item Controller (Backend)
- Category Controller (Backend)
- Contact & Auth Middleware (Backend)
- Agent Teams Architecture Doc
- Frontend Auth Context & Guards
- Dev Port Rationale Notes
- Contact Endpoint Spec
- Delete Category Endpoint Spec
- List Categories Endpoint Spec
- Get Category Endpoint Spec
- Update Category Endpoint Spec
- Error Response Shape
- Delete Item Endpoint Spec
- Get Item Endpoint Spec
- Update Item Endpoint Spec
- Vercel Deployment Config
- Frontend Favicon Link
- Favicon Icon Asset

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 41 edges
2. `getErrorMessage()` - 19 edges
3. `listCategories()` - 11 edges
4. `LoadingBlock()` - 9 edges
5. `ErrorBlock()` - 9 edges
6. `ManageItems()` - 9 edges
7. `EmptyBlock()` - 8 edges
8. `ManageCategories()` - 8 edges
9. `listItems()` - 7 edges
10. `useAuth()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Agent Teams` --semantically_similar_to--> `Backend/Frontend Coordination Workflow`  [INFERRED] [semantically similar]
  docs/agent-teams.md → CLAUDE.md
- `Mock-Data Scaffold-While-Waiting Rationale` --shares_data_with--> `Backend/Frontend Coordination Workflow`  [INFERRED]
  frontend/README.md → CLAUDE.md
- `POST /admin/login` --shares_data_with--> `POST /admin/login`  [INFERRED]
  CLAUDE.md → backend/README.md
- `Plywood Shop Project` --references--> `Plywood Shop Backend API`  [INFERRED]
  CLAUDE.md → backend/README.md
- `Plywood Shop Project` --references--> `Ridgeline Plywood Co. Frontend`  [INFERRED]
  CLAUDE.md → frontend/README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Baseline API Contract Endpoints** — claude_categories_get, claude_categories_get_id, claude_categories_post, claude_categories_put, claude_categories_delete, claude_items_get, claude_items_get_id, claude_items_post, claude_items_put, claude_items_delete, claude_contact_post, claude_contact_get, claude_admin_login [INFERRED 0.85]
- **Agent Teams Collaboration Architecture** — docs_agent_teams_team_lead, docs_agent_teams_teammates, docs_agent_teams_task_list, docs_agent_teams_mailbox [EXTRACTED 1.00]
- **Admin Authentication Flow (Frontend + Backend)** — frontend_readme_admin_login_route, frontend_readme_auth_context, frontend_readme_protected_route, frontend_readme_localstorage_token, backend_readme_admin_login, backend_readme_auth_model [INFERRED 0.85]

## Communities (26 total, 11 thin omitted)

### Community 0 - "Public Site Pages & Components"
Cohesion: 0.12
Nodes (31): getCategory(), submitContact(), getItem(), App(), cardHover, revealItem, springTransition, staggerContainer (+23 more)

### Community 1 - "Admin Panel & API Client"
Cohesion: 0.10
Nodes (26): getToken(), isAuthenticated(), createCategory(), deleteCategory(), listCategories(), updateCategory(), apiClient, TOKEN_KEY (+18 more)

### Community 2 - "Backend README API Docs"
Cohesion: 0.07
Nodes (29): POST /admin/login, Bearer JWT Auth Model, POST /categories, Category Data Model, GET /contact, ADMIN_EMAIL env var, ADMIN_PASSWORD env var, JWT_SECRET env var (+21 more)

### Community 3 - "Backend Server & Routes"
Cohesion: 0.09
Nodes (19): adminRoutes, app, categoryRoutes, connectDB, contactRoutes, cors, { errorHandler, notFound }, express (+11 more)

### Community 4 - "Frontend Package Dependencies"
Cohesion: 0.08
Nodes (24): axios, framer-motion, dependencies, axios, framer-motion, react, react-dom, react-router-dom (+16 more)

### Community 5 - "Backend Package Dependencies"
Cohesion: 0.08
Nodes (24): dependencies, bcryptjs, cors, dotenv, express, jsonwebtoken, mongoose, description (+16 more)

### Community 6 - "Project Coordination & Env Config"
Cohesion: 0.13
Nodes (19): MONGODB_URI env var, Plywood Shop Backend API, backend/ Directory (Node.js + Express + Mongoose API), Backend/Frontend Coordination Workflow, frontend/ Directory (React + Vite App), Plywood Shop Project, Agent Teams, CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS Flag (+11 more)

### Community 7 - "Item Controller (Backend)"
Cohesion: 0.16
Nodes (16): Category, createItem(), deleteItem(), getItem(), Item, listItems(), mongoose, updateItem() (+8 more)

### Community 8 - "Category Controller (Backend)"
Cohesion: 0.17
Nodes (13): Category, createCategory(), deleteCategory(), getCategory(), listCategories(), updateCategory(), categorySchema, mongoose (+5 more)

### Community 9 - "Contact & Auth Middleware (Backend)"
Cohesion: 0.16
Nodes (11): Contact, createContact(), listContacts(), jwt, contactSchema, mongoose, asyncHandler, { createContact, listContacts } (+3 more)

### Community 10 - "Agent Teams Architecture Doc"
Cohesion: 0.20
Nodes (11): Team config.json, Team Display Modes (in-process/auto/tmux/iterm2), Mailbox (Inter-Agent Messaging), Teammate Permissions Model, Shared Task List, Task List Persistence Directory, TaskCompleted Hook, TaskCreated Hook (+3 more)

### Community 11 - "Frontend Auth Context & Guards"
Cohesion: 0.31
Nodes (6): AdminSidebar(), ProtectedRoute(), AuthContext, AuthProvider(), useAuth(), AdminLayout()

### Community 12 - "Dev Port Rationale Notes"
Cohesion: 0.50
Nodes (4): AirPlay Port 5000 Conflict Workaround, PORT env var, VITE_API_BASE_URL env var, Local Backend Port 5050 Note

### Community 13 - "Contact Endpoint Spec"
Cohesion: 0.67
Nodes (3): Contact Data Model, POST /contact, POST /contact

## Knowledge Gaps
- **126 isolated node(s):** `name`, `version`, `description`, `main`, `type` (+121 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLanguage()` connect `Public Site Pages & Components` to `Admin Panel & API Client`, `Frontend Auth Context & Guards`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `Backend/Frontend Coordination Workflow` connect `Project Coordination & Env Config` to `Backend README API Docs`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _126 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Public Site Pages & Components` be split into smaller, more focused modules?**
  _Cohesion score 0.1191553544494721 - nodes in this community are weakly interconnected._
- **Should `Admin Panel & API Client` be split into smaller, more focused modules?**
  _Cohesion score 0.10188261351052048 - nodes in this community are weakly interconnected._
- **Should `Backend README API Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Backend Server & Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.08547008547008547 - nodes in this community are weakly interconnected._
# Agent Teams — Master Reference Guide

Source: https://code.claude.com/docs/en/agent-teams (documented as of Claude Code v2.1.199+)

> **Status: Experimental, disabled by default.**
> Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in `settings.json` or the shell environment. Without it, no team is set up, no team directories are written, and Claude will not spawn or propose teammates.

---

## 1. What Agent Teams Are

Agent teams let multiple **independent Claude Code instances** work together:

- One session is the **team lead** — coordinates work, assigns tasks, synthesizes results.
- **Teammates** work independently, each with its own context window, and can message each other directly (not just report back to the lead).

This is the key difference from **subagents**: subagents only report results back to the spawning session; teammates can talk to each other and to you directly.

### Subagents vs. Agent Teams

| | Subagents | Agent Teams |
|---|---|---|
| Context | Own context window; result returns to caller | Own context window; fully independent |
| Communication | Report back to main agent only | Teammates message each other directly |
| Coordination | Main agent manages all work | Shared task list, self-coordination |
| Best for | Focused tasks, only the result matters | Complex work needing discussion/collaboration |
| Token cost | Lower (summarized back) | Higher (each teammate is a full instance) |

**Rule of thumb:** use subagents for quick focused workers; use agent teams when workers need to share findings, challenge each other, or coordinate autonomously.

---

## 2. When to Use Agent Teams

Best suited for parallel exploration where independence adds real value:

- **Research and review** — multiple teammates investigate different angles, then compare/challenge findings.
- **New modules or features** — each teammate owns a separate piece, no stepping on each other.
- **Debugging with competing hypotheses** — parallel theories converge faster than serial investigation.
- **Cross-layer coordination** — frontend/backend/tests each owned by a different teammate.

**Avoid** agent teams for: sequential tasks, same-file edits, or heavily interdependent work — coordination overhead and token cost outweigh benefits. Use a single session or subagents instead.

---

## 3. Enabling Agent Teams

`settings.json`:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## 4. Starting a Team

Just describe the task and desired roles in natural language:

```text
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Spawn three teammates to explore this from different angles:
one on UX, one on technical architecture, one playing devil's advocate.
```

Claude will:
1. Populate a shared task list.
2. Spawn teammates per the described roles.
3. Have them explore in parallel.
4. Synthesize findings when done.

**Note:** Claude may spawn subagents instead of a team if the task doesn't warrant it — both appear in the same agent panel, so if you specifically want a *team*, ask explicitly.

### Agent panel controls (lead's terminal)
- **↑ / ↓** — select a teammate
- **Enter** — open selected teammate's transcript / message it directly
- **Esc** — interrupt the selected teammate's current turn

Idle teammate rows stay visible while any agent is still working; once everything is idle, rows hide after 30s and reappear on next turn (teammate keeps running while hidden). More than 3 idle teammates collapse into a single `N idle agents` row — press Enter to expand.

---

## 5. Controlling the Team

### 5.1 Display modes

| Mode | Description | Requirements |
|---|---|---|
| `in-process` (default) | All teammates run in main terminal; navigate via agent panel | Works anywhere |
| `auto` | Split panes if already in tmux or iTerm2 (with `it2` CLI); else in-process | tmux or iTerm2 |
| `tmux` | Split-pane mode, auto-detects tmux/iTerm2 | tmux or iTerm2 |
| `iterm2` | Native iTerm2 split panes explicitly (v2.1.186+) | [`it2` CLI](https://github.com/mkusaka/it2) |

Set globally in `~/.claude/settings.json`:
```json
{
  "teammateMode": "auto"
}
```

Or per-session:
```bash
claude --teammate-mode auto
```
(`--teammate-mode` is experimental; not shown in `claude --help`.)

**Split-pane setup:**
- tmux: install via system package manager.
- iTerm2: install `it2` CLI, enable Python API (iTerm2 → Settings → General → Magic → Enable Python API).
- `tmux -CC` inside iTerm2 is the suggested tmux entrypoint (tmux works best on macOS).

### 5.2 Specifying teammates and models

```text
Spawn 4 teammates to refactor these modules in parallel. Use Sonnet for
each teammate.
```

- Teammates do **not** inherit the lead's `/model` by default.
- Set default via `/config` → **Default teammate model** (or choose "Default (leader's model)").
- Teammates **do** inherit the lead's effort level (split-pane support from v2.1.186+).

### 5.3 Plan approval requirement

```text
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

- Teammate works in read-only plan mode until lead approves.
- Lead can approve/reject (with feedback); rejected plans get revised and resubmitted.
- Give the lead explicit approval criteria in your prompt, e.g. "only approve plans that include test coverage."

### 5.4 Talking to teammates directly

Each teammate is a full independent session — message it directly for follow-ups/redirects.

- **In-process:** ↑/↓ to select, Enter to view/message, `x` to stop, Ctrl+T to toggle task list.
- **Split-pane:** click into the pane directly.

Caveats:
- While viewing a teammate, plain text/skills go to *that* teammate, but built-in commands still run in the lead's session.
- A teammate's model/fast-mode is fixed at spawn — `/model` and `/fast` while viewing a teammate only change the **lead's** settings (a notice confirms this as of v2.1.199).
- `/effort` still applies to the viewed teammate's future turns (teammates follow lead's effort level).

### 5.5 Task list

- Shared list coordinates work; tasks have states: **pending → in progress → completed**.
- Tasks can depend on other tasks; a pending task with unresolved dependencies can't be claimed.
- **Lead assigns** explicitly, or **teammates self-claim** the next unblocked task.
- File locking prevents race conditions on simultaneous claims.

### 5.6 Shutting down teammates

```text
Ask the researcher teammate to shut down
```
Lead sends shutdown request → teammate approves (exits gracefully) or rejects (with explanation).

Team directories clean up automatically at session end — no manual cleanup step needed.

### 5.7 Quality gates via hooks

| Hook | Trigger | Exit code 2 effect |
|---|---|---|
| `TeammateIdle` | Teammate about to go idle | Send feedback, keep it working |
| `TaskCreated` | Task being created | Prevent creation, send feedback |
| `TaskCompleted` | Task being marked complete | Prevent completion, send feedback |

---

## 6. Architecture

| Component | Role |
|---|---|
| **Team lead** | Main session; spawns teammates, coordinates work |
| **Teammates** | Separate Claude Code instances working assigned tasks |
| **Task list** | Shared work items teammates claim/complete |
| **Mailbox** | Inter-agent messaging system |

- Mailbox file: `~/.claude/teams/{team-name}/inboxes/{agent-name}.json` (JSON, validated on read; malformed entries are dropped and reported, valid ones still delivered — fixed in v2.1.207+ so one bad entry no longer blocks the whole mailbox).
- Task dependencies unblock automatically when their prerequisite completes.
- Team name = `session-` + first 8 chars of session ID.
  - Team config: `~/.claude/teams/{team-name}/config.json` (removed when session ends; holds runtime state like session IDs/tmux pane IDs — **don't hand-edit**, it's overwritten on next update)
  - Task list: `~/.claude/tasks/{team-name}/` (persists locally, never uploaded; survives session resume; retention governed by `cleanupPeriodDays` setting)
- `config.json`'s `members` array lists each member's name + agent ID; lead's entry has type `team-lead`; teammate entries only carry an agent type if spawned from a subagent definition.
- No project-level team config equivalent — a `.claude/teams/teams.json` in your repo is just an ordinary file, not recognized config.

### Using subagent definitions as teammates

Reference any subagent type (project/user/plugin/CLI-defined) when spawning:

```text
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

- Teammate honors that definition's `tools` allowlist and `model`.
- Definition's body is **appended** to the teammate's system prompt (not a replacement).
- `SendMessage` and task-management tools are always available regardless of `tools` restriction.
- **Not applied:** `skills` and `mcpServers` frontmatter fields — teammates load skills/MCP servers from project/user settings like a normal session.

### Permissions

- Teammates start with the **lead's** permission mode (e.g. `--dangerously-skip-permissions` propagates to all).
- Can change individual teammate modes after spawn, but **not** at spawn time.
- Messages between agents (`SendMessage`) are flagged to the recipient as coming from another Claude session, not from you.
- A teammate cannot approve permission prompts on your behalf, and denied actions can't be relayed through another teammate to bypass checks.
- In auto permission mode, a relayed "approval" claim from another agent is treated as untrusted input, not real user confirmation.
- Teammate permission prompts surface in the **lead session** — approve there.
- Exception: **plan approval** — lead grants these without an extra prompt to you.

### Context and communication

- Each teammate: own context window, loads CLAUDE.md/MCP servers/skills like a normal session, plus the lead's spawn prompt.
- Lead's conversation history does **not** carry over to teammates.
- Message delivery is automatic — no polling needed.
- Idle notifications: teammate notifies lead automatically when it finishes/stops (as of v2.1.198, API-error-terminated turns are reported as failures with error text, not silently as "done").
- Shared task list visible to all agents.
- Direct messaging is by name; to reach everyone, send one message per recipient (no broadcast).
- Lead assigns teammate names at spawn — specify names in your spawn instruction if you want predictable references later.

### Token usage

- Significantly higher than single session — scales with number of active teammates.
- Worth it for: research, review, new feature work.
- Not worth it for: routine/small tasks — use a single session instead.

---

## 7. Use Case Examples

### Parallel code review
```text
Spawn three teammates to review PR #142:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```
Prevents a single reviewer from fixating on one issue type; lead synthesizes all three reports.

### Competing-hypothesis debugging
```text
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific
debate. Update the findings doc with whatever consensus emerges.
```
Adversarial structure avoids anchoring bias from sequential investigation — the surviving theory is more likely the true root cause.

---

## 8. Best Practices

1. **Give teammates enough context in the spawn prompt** — they don't inherit lead conversation history.
   ```text
   Spawn a security reviewer teammate with the prompt: "Review the authentication module
   at src/auth/ for security vulnerabilities. Focus on token handling, session
   management, and input validation. The app uses JWT tokens stored in
   httpOnly cookies. Report any issues with severity ratings."
   ```
2. **Choose appropriate team size** — start with **3–5 teammates**. Aim for **5–6 tasks per teammate**. Diminishing returns beyond a point; token cost scales linearly.
3. **Size tasks appropriately** — not so small that coordination overhead dominates, not so large that teammates drift long without check-ins. Ask the lead to split work smaller if it isn't generating enough tasks.
4. **Wait for teammates to finish** — if the lead starts doing the work itself:
   ```text
   Wait for your teammates to complete their tasks before proceeding
   ```
5. **Start with research/review tasks** if new to agent teams — clear boundaries, no code-writing coordination risk.
6. **Avoid file conflicts** — assign each teammate a distinct set of files to own.
7. **Monitor and steer** — check progress, redirect bad approaches, synthesize as results arrive. Don't leave a team unattended too long.

---

## 9. Troubleshooting

**Teammates not appearing:**
- Check agent panel (↑/↓ + Enter) in in-process mode.
- A "missing" idle row is hidden, not stopped — hides 30s after whole panel goes idle, reappears on next turn or when messaged directly by name. >3 idle teammates collapse into one row.
- Confirm the task was complex enough to trigger team formation.
- For split panes, verify tmux is installed: `which tmux`; for iTerm2, verify `it2` CLI + Python API enabled.

**Too many permission prompts:**
- Pre-approve common operations in permission settings before spawning teammates (prompts bubble up to lead).

**Teammates stopping on errors:**
- Inspect via agent panel (Enter) or pane click.
- Give additional instructions, or spawn a replacement teammate.
- v2.1.198+: a message from lead/another teammate wakes an in-process teammate that's waiting to retry a failed API call (retries immediately instead of waiting full delay).

**Lead shuts down before work is done:**
- Tell it to keep going / wait for teammates before proceeding.

**Orphaned tmux sessions:**
```bash
tmux ls
tmux kill-session -t <session-name>
```

---

## 10. Limitations (Experimental)

- **No session resumption for in-process teammates** — `/resume`/`/rewind` don't restore them; lead may try messaging teammates that no longer exist (tell it to respawn).
- **Task status can lag** — teammates may fail to mark tasks complete, blocking dependents; check/update manually or nudge via lead.
- **Shutdown can be slow** — teammates finish current tool call/request before exiting.
- **One team per session** — scoped to that session; no multiple named teams, no cross-session sharing.
- **No nested teams** — only the lead can spawn/manage teammates; teammates can't spawn their own.
- **No background subagents from in-process teammates** — a teammate's own subagents always run in foreground (background work can't outlive lead's process). Main-session subagents still follow normal background defaults.
- **Lead is fixed** — can't promote a teammate to lead or transfer leadership.
- **Permissions fixed at spawn** — same mode as lead; can change per-teammate after spawn, not at spawn time.
- **Split panes need tmux or iTerm2** — not supported in VS Code integrated terminal, Windows Terminal, or Ghostty (in-process mode always works).

**`CLAUDE.md` works normally** — teammates read it from their working directory; use for project-specific guidance to the whole team.

---

## 11. Related / Next Steps

- **Subagents** (`/docs/en/sub-agents`) — lightweight delegation, no inter-agent coordination needed.
- **Git worktrees** (`/docs/en/worktrees`) — manual parallel sessions without automated coordination.
- **Feature comparison** (`/docs/en/features-overview#compare-similar-features`) — subagent vs. agent team side-by-side.

---

## 12. Quick-Decision Cheatsheet

| Situation | Use |
|---|---|
| Need a quick focused lookup/verification, result only matters | Subagent |
| Need multiple perspectives that should challenge each other | Agent team |
| Editing the same files / sequential dependency chain | Single session |
| Reviewing a PR from 3 different angles (security/perf/tests) | Agent team (3 teammates) |
| Debugging with several plausible root causes | Agent team (adversarial debate framing) |
| Building 3+ independent modules/features | Agent team (one owner per module) |
| Small, quick task | Single session (skip teams — coordination overhead not worth it) |

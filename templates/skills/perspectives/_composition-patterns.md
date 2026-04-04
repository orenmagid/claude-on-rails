# Perspective Composition Patterns

Shared reference for how perspectives combine during skill execution.
Adapted from cc-thinking-skills' 5 combination patterns. This isn't
theory — every pattern should have at least one working example in
your system before you consider it proven.

## The Five Patterns

### 1. Parallel

**When:** Independent evaluations that should not influence each other.
Each perspective gets a clean context window with the same input data.
Results are collected and synthesized by the consuming skill.

**How it works:** The orchestrating skill (e.g., audit or plan) spawns
one agent per perspective in a single message. Each perspective analyzes
independently. Findings are merged. No perspective sees another's output.

**Risk:** Contradictory findings. Two perspectives may flag the same
area with opposite recommendations (e.g., architecture says "split
this component" while usability says "keep it unified for simplicity").

**Mitigation:** The consuming skill synthesizes contradictions and
presents them to the user as a tension to resolve, not a bug. The
synthesis should name both perspectives and their reasoning.

**Implementation:** Use the Agent tool with multiple agents in a
single message. Each agent gets: shared context (`_context.md`) +
perspective SKILL.md + output contract + input data.

---

### 2. Sequential

**When:** Ordered evaluation where later steps depend on earlier results.
One perspective's output becomes input (or gating condition) for the next.

**How it works:** The orchestrating skill runs perspectives in order.
If the first returns "block," execution stops. Otherwise, its output
feeds into the next perspective's prompt as context.

**Example:** Execution checkpoints. Pre-implementation review runs first.
If all continue, implementation proceeds. Per-file-group review runs
during implementation. Pre-commit sweep runs after all implementation,
re-checking earlier concerns in aggregate.

**Example:** System diagnosis — debugger maps the dependency chain first,
then technical-debt evaluates the code quality of the dependencies the
debugger identified, then historian checks whether any of these
dependencies have caused issues before.

**Risk:** Anchoring. The first perspective's framing can bias later
perspectives. If the debugger says "the problem is in the database
layer," technical-debt may focus exclusively on database code and
miss the real issue in the API layer.

**Mitigation:** Later perspectives should receive the prior output as
context but with an explicit instruction: "The previous analysis found
X. You may agree, disagree, or identify issues the prior analysis missed.
Do not limit your scope to what was already identified."

**Implementation:** Sequential Agent calls — launch the first, wait for
result, include result in the second agent's prompt, etc.

---

### 3. Adversarial

**When:** High-stakes decisions where confirmation bias is likely. One
perspective is explicitly tasked with challenging another's conclusions.

**How it works:** Anti-confirmation (or a similar meta-cognitive
perspective) activates alongside domain perspectives. It challenges the
reasoning quality of the plan itself AND of the other perspectives'
critiques — asking what would make this wrong, what alternatives were
dismissed too quickly, where consensus formed before dissent was heard.

**When to use vs. not use:**
- USE when: redesigning a core system, choosing between approaches,
  making an irreversible architectural decision, deferring significant
  work (is the deferral justified or avoidant?)
- SKIP when: routine implementation, bug fixes, documentation updates,
  trivial configuration changes

**Risk:** Slowness. Adversarial composition takes longer and can feel
obstructive when the decision is actually straightforward.

**Mitigation:** Topic-based activation (anti-confirmation only fires on
high-stakes topics). The adversarial perspective should have a hard
boundary: it challenges reasoning quality, not domain conclusions.

**Implementation:** Include the adversarial perspective in the parallel
agent batch alongside domain perspectives. Its prompt explicitly states:
"Your job is to challenge the reasoning, not the domain conclusions.
Focus on: premature consensus, dismissed alternatives, unstated
assumptions, confirmation bias in the plan or in other critiques."

---

### 4. Nested

**When:** A perspective needs another perspective's analysis as input
to do its own work. One perspective consults another mid-evaluation.

**How it works:** A perspective running in the main context (session-modal,
needs full conversation history) references another perspective's known
findings — from memory, from audit history, or from prior session output.

**Example:** During debrief, a historian perspective is activated to check:
"Has this kind of change been done before? What happened? Are there
lessons from prior sessions relevant to what was just completed?"

**Example:** During planning, the organized-mind perspective might need
the historian's input: "Has this kind of information architecture been
tried before? What was the user's reaction?"

**Risk:** Deep nesting creates long dependency chains that are slow and
fragile. A three-level nest (A calls B calls C) means C's context
must include A's original input plus B's intermediate output — context
window pressure.

**Mitigation:** Limit to one level of nesting. If perspective A needs B's
output, A can reference B's known findings (from memory, from audit
history). It should NOT spawn B as a sub-agent. The consuming skill is
responsible for orchestrating multi-perspective flows, not individual
perspectives.

**Implementation:** The nested perspective runs in the main context
(session-modal) rather than as a parallel agent. This is the exception,
not the rule — most perspectives run in clean parallel contexts.

---

### 5. Temporal

**When:** The same domain needs different evaluation at different lifecycle
stages. A perspective that applies during planning applies differently
during execution and differently again during audit.

**How it works:** Same perspective, different output contracts at different
lifecycle stages. The orchestrating skill passes the appropriate contract.

**Example:** QA perspective across the lifecycle:
- During planning: evaluates acceptance criteria quality (are they testable?
  do they have [auto]/[manual]/[deferred] tags? are edge cases covered?)
- During execution: active testing (runs [auto] criteria, verifies
  [manual] criteria via preview tools, documents [deferred])
- During debrief: produces QA report summarizing what was verified,
  what failed, what's still unverified

Same perspective, three different output contracts, three different
points in the lifecycle.

**Example:** Security perspective:
- During planning: evaluates whether the plan introduces attack surface
  (new endpoints, auth changes, input handling)
- During execution: reviews the actual code for OWASP vulnerabilities
  before implementation proceeds
- During audit: scans deployed code for security issues

**Risk:** Criteria drift between stages. If the QA perspective defines
"testable AC" differently during planning than execution expects, the
execute phase will struggle with criteria that looked good during
planning but are actually unverifiable.

**Mitigation:** Output contracts define what each perspective produces
at each stage. The contracts are explicit — a perspective reading its
contract knows exactly what's expected.

**Implementation:** Same perspective SKILL.md, different output contract
per consuming skill. The consuming skill passes the appropriate contract
to the agent prompt.

---

## Pre-Built Recipes

Recipes are named combinations for common situations. The consuming
skill selects a recipe based on context, then activates the listed
perspectives using the appropriate pattern.

### Group Audit

**When:** Scoped audit of a specific domain (UX, code quality, etc.).
**Pattern:** Parallel
**Perspectives:** All perspectives in the selected group(s) from your
project's group configuration.
**Why this combination:** Groups are pre-curated sets of related
perspectives. Running a group audit gives thorough coverage of one
domain without the cost/time of a full audit.

### High-Stakes Decision

**When:** Architectural redesign, technology choice, significant deferral.
**Pattern:** Parallel + Adversarial
**Perspectives:** anti-confirmation + architecture + historian + goal-alignment
**Why this combination:** Architecture evaluates technical fitness.
Goal-alignment checks strategic fit. Historian surfaces past precedent.
Anti-confirmation stress-tests the reasoning behind all three.

### New Feature Planning

**When:** Adding user-visible functionality with UI + API changes.
**Pattern:** Parallel (with design committee for UI)
**Perspectives:** security + architecture + organized-mind + qa +
any domain-specific UI perspectives
**Why this combination:** Security catches attack surface. Architecture
evaluates system fit. Organized-mind checks cognitive load. QA evaluates
AC quality. UI perspectives critique the interaction model.

### System Diagnosis

**When:** Something is broken or degrading and the root cause is unclear.
**Pattern:** Sequential (debugger first, then technical-debt, then historian)
**Perspectives:** debugger → technical-debt → historian
**Why this combination:** Debugger maps the dependency chain and identifies
the failure point. Technical-debt evaluates whether the failure point
is symptomatic of deeper code quality issues. Historian checks whether
this failure pattern has occurred before and what fixed it last time.

### Prompt Refinement

**When:** Improving skill definitions or perspective definitions.
**Pattern:** Parallel
**Perspectives:** skills-coverage + meta-process + organized-mind
**Why this combination:** Skills-coverage evaluates whether the skill
covers its full scope. Meta-process checks whether the skill follows
established patterns. Organized-mind evaluates whether the skill's
structure is cognitively navigable for a fresh session.

### Post-Execution Review

**When:** Debrief after completing implementation work.
**Pattern:** Nested (session-modal)
**Perspectives:** historian + any lifecycle-tracking perspectives + qa
**Why this combination:** Historian records what was done and checks for
lessons learned. Lifecycle perspectives capture relevant non-dev items.
QA produces the final verification report. All need session context,
so they run in the main context.

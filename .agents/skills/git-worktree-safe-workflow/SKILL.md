---
name: git-worktree-safe-workflow
description: Use for any repository-changing coding task, especially at the start of a new Codex discussion. Before editing project files, isolate the work in one dedicated Git branch and one Git worktree, keep main protected, push only the task branch when asked to publish, and integrate into main only on explicit request. Includes safe checkpoints, validation, rollback, recovery, and cleanup rules.
---

# Git Worktree Safe Workflow

## Goal

Treat each repository-changing discussion as one independent workspace:

- one discussion/task;
- one dedicated branch;
- one dedicated Git worktree;
- no direct development on `main`;
- controlled publication and integration;
- reversible history.

Reuse the same branch/worktree for the whole discussion. Do not create a new one for every message.

## Core invariants

1. Never edit or commit task work directly on `main`.
2. Never push task changes directly to `origin/main`.
3. Never merge into `main` unless the user explicitly asks to update/integrate the principal version.
4. Never use `git push --force` or `git push -f`.
5. Do not rewrite published history merely to simplify integration.
6. Never auto-stash, reset, clean, discard, or overwrite pre-existing user changes.
7. Never delete a task branch/worktree before proving the work is committed, published, and integrated when applicable.
8. Prefer reversible, auditable operations.
9. If Git state is ambiguous or potentially destructive, inspect and preserve rather than guess.

## When to initialize

Before the first file modification in a new discussion that may change a Git repository:

1. inspect the repository;
2. fetch the remote state;
3. create or reuse the discussion-specific branch/worktree;
4. move all subsequent work into that worktree.

Read-only inspection does not require a worktree until modifications begin.

If this discussion already owns a valid dedicated branch/worktree, reuse it.

## Naming

Branch pattern:

`work/<task-slug>-<YYYYMMDD-HHmm>`

Examples:

- `work/fix-mobile-menu-20260831-1302`
- `work/contact-form-validation-20260831-1348`
- `work/refactor-auth-service-20260831-1410`

Rules:

- lowercase;
- concise but explicit;
- derive the slug from the task;
- avoid generic names such as `test`, `changes`, `new`, or `task`;
- use a timestamp to avoid collisions;
- if a collision still exists, append a short numeric suffix.

Worktree location should preferably be outside the repository:

`<repo-parent>/<repo-name>-worktrees/<task-slug>-<timestamp>`

This avoids accidentally staging another checkout.

## Phase 1 — Preflight

Before editing files, inspect without modifying existing work:

```sh
git rev-parse --show-toplevel
git branch --show-current
git status --short --branch
git worktree list --porcelain
git remote -v
git fetch origin --prune
git rev-parse --verify origin/main
```

Safety rules:

- If `origin` or `origin/main` is unavailable, establish the actual remote/default branch safely before proceeding.
- Do not create a new `main` merely because this skill assumes `main` by default.
- If the primary checkout has uncommitted changes, leave them untouched. Do not auto-stash, commit, reset, or clean them.
- A new task worktree may still be created from `origin/main` if Git permits it.

## Phase 2 — Create the discussion workspace

If no valid discussion-specific worktree exists, create the branch from the freshly fetched `origin/main`, not from a possibly stale local `main`:

```sh
git worktree add -b <task-branch> <task-worktree-path> origin/main
```

Verify:

```sh
git -C <task-worktree-path> branch --show-current
git -C <task-worktree-path> status --short --branch
git worktree list --porcelain
```

Expected result:

- current task branch is not `main`;
- task worktree is clean before edits;
- branch started from the fetched `origin/main`.

After initialization, all reads, writes, builds, tests, generated files, commits, and Git operations for this discussion must target the task worktree.

If the environment cannot permanently change working directory, use explicit worktree paths or `git -C`.

## Phase 3 — Work inside the task worktree

During implementation:

```sh
git status --short
git diff
```

Rules:

- modify only task-related files;
- do not absorb unrelated existing changes;
- use repository-defined tests/build/lint/typecheck when relevant;
- do not touch `main` merely to keep it current;
- do not create another worktree unless the user explicitly splits the task into an independent piece of work.

## Phase 4 — Save locally

When the user asks to save, checkpoint, or commit locally:

1. confirm the task worktree/branch;
2. inspect `git status`, `git diff`, and staged changes;
3. run relevant validation;
4. stage only intended files;
5. create meaningful commit(s);
6. verify the resulting commit and clean/expected status.

Do not push unless the user asked to publish/push/synchronize remotely.

## Phase 5 — Publish the task branch

When the user asks to publish, push, save on GitHub, or synchronize:

1. remain in the task worktree;
2. inspect status and diffs;
3. commit intended changes if needed;
4. run relevant validation;
5. fetch remote state;
6. push only the task branch.

First push:

```sh
git push -u origin <task-branch>
```

Later pushes:

```sh
git push origin <task-branch>
```

Verify local and remote branch tips match:

```sh
git rev-parse HEAD
git rev-parse origin/<task-branch>
```

Never interpret "push", "publish", or "save on GitHub" as permission to push `main`.

## Phase 6 — Prepare explicit integration into main

Only integrate when the user explicitly requests it.

Before touching `main`:

1. task worktree must be clean;
2. intended task changes must be committed;
3. relevant validation must pass unless the user explicitly accepts a known failure;
4. fetch `origin`;
5. ensure the task branch is published;
6. verify local task `HEAD` equals `origin/<task-branch>`.

Check whether `origin/main` advanced since the task began.

If it advanced, synchronize inside the task branch first:

```sh
git merge origin/main
```

Resolve conflicts in the task worktree, validate, commit if needed, then push the updated task branch.

Do not rebase a published task branch when that would require a force push. Prefer merging `origin/main` into the task branch.

## Phase 7 — Protect main before merging

Use the primary/main worktree.

Require:

```sh
git branch --show-current
git status --porcelain
```

The branch must be `main` and the primary worktree must be clean.

Then:

```sh
git fetch origin --prune
git pull --ff-only origin main
git rev-parse HEAD
```

Create an annotated pre-merge checkpoint tag:

`checkpoint/main-before-<task-slug>-<YYYYMMDD-HHmm>`

Example:

```sh
git tag -a <checkpoint-tag> -m "Checkpoint before merging <task-branch>"
git push origin <checkpoint-tag>
```

Do not merge until the checkpoint tag is successfully stored on GitHub, unless the user explicitly overrides this safeguard.

## Phase 8 — Merge into main

Use an explicit merge commit:

```sh
git merge --no-ff <task-branch> -m "merge: <concise task description>"
```

Why:

- preserves the task boundary;
- keeps branch history visible;
- makes whole-task rollback easier.

Before pushing `main`:

```sh
git status --short --branch
git log --graph --decorate --oneline -n 20
```

Then run relevant validation from the integrated `main`.

If validation fails, do not push `main`.

If a conflict unexpectedly occurs during the final merge into `main`, prefer:

```sh
git merge --abort
```

Then resolve the integration problem in the task branch/worktree first.

## Phase 9 — Push main

After successful integration and validation:

1. ensure remote `main` did not unexpectedly advance;
2. push normally:

```sh
git push origin main
```

3. verify local `main` and `origin/main` match;
4. verify task commits are reachable from `main`;
5. verify the checkpoint tag exists remotely.

Never force-push `main`.

Report:

- task branch;
- merge commit;
- checkpoint tag;
- resulting `origin/main` commit;
- validation result.

## Phase 10 — Cleanup

Cleanup is optional and occurs only after successful verification.

Before cleanup, prove:

- task worktree is clean;
- task branch exists or existed safely on GitHub;
- task commits are reachable from `main`;
- `origin/main` contains the integration;
- checkpoint tag exists remotely;
- no uncommitted task work remains.

Then cleanup in this order:

```sh
git worktree remove <task-worktree-path>
git worktree list
git branch -d <task-branch>
```

Delete the remote task branch only if the user explicitly wants remote cleanup:

```sh
git push origin --delete <task-branch>
```

Use `git branch -d`, not `git branch -D`.

Do not automatically delete checkpoint tags.

## Unsafe commands

Do not automatically run:

```text
git push --force
git push -f
git clean -fd
git clean -fdx
git branch -D
git checkout -- .
git restore .
```

Treat `git reset --hard`, rebases of published work, remote-branch deletion, and `--force-with-lease` as exceptional/destructive operations requiring explicit justification and safety checks.

Do not use `git stash` automatically to hide unknown user changes.

## Dirty main

If `main` is dirty when integration is requested:

- do not stash automatically;
- do not reset;
- do not commit those changes into the task branch;
- do not continue the merge;
- report exactly what blocks safe integration.

## Rollback and recovery

For detailed recovery procedures, read:

`references/RECOVERY.md`

Default policy:

- shared/pushed history -> prefer `git revert`;
- unpublished local merge -> restoration to the pre-merge checkpoint is allowed only after proving no user work can be lost;
- lost branch/worktree -> recover using branch refs, reflog, tags, or a new recovery branch;
- never rewrite shared `main` history to undo a mistake.

## Validation policy

Use project-defined validation when available:

- tests;
- lint;
- type checking;
- build;
- targeted smoke checks.

Do not invent unnecessary validation infrastructure.

A known relevant validation failure blocks `main` integration unless the user explicitly accepts it.

## Status reporting

After workspace initialization, report:

- task branch;
- task worktree path;
- base reference/commit;
- whether the task worktree is clean.

After publishing, report:

- remote task branch;
- pushed commit;
- validation result.

After main integration, report:

- merge commit;
- checkpoint tag;
- `origin/main` commit;
- validation result;
- whether cleanup is safe.

## Intent table

| User request | Commit task | Push task branch | Merge main | Push main |
|---|---:|---:|---:|---:|
| Modify/build/fix | As needed | No | No | No |
| Save/commit | Yes | No | No | No |
| Publish/push | Yes | Yes | No | No |
| Update/integrate main | Yes | Yes | Yes | Yes |
| Roll back shared main | Revert as needed | As relevant | No rewrite | Push revert normally |

## Final integration checklist

Before declaring success:

- [ ] development did not occur on `main`;
- [ ] task has its own branch/worktree;
- [ ] task changes are committed;
- [ ] task worktree is clean;
- [ ] task branch exists on `origin`;
- [ ] local and remote task tips match;
- [ ] relevant validation passes;
- [ ] primary `main` was clean;
- [ ] `main` was updated with `--ff-only`;
- [ ] pre-merge checkpoint tag exists on GitHub;
- [ ] merge used `--no-ff`;
- [ ] integrated validation passes;
- [ ] `main` was pushed without force;
- [ ] `origin/main` matches the expected integration;
- [ ] task commits are reachable from `main`;
- [ ] cleanup occurs only after all required verification.

## Highest-priority rule

When Git state is dirty, diverged, conflicted, unexpected, or potentially destructive:

**Do not guess and do not destroy information. Inspect first, preserve existing work, and stop before irreversible actions.**

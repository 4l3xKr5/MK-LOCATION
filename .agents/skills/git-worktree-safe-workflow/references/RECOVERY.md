# Recovery and rollback reference

Load this file only when rollback, recovery, branch loss, worktree loss, or an integration failure is involved.

## 1. Shared main contains a bad merge

If the merge is already pushed to `origin/main`, preserve public history.

1. Identify the merge commit:
   ```sh
   git log --graph --decorate --oneline
   ```
2. Identify the pre-merge checkpoint:
   ```sh
   git tag --list "checkpoint/*"
   ```
3. Inspect the merge and expected rollback.
4. Revert the merge:
   ```sh
   git revert -m 1 <merge-commit>
   ```
5. Run validation.
6. Push the revert normally:
   ```sh
   git push origin main
   ```

Do not reset shared `main` and force-push it.

## 2. Bad main merge was never pushed

Restoring local `main` to the checkpoint is permitted only when all are proven true:

- merge never reached `origin/main`;
- `main` was clean before integration;
- no new user changes were made afterward;
- task branch still preserves the work;
- checkpoint identifies the intended prior state.

Inspect first:

```sh
git status
git log --graph --decorate --oneline -n 30
git rev-parse HEAD
git rev-parse <checkpoint-tag>
```

Only then may a destructive local reset be considered. Never run it when uncommitted work could be lost.

## 3. Recover an existing task branch after its worktree was removed

Inspect:

```sh
git branch --all
git worktree list --porcelain
```

If the task branch still exists:

```sh
git worktree add <new-worktree-path> <existing-task-branch>
```

Verify status before editing.

## 4. Recover a deleted local branch

Inspect reflog and all refs:

```sh
git reflog
git log --all --graph --decorate --oneline
```

When the correct commit is identified, create a recovery branch:

```sh
git branch recovery/<slug>-<timestamp> <commit>
git worktree add <recovery-worktree-path> recovery/<slug>-<timestamp>
```

Do not resume editing on a detached HEAD.

## 5. Recover from a known commit

Create a recovery branch rather than altering `main`:

```sh
git branch recovery/<slug>-<timestamp> <commit>
git worktree add <recovery-worktree-path> recovery/<slug>-<timestamp>
```

Inspect and validate before deciding what to integrate.

## 6. Undo one shared commit

Prefer:

```sh
git revert <commit>
```

Then validate and push normally.

## 7. Conflict while synchronizing task branch with main

Resolve inside the task worktree:

```sh
git fetch origin --prune
git merge origin/main
```

If conflicts occur:

1. inspect every conflicted file;
2. resolve deliberately;
3. stage resolved files;
4. complete the merge commit;
5. run validation;
6. push the task branch;
7. only then return to final main integration.

## 8. Conflict during final main merge

Do not improvise on `main`.

If safe:

```sh
git merge --abort
```

Return to the task branch, merge `origin/main` there, resolve, validate, push, then retry integration.

## 9. Diagnose what is recoverable

Useful non-destructive inspection commands:

```sh
git status
git branch --all
git worktree list --porcelain
git tag --list "checkpoint/*"
git log --all --graph --decorate --oneline
git reflog
git fsck --lost-found
```

Use `git fsck --lost-found` only as a deeper recovery tool when ordinary refs/reflog are insufficient.

## Recovery principle

Preserve references before changing history.

If there is uncertainty, create a recovery branch/tag pointing at the potentially valuable commit before any destructive local operation.

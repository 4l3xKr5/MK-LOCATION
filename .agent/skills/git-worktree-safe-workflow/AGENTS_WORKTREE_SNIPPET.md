# Git Worktree isolation rule

For every discussion/task that may modify files in this repository:

1. Before the first project-file modification, use the `git-worktree-safe-workflow` skill.
2. Never develop directly on `main`.
3. Treat each new discussion as one independent task branch + one Git worktree.
4. Reuse that branch/worktree throughout the discussion; do not create one per message.
5. "Push", "publish", or "save on GitHub" means push the task branch only.
6. Merge or push `main` only when I explicitly ask to update/integrate the principal version.
7. Never use destructive Git cleanup or history rewriting merely to make the repository look clean.
8. If Git state is ambiguous or unsafe, preserve existing work and stop before destructive actions.


# Check Repository Status

Use these commands to inspect your local repository.

### Show current status

```bash
git status
```

Displays:

* Modified files
* New files
* Deleted files
* Current branch
* Staged changes



### View commit history

```bash
git log
```

Shows the complete commit history.

---

### Short history

```bash
git log --oneline
```

Displays one commit per line.

---

### Show differences

```bash
git diff
```

Shows unstaged changes.

---

### Show staged changes

```bash
git diff --cached
```

Displays changes that will be included in the next commit.

---

# Remote Repository

### List remotes

```bash
git remote -v
```

Shows all configured remote repositories.

---

### Change remote URL

```bash
git remote set-url origin NEW_URL
```

Updates the repository URL.

---

### Remove remote

```bash
git remote remove origin
```

Deletes the configured remote.

---

# Branches

### List branches

```bash
git branch
```

---

### Show remote branches

```bash
git branch -r
```

---

### Show all branches

```bash
git branch -a
```

---

### Create a branch

```bash
git branch feature/login
```

---

### Switch branch

```bash
git checkout feature/login
```

or

```bash
git switch feature/login
```

---

### Create and switch

```bash
git checkout -b feature/login
```

---

# Synchronization

### Download remote changes

```bash
git fetch
```

Downloads new commits without merging.

---

### Download and merge

```bash
git pull
```

Updates the current branch.

---

### Upload commits

```bash
git push
```

Uploads local commits.

---

# Daily Workflow

Use these steps every time you make changes to your project.

---

## 1. Check changed files

View modified, deleted, and newly created files.

```bash
git status
```

---

## 2. Review changes

See exactly what has changed before committing.

```bash
git diff
```

---

## 3. Stage the changes

Stage every modified file.

```bash
git add .
```

Or stage only one file.

```bash
git add src/index.js
```

---

## 4. Create a commit

Write a meaningful commit message describing your changes.

```bash
git commit -m "Add authentication support"
```

---

## 5. Download remote changes

Fetch the latest information from GitHub without merging.

```bash
git fetch
```

---

## 6. Pull the latest changes

Merge remote updates into your local branch.

```bash
git pull
```

Or use rebase.

```bash
git pull --rebase
```

---

## 7. Upload your changes

Push your commits to GitHub.

```bash
git push
```

---

## Complete Daily Workflow

```bash
git add .
git commit -m "new update"
git push -u origin main
```

---
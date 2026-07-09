# Upload Project to GitHub

This guide explains the complete workflow for publishing and maintaining a Git project on GitHub. It covers everything from creating a new repository to updating an existing one.

---

# Initial Upload

Use this workflow when your project has never been uploaded to GitHub before.

## 1. Initialize a Git repository

Creates a new local Git repository in the current directory.

```bash
git init
```

---

## 2. Check the repository status

Shows tracked and untracked files before creating your first commit.

```bash
git status
```

---

## 3. Stage all files

Adds every file in the current directory to the staging area.

```bash
git add .
```

To add only a specific file:

```bash
git add README.md
```

---

## 4. Create the first commit

Saves the current staged files into the repository history.

```bash
git commit -m "Initial commit"
```

---

## 5. Rename the default branch

Most repositories use `main` as the default branch.

```bash
git branch -M main
```

Check the current branch:

```bash
git branch
```

---

## 6. Connect the local repository to GitHub

Replace the URL with your repository.

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
```

Verify the remote:

```bash
git remote -v
```

---

## 7. Push the project

Uploads the local repository to GitHub.

```bash
git push -u origin main
```

The `-u` option sets the upstream branch so future pushes only require:

```bash
git push
```

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
git status
git diff
git add .
git commit -m "Describe your changes"
git pull --rebase
git push
```

---

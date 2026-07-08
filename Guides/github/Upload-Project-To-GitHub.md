---
title: Upload Project To GitHub
type: guide
category: git
status: published
---

# Upload Project To GitHub

A simple guide for uploading a local project to GitHub.

## Requirements

- Git installed
- GitHub account
- Repository created on GitHub

---

## Initialize Git

Open terminal inside your project folder:

```bash
git init
````

---

## Add Files

```bash
git add .
```

---

## Create First Commit

```bash
git commit -m "Initial commit"
```

---

## Connect Remote Repository

```bash
git remote add origin YOUR_REPOSITORY_URL
```

Example:

```bash
git remote add origin https://github.com/username/project.git
```

---

## Push Project

```bash
git branch -M main

git push -u origin main
```

---

## Notes

Never upload:

* API keys
* Passwords
* Private tokens
* `.env` files

Use `.gitignore` and environment variables instead.

````

---

حالا برای تست دستی:

بزن:

```cmd
tree /a /f
````

باید این را ببینی:

```text
Guides
│   README.md
│   Upload-Project-To-GitHub.md
```

---

حالا یک چیز مهم را تست می‌کنیم:

فعلاً `Guides/README.md` خالی است.

بعداً اسکریپت باید آن را تبدیل کند به:

```md
# Guides

## Available Guides

- [Upload Project To GitHub](./Upload-Project-To-GitHub.md)
```

---
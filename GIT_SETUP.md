# Git Repository Setup Guide

## Quick Start

### 1. Initialize Git Repository

```bash
cd "/Users/mujtabashah/Documents/University/Semester-3/Data Science & Visualization/Project/Project"
git init
```

### 2. Add Remote Repository

Once you have the repository URL, run:

```bash
git remote add origin <your-repository-url>
```

Example:
```bash
git remote add origin https://github.com/yourusername/youtube-viral-intelligence.git
```

### 3. Stage All Files

```bash
git add .
```

### 4. Verify What Will Be Committed

```bash
git status
```

This will show you:
- ✅ Files that will be committed (in green)
- ❌ Files that are ignored (won't appear)

### 5. Make Initial Commit

```bash
git commit -m "Initial commit: YouTube Viral Intelligence Project

- Complete ML pipeline with XGBoost models
- Interactive 5-tab dashboard (React/Next.js)
- Comprehensive EDA and statistical analysis
- Full documentation and blog post"
```

### 6. Push to Remote

```bash
git branch -M main
git push -u origin main
```

## Verification Commands

### Check what will be ignored:
```bash
git status --ignored
```

### Test if a specific file will be ignored:
```bash
git check-ignore -v Backend/venv
git check-ignore -v Frontend/node_modules
```

### See repository size (before commit):
```bash
du -sh .
```

## Expected Repository Size

After ignoring unnecessary files:
- **Source code**: ~50-100MB
- **Documentation**: ~5MB
- **Images**: ~20-30MB
- **Total**: ~75-135MB (vs ~800MB+ without .gitignore)

## Important Notes

1. **Never commit**:
   - `.env` files (contains secrets)
   - `venv/` or `node_modules/` (can be regenerated)
   - Large data files (use Git LFS if needed)

2. **Always commit**:
   - Source code (`.py`, `.tsx`, `.ts`)
   - Configuration files (`package.json`, `requirements.txt`)
   - Documentation (`.md` files)
   - Model files (`.pkl`, `.json`)

3. **If repository is too large**:
   - Consider using Git LFS for large files
   - Use `.gitattributes` for binary files
   - Consider hosting data files separately

## Troubleshooting

### If you accidentally committed large files:

```bash
# Remove from git history (but keep locally)
git rm --cached Backend/venv
git rm --cached Frontend/node_modules

# Commit the removal
git commit -m "Remove large files from repository"
```

### If .gitignore isn't working:

```bash
# Remove cached files
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
```

## Branch Strategy (Optional)

```bash
# Create development branch
git checkout -b develop

# Create feature branch
git checkout -b feature/new-feature

# Switch back to main
git checkout main

# Merge feature branch
git merge feature/new-feature
```

## Next Steps After Push

1. ✅ Verify repository on GitHub/GitLab
2. ✅ Check that large files are not included
3. ✅ Add repository description
4. ✅ Add topics/tags
5. ✅ Create README badges (if desired)
6. ✅ Set up GitHub Actions (optional)

---

**Ready to push!** Just provide the repository URL and we can complete the setup.


# My Book Archive

A static website for sharing PDF books organized by category — deployed on **GitHub Pages**.

## Overview

This repository hosts a clean, responsive digital library that categorizes and shares books across three collections:

- **NGO Guide Books** — Practical guides for non-governmental organizations
- **Summary Books** — Condensed summaries of influential works
- **Instructional Manuals** — Step-by-step reference documents

## File Structure

```
your-book-archive-repo/
├── index.html          # Main page structure
├── style.css           # All visual styling
├── script.js           # Interactive logic (animations, navigation)
├── /assets/            # Folder containing all PDF books
│   ├── /guide/         # NGO Guide Books
│   │   ├── ngo_operations_handbook.pdf
│   │   ├── grant_writing_fundraising.pdf
│   │   └── ngo_compliance_governance.pdf
│   ├── /summaries/     # Book Summaries
│   │   ├── leading_change_summary.pdf
│   │   ├── lean_startup_summary.pdf
│   │   └── thinking_fast_slow_summary.pdf
│   └── /manuals/       # Instructional Manuals
│       ├── me_framework_manual.pdf
│       ├── data_collection_toolkit.pdf
│       └── project_management_guide.pdf
└── README.md           # This file
```

## How to Deploy on GitHub Pages

### 1. Create a New Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `my-book-archive` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages hosting)

### 2. Upload Your Files

**Option A — Upload via GitHub website:**
1. Open your new repository on GitHub
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop all files from this folder (`index.html`, `style.css`, `script.js`, the `/books/` folder, and `README.md`)
4. Click **"Commit changes"**

**Option B — Upload via Git command line:**
```bash
# Clone your new repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Copy all files into this folder, then:
git add .
git commit -m "Initial upload of book archive website"
git push origin main
```

### 3. Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages** (in the left sidebar)
2. Under **"Source"**, select **"Deploy from a branch"**
3. Under **"Branch"**, select `main` and folder `/ (root)`
4. Click **Save**
5. Wait 1–2 minutes, then visit the URL shown (e.g., `https://yourusername.github.io/your-repo-name/`)

### 4. Add Your PDF Files

1. Place your actual PDF files into the appropriate `/assets/` subfolder:
   - NGO Guide Books → `/assets/guide/`
   - Book Summaries → `/assets/summaries/`
   - Instructional Manuals → `/assets/manuals/`
2. Update the filenames in `index.html` if your PDFs have different names — each book card has a download link like:
   ```html
   <a href="assets/guide/YOUR_PDF_NAME.pdf" class="download-btn" download>
   ```
3. Commit and push the changes — your site will update automatically

## Customization Guide

### Adding More Books

To add a new book to any section, copy an existing `<article class="book-card">` block and update:
- **Book title** (in `.book-cover-title` and `.book-title`)
- **Subtitle** (in `.book-cover-subtitle`)
- **Description** (in `.book-description`)
- **Page count** (in `.book-meta-item`)
- **PDF filename** (in the `.download-btn` href)
- **Category color** — use `ngo-cover`, `summary-cover`, or `manual-cover` on the `.book-cover` div

### Changing Colors

The three category colors are defined in `style.css` using CSS custom properties:

```css
--ngo-primary: #059669;      /* Green */
--summary-primary: #d97706;  /* Amber */
--manual-primary: #dc2626;   /* Red */
```

### Adding a New Category

1. Add a new section in `index.html` following the existing pattern
2. Add corresponding CSS variables in `style.css`
3. Create a new `.your-category-cover` class with a gradient background
4. Add corresponding styles for `.download-btn` hover states

## Browser Support

The website works in all modern browsers:
- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This template is free to use for personal and non-commercial projects.

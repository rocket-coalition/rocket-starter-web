---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
description: "Short description of this page or post."
summary: "Optional summary for list pages or previews."
slug: "{{ .File.ContentBaseName }}"
---

# 🧭 {{ replace .File.ContentBaseName "-" " " | title }}

> ⚙️ **Debug Info (Archetype Context):**
>
> * File name: `{{ .File.BaseFileName }}`
> * Section: `{{ with .Section }}{{ . }}{{ else }}(not set){{ end }}`
> * Path: `{{ .File.Path }}`
> * Dir: `{{ .File.Dir }}`
> * Ext: `{{ .File.Ext }}`
> * Archetype: `{{ .Name }}`
> * Date: `{{ .Date }}`
>
> *Note: Fields like `.Kind`, `.Type`, and `.Layout` are only available **at build/render time**, not during `hugo new` creation.*

---

## 📝 Description

Write your main content here.
This section is automatically generated from the archetype to help you verify that Hugo recognized your file path and section correctly.

---

## 🧩 Developer Notes

* This file was generated from an archetype.
* The metadata above helps confirm correct content placement.
* You can delete this debug info once the page is finalized.

---

## ✅ Next Steps

1. Replace placeholder text with your real content.
2. Add any extra front matter fields (e.g., `tags`, `categories`, `featured_image`).
3. Run `hugo server -D` to preview changes.
4. Commit once your content looks right.

---

### 🧠 Why This Works

* ✅ Uses only archetype-safe fields (`.File`, `.Name`, `.Date`, `.Section`)
* ✅ Prevents “can’t evaluate field Kind” errors
* ✅ Still shows context and debug info for the creator
* ✅ Works for **both leaf bundles (`index.md`) and regular pages (`about.md`)**

---

Would you like me to extend this archetype so it **detects the section type automatically** (e.g., if it’s in `/posts/`, `/docs/`, etc.) and adds a dynamic `type:` field accordingly? That’s handy for large multi-section sites.

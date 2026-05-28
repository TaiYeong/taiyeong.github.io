# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this site is

Personal knowledge-base blog (taiyeong.github.io) for a VFX pipeline TD. Built with Jekyll using the `sighingnow/jekyll-gitbook` remote theme. Posts cover pipeline tooling, USD, Houdini, Katana, Blender, CMake, Docker, Python, and AI tools.

## Local development

```sh
bundle exec jekyll serve
```

Browse at `http://localhost:4000`. The site rebuilds on file changes (`regenerate: true` in `_config.yml`).

## Adding or editing posts

- Files live in `_posts/` and must be named `YYYY-MM-DD-title.md`
- `temp_posts/` is a staging area — move a file to `_posts/` to publish it
- Required front matter:

```yaml
---
title: My Title
author: taiyeong.song
category: pipeline   # controls URL path: /pipeline/YYYY-MM-DD-title.html
layout: post
---
```

- Permalink pattern: `/:categories/:year-:month-:day-:title:output_ext`

## Heading rules (affects sidebar TOC)

- `##` — main section title (appears in sidebar)
- `###` — sub title (appears in sidebar)
- `####` and deeper — **do not appear** in the sidebar TOC (`h_max: 3` in `_config.yml`)

## Sidebar navigation

The left sidebar is auto-generated from `_posts` (reverse chronological) and then `_pages` collections. Each post becomes one entry; its in-page headings expand when that page is active. The divider between sections is inserted automatically after each collection.

## Site structure

| Path | Purpose |
|---|---|
| `_posts/` | Published markdown posts |
| `temp_posts/` | Drafts / in-progress posts (not built by Jekyll) |
| `_pages/` | Static pages (About, Contact, design drafts) |
| `_includes/` | Liquid partials (toc, toc-date, metadata templates, analytics) |
| `_layouts/` | `home.html` for the index, `search-base.html` |
| `assets/` | Images, GitBook JS/CSS assets, search index |
| `_site/` | Build output — do not edit directly |

## Theme customisation

The site uses the `sighingnow/jekyll-gitbook` remote theme. Local overrides go in `_includes/`, `_layouts/`, or `assets/`. Avoid editing files under `assets/gitbook/` — those are theme copies that can be overwritten.

## Plugins in use

`jekyll-feed`, `jekyll-readme-index`, `jemoji`, `jekyll-admin`

`jekyll-admin` provides a GUI at `http://localhost:4000/admin` when serving locally.

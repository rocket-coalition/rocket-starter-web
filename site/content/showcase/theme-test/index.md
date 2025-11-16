---
title: "Theme Test"
description: "Minimal canvas to verify custom theme tokens."
summary: "Tiny markdown page to validate the blueprint palette."
draft: false
weight: 40
layoutVariant: "single"
---

## Theme Test · Hello World

This page is intentionally barebones so we can observe how the `blueprint` theme tokens affect headings, body copy, buttons, and cards without any extra styling noise.

<div class="flex flex-col gap-6">

  <h1>H1 Heading</h1>
  <h2>H2 Heading</h2>
  <h3>H3 Heading</h3>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur maxime ducimus, corporis distinctio autem reiciendis.
  </p>

  <div class="card bg-base-100 border border-base-300 shadow-lg">
    <div class="card-body">
      <h3 class="card-title">Card Sample</h3>
      <p>Cards inherit surfaces (`--surface`, `--fg`) so any shifts in the blueprint palette show up here immediately.</p>
      <div class="card-actions">
        <button class="btn btn-primary">Primary Action</button>
        <button class="btn btn-secondary">Secondary</button>
      </div>
    </div>
  </div>

  <div class="flex items-center gap-3">
    <span>Range token check</span>
    <input type="range" min="0" max="100" value="40" class="range range-primary" />
  </div>
</div>

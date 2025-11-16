---
title: "Theme Diagnostics"
description: "Reference canvas that exercises every major Rocket UI surface."
summary: "Typography, components, and utilities in one place to validate theme tokens."
draft: false
weight: 50
layoutVariant: "single"
---

## Mission

`test2` exists as a fully instrumented page so we can validate palette, typography, surfaces, and component semantics whenever we update theme tokens. Everything below is rendered with default Rocket + DaisyUI classes—no custom overrides—so any visual changes come directly from the theme configuration.

## Typography & Copy Blocks

<article class="prose prose-lg max-w-none">
  <h1>Display Heading</h1>
  <p class="lead">Lead text uses `--fg-muted` so it immediately reflects ink adjustments. Resize your browser to observe fluid type scaling.</p>
  <h2>Section Heading</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, ratione. Vitae repellat ratione porro ea dignissimos corporis quasi at a.</p>
  <blockquote>
    <p>Blockquotes consume `--border` and `--fg-muted`, highlighting how dividers adapt between light and dark palettes.</p>
  </blockquote>
  <h3>Sub Heading</h3>
  <ul>
    <li>List items use semantic spacing tokens.</li>
    <li>Links such as <a href="#">this sample link</a> follow the primary ramp.</li>
    <li><code>Inline code</code> adopts surface tokens.</li>
  </ul>
</article>

## Buttons & Badges

<div class="flex flex-wrap gap-4 items-center">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-ghost">Ghost</button>
  <button class="btn btn-outline">Outline</button>
  <span class="badge badge-primary">badge</span>
  <span class="badge badge-secondary">badge</span>
  <span class="badge badge-outline">light badge</span>
</div>

## Cards & Surface Depth

<div class="grid gap-6 md:grid-cols-2">
  <div class="card bg-base-100 border border-base-300 shadow-lg">
    <div class="card-body">
      <p class="card-title">Panel · Quiet</p>
      <p>Uses `--surface`, `--border`, and `--shadow-base` to render a gentle glass effect.</p>
      <div class="card-actions">
        <button class="btn btn-primary btn-sm">Action</button>
        <button class="btn btn-ghost btn-sm">Ghost</button>
      </div>
    </div>
  </div>
  <div class="card bg-base-200 border border-base-300 shadow-md">
    <div class="card-body">
      <p class="card-title">Panel · Accent</p>
      <p>Demonstrates surface hover tokens and secondary actions.</p>
      <div class="stats stats-vertical shadow">
        <div class="stat">
          <div class="stat-title">Telemetry</div>
          <div class="stat-value text-primary">72%</div>
          <div class="stat-desc">Primary ramp in numeric context.</div>
        </div>
        <div class="stat">
          <div class="stat-title">Momentum</div>
          <div class="stat-value text-secondary">9.2</div>
          <div class="stat-desc">Secondary ramp sample.</div>
        </div>
      </div>
    </div>
  </div>
</div>

## Status & Alerts

<div class="space-y-4">
  <div class="alert alert-success">
    <span>Success · Mirrors `--success` tokens.</span>
  </div>
  <div class="alert alert-warning">
    <span>Warning · Pulls from `--warning` ramp.</span>
  </div>
  <div class="alert alert-error">
    <span>Error · Useful for checking contrast.</span>
  </div>
</div>

## Forms & Controls

<form class="grid gap-4 md:grid-cols-2">
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">Name</span>
    </div>
    <input type="text" placeholder="Ada Lovelace" class="input input-bordered w-full" />
  </label>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">Email</span>
    </div>
    <input type="email" placeholder="ada@example.com" class="input input-bordered w-full" />
  </label>
  <label class="form-control md:col-span-2">
    <div class="label">
      <span class="label-text">Message</span>
    </div>
    <textarea class="textarea textarea-bordered" rows="4" placeholder="Tell us about your mission..."></textarea>
  </label>
  <div class="flex items-center gap-4 md:col-span-2">
    <div>
      <p class="text-sm font-semibold mb-1">Density</p>
      <input type="range" min="0" max="100" value="40" class="range range-primary" />
    </div>
    <label class="label cursor-pointer gap-2">
      <span class="label-text">Enable alerts</span>
      <input type="checkbox" class="toggle toggle-secondary" checked />
    </label>
  </div>
  <div class="md:col-span-2">
    <button class="btn btn-primary w-full md:w-auto">Submit</button>
  </div>
</form>

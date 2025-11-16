---
title: "Theme Primitives Atlas"
description: "Visual ledger of Rocket’s tokens so designers can validate palettes quickly."
summary: "Primary/secondary ramps, surfaces, actions, status states, and component depth showcased in one curated spread."
draft: false
weight: 45
layoutVariant: "single"
---

## Mission Control

The Theme Primitives Atlas exists as the canonical worksheet for every palette. All visuals below are rendered with the standard Rocket + DaisyUI stack; no per-component overrides. Update the tokens in `input.css`, reload this page, and you instantly see how typography, surfaces, actions, and statuses respond.

## Palette Seeds

<div class="section" data-theme="blueprint">
  <h3>Primary Ramp</h3>
  <div class="token-grid">
    <div class="token-swatch" style="--swatch-color: var(--primary-50);">
      <p class="token-swatch__label">primary-50</p>
      <p class="token-swatch__value">var(--primary-50)</p>
      <div class="token-swatch__meta">
        <p>Mist surface · cards</p>
      </div>
    </div>
    <div class="token-swatch" style="--swatch-color: var(--primary-100);">
      <p class="token-swatch__label">primary-100</p>
      <p class="token-swatch__value">var(--primary-100)</p>
      <div class="token-swatch__meta">
        <p>Hover tint</p>
      </div>
    </div>
    <div class="token-swatch" style="--swatch-color: var(--primary-300);">
      <p class="token-swatch__label">primary-300</p>
      <p class="token-swatch__value">var(--primary-300)</p>
      <div class="token-swatch__meta">
        <p>Outline accents</p>
      </div>
    </div>
    <div class="token-swatch" style="--swatch-color: var(--primary-500); --swatch-ink: var(--on-primary);">
      <p class="token-swatch__label">primary-500</p>
      <p class="token-swatch__value">var(--primary-500)</p>
      <div class="token-swatch__meta">
        <p>CTA baseline</p>
      </div>
    </div>
    <div class="token-swatch" style="--swatch-color: var(--primary-700); --swatch-ink: var(--on-primary);">
      <p class="token-swatch__label">primary-700</p>
      <p class="token-swatch__value">var(--primary-700)</p>
      <div class="token-swatch__meta">
        <p>Pressed states</p>
      </div>
    </div>
  </div>

  <h3>Secondary Ramp</h3>
  <div class="token-grid">
    <div class="token-swatch" style="--swatch-color: var(--secondary-50);">
      <p class="token-swatch__label">secondary-50</p>
      <p class="token-swatch__value">var(--secondary-50)</p>
      <div class="token-swatch__meta">
        <p>Analytics backdrop</p>
      </div>
    </div>
    <div class="token-swatch" style="--swatch-color: var(--secondary-200);">
      <p class="token-swatch__label">secondary-200</p>
      <p class="token-swatch__value">var(--secondary-200)</p>
      <div class="token-swatch__meta">
        <p>Pill outlines</p>
      </div>
    </div>
    <div class="token-swatch" style="--swatch-color: var(--secondary-400);">
      <p class="token-swatch__label">secondary-400</p>
      <p class="token-swatch__value">var(--secondary-400)</p>
      <div class="token-swatch__meta">
        <p>Support CTAs</p>
      </div>
    </div>
    <div class="token-swatch" style="--swatch-color: var(--secondary-500); --swatch-ink: var(--on-secondary);">
      <p class="token-swatch__label">secondary-500</p>
      <p class="token-swatch__value">var(--secondary-500)</p>
      <div class="token-swatch__meta">
        <p>Accent buttons</p>
      </div>
    </div>
    <div class="token-swatch" style="--swatch-color: var(--secondary-700); --swatch-ink: var(--on-secondary);">
      <p class="token-swatch__label">secondary-700</p>
      <p class="token-swatch__value">var(--secondary-700)</p>
      <div class="token-swatch__meta">
        <p>Luminous highlights</p>
      </div>
    </div>
  </div>
</div>

## Surfaces & Ink

<table>
  <thead>
    <tr>
      <th>Token</th>
      <th>Variable</th>
      <th>Intent</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Canvas</td>
      <td><code>var(--bg)</code></td>
      <td>Base document background.</td>
    </tr>
    <tr>
      <td>Panel</td>
      <td><code>var(--surface)</code></td>
      <td>Cards, sheets, dialog bodies.</td>
    </tr>
    <tr>
      <td>Panel Hover</td>
      <td><code>var(--surface-hover)</code></td>
      <td>Interactive cards &amp; tables.</td>
    </tr>
    <tr>
      <td>Text</td>
      <td><code>var(--fg)</code></td>
      <td>Body copy, table text.</td>
    </tr>
    <tr>
      <td>Muted</td>
      <td><code>var(--fg-muted)</code></td>
      <td>Captions, placeholders.</td>
    </tr>
    <tr>
      <td>Heading</td>
      <td><code>var(--heading)</code></td>
      <td>Display typography &amp; hero copy.</td>
    </tr>
    <tr>
      <td>Divider</td>
      <td><code>var(--divider)</code></td>
      <td>Section separators, timeline rails.</td>
    </tr>
  </tbody>
</table>

## Actions & Status

<table>
  <thead>
    <tr>
      <th>Intent</th>
      <th>Token</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Primary Action</td>
      <td><code>var(--action-primary)</code></td>
      <td>Raised CTA buttons, hero links.</td>
    </tr>
    <tr>
      <td>Primary Hover</td>
      <td><code>var(--action-primary-hover)</code></td>
      <td>Button hover fill &amp; outlines.</td>
    </tr>
    <tr>
      <td>Secondary Action</td>
      <td><code>var(--action-secondary)</code></td>
      <td>Alternative CTAs, switch toggles.</td>
    </tr>
    <tr>
      <td>Info</td>
      <td><code>var(--info)</code></td>
      <td>Analytics cards, helpful banners.</td>
    </tr>
    <tr>
      <td>Success</td>
      <td><code>var(--success)</code></td>
      <td>Positive alerts, badges.</td>
    </tr>
    <tr>
      <td>Warning</td>
      <td><code>var(--warning)</code></td>
      <td>Caution alerts, system notifications.</td>
    </tr>
    <tr>
      <td>Error</td>
      <td><code>var(--error)</code></td>
      <td>Destructive actions, validation errors.</td>
    </tr>
  </tbody>
</table>

## Component Stack

<div class="grid gap-6 md:grid-cols-3">
  <div class="card bg-base-100 border border-base-300 shadow-lg">
    <div class="card-body gap-4">
      <p class="card-title text-sm uppercase tracking-[0.25em] text-[var(--fg-muted)]">Buttons</p>
      <p>Uses <code>--btn-bg</code>, <code>--btn-fg</code>, and <code>--btn-shadow</code>. Hover to test gradients.</p>
      <div class="flex gap-3 flex-wrap">
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-ghost">Ghost</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-100 border border-base-300 shadow-lg">
    <div class="card-body gap-4">
      <p class="card-title text-sm uppercase tracking-[0.25em] text-[var(--fg-muted)]">Inputs</p>
      <p>Pulls <code>--input-border</code>, <code>--surface</code>, and <code>--fg</code>.</p>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Email</span>
        </div>
        <input class="input input-bordered" placeholder="commander@rocket" />
      </label>
      <label class="form-control">
        <div class="label">
          <span class="label-text">Range</span>
        </div>
        <input type="range" min="0" max="100" value="35" class="range range-primary" />
      </label>
    </div>
  </div>

  <div class="card bg-base-100 border border-base-300 shadow-lg">
    <div class="card-body gap-4">
      <p class="card-title text-sm uppercase tracking-[0.25em] text-[var(--fg-muted)]">Alerts</p>
      <p>Each alert uses the status tokens and on-color pairings.</p>
      <div class="alert alert-success">
        <span>Success channel</span>
      </div>
      <div class="alert alert-warning">
        <span>Warning channel</span>
      </div>
      <div class="alert alert-error">
        <span>Error channel</span>
      </div>
    </div>
  </div>
</div>

## Motion & Depth References

<ul>
  <li><strong>Shadows:</strong> <code>--shadow-sm</code>, <code>--shadow-md</code>, <code>--shadow-lg</code> adapt automatically when <code>--shadow-color-base</code> changes.</li>
  <li><strong>Motion curves:</strong> Buttons and cards rely on <code>--motion-in-smooth</code>, <code>--motion-fast-out</code> (defined in Rocket UI); override those to alter easing globally.</li>
  <li><strong>Radius:</strong> Use <code>--radius-sm</code>, <code>--radius-base</code>, <code>--radius-lg</code> to keep rounded corners cohesive.</li>
</ul>

## Checklist

- [ ] Adjust the six LCH seeds.
- [ ] Tune surfaces & ink.
- [ ] Map Daisy base tokens.
- [ ] Review on `/showcase/test2/` for component fidelity.
- [ ] Promote stable palettes to `rocket-ui.css`.

Use this page whenever you craft a new theme to guarantee the palette works for every primitive—before it ships to the rest of the site.

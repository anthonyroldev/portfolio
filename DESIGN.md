---
name: "Anthony Rolland Portfolio"
description: "Text-first design system for Anthony Rolland’s engineering portfolio."
colors:
  primary: "#9bb9f3"
  on-primary: "#101010"
  primary-light: "#2555a5"
  on-primary-light: "#ffffff"
  background: "#101010"
  card: "#191919"
  foreground: "#f2f2f2"
  muted-foreground: "#b4b4b4"
  border: "#383838"
  background-light: "#fafafa"
  card-light: "#ffffff"
  foreground-light: "#191919"
  muted-foreground-light: "#565656"
  border-light: "#d6d6d6"
  input: "#767676"
  destructive: "#ffb4ad"
  destructive-light: "#a52e28"
typography:
  display-compact:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  display-wide:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: "2.5rem"
    letterSpacing: "-0.025em"
  section-title:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: "2rem"
    letterSpacing: "-0.025em"
  section-title-wide:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.3333333333
    letterSpacing: "-0.025em"
  card-title:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.75rem"
  featured-title:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: "1.75rem"
  body:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  control:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: "1.25rem"
  field:
    fontFamily: "Inter, \"Inter Fallback\", system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  technical-label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: "1.25rem"
rounded:
  control-card: "8px"
spacing:
  step-4: "4px"
  step-8: "8px"
  step-12: "12px"
  step-16: "16px"
  step-24: "24px"
  step-32: "32px"
  step-48: "48px"
  step-64: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.control}"
    rounded: "{rounded.control-card}"
    padding: "8px 16px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.control}"
    rounded: "{rounded.control-card}"
    padding: "8px 16px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
  locale-control:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.control}"
    rounded: "{rounded.control-card}"
    padding: "0px 12px"
    height: "36px"
  theme-control:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control-card}"
    width: "36px"
    height: "36px"
  text-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.field}"
    rounded: "{rounded.control-card}"
    padding: "4px 12px"
    height: "44px"
  text-area:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.field}"
    rounded: "{rounded.control-card}"
    padding: "8px 12px"
  navigation-link:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.control}"
    height: "44px"
  navigation-link-current:
    textColor: "{colors.foreground}"
  mobile-drawer:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    padding: "24px"
    width: "288px"
  project-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control-card}"
  technology-tag:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.technical-label}"
    rounded: "{rounded.control-card}"
    padding: "2px 10px"
  button-primary-light:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.on-primary-light}"
  button-outline-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.foreground-light}"
  button-outline-hover-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.foreground-light}"
  project-card-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.foreground-light}"
  technology-tag-light:
    textColor: "{colors.muted-foreground-light}"
  field-error-message:
    textColor: "{colors.destructive}"
  field-error-message-light:
    textColor: "{colors.destructive-light}"
---

# Design System: Anthony Rolland Portfolio

## Overview

**Creative North Star: "Sober, text-first presentation"**

The portfolio uses a flat, restrained layout for technical work. Strong headings establish the reading order, a single blue accent identifies actions, and a neutral surface gives project artwork room to stand out. The shell works across both languages and both themes.

**Key Characteristics**

- Inter for interface text and reading, with system monospace for technical labels.
- A shared content column, compact controls, and borders that define where groups begin and end.

## Colors

A single blue accent sits against neutral backgrounds in both themes. The dark palette is the default. Light and System are available in the theme menu.

- Use `primary` or `primary-light` for the main action, text links, focus outlines, and project status. Pair a solid accent fill with the corresponding `on-primary` token.
- Blend the accent toward the regular foreground for the role and internship availability on Home. Use solid text in forced-colors mode.
- Use `background` for the document and sticky header, `card` for cards and menus, and `muted-foreground` for supporting copy. Adapt each role to the active theme.
- Use `border` for separators and card edges, and `input` for the stronger border of fields and outline controls. The control border is shared by both themes.
- Use `destructive` and `destructive-light` on invalid field borders and error messages.

The active palette and semantic aliases come from `@app/globals.css`.

## Typography

Inter is used for headings, reading and interface text. The Home name uses the compact display below 768px and the wide display from 768px. Standard page titles use `page-title` at both widths.

Use the section-title roles for section headings. Project cards use their own smaller titles. Use `body` for descriptions and prose, `control` for button and navigation text, and `field` for entered text. Use monospace for technology tags, project status and timeline dates.

## Layout

- Center the shared header, main and footer on a shell capped at 1100px. Use 16px gutters below 768px and 32px from 768px. Cap reading and form content at 68ch.
- Use the 4px grid for spacing. The repeated steps are 4, 8, 12, 16, 24, 32, 48 and 64px. Project cards use a 16px gap with one column below 640px, two from 640px and three from 960px.
- The header stays at the top. It is 56px below 768px and 64px from 768px. Anchor navigation uses the header height plus 16px of clearance.
- The selected projects on Home stack until 768px, then form three columns. The contact name and email fields share a row from 640px. At that width, About also places its timeline dates beside the entries.

## Elevation & Depth

Cards and menus use a separate surface tone and a fine border. The primary and outline actions used in the page body sit flat. Focus uses an accent outline with a 2px offset. The mobile drawer uses a dim scrim and a bordered edge.

## Shapes

Controls, cards and the portrait share an 8px corner radius. Use 1px borders on cards and controls. Keep project media in a 16:9 slot and fit the full image inside it. The outer card clips its artwork to the top corners. Technology tags wrap as compact chips with a neutral 1px border.

## Components

- **Primary and outline buttons.** Use the filled action for the main task and the outline for secondary actions and header controls. The button height is 44px. The filled button softens its fill on hover, and the outline button takes the card surface. Preserve the focus outline and keep the button in place while the form submits.
- **Navigation.** Inline links appear from 768px. The active link uses the foreground color and an underline, with `aria-current` for assistive technology. At narrower widths a right drawer (288px, capped by the viewport) holds the route links. A 36px icon-only theme button is centered with the links and has a localized accessible name. Preserve the skip link, drawer focus trap and focus return.
- **Footer.** Group the CV and profile links separately from the two-language segmented control. The active segment uses the accent fill and an accessible current state. Use the shared card radius and border.
- **Project card.** Use the same border and surface for the text-only preview and the media card. Card content is padded 16px below 768px and 24px from 768px. Keep the source link at the bottom so links in a row align.
- **Fields.** Keep a visible label above each control. Single-line inputs are 44px tall. The message field starts at 112px and can grow vertically. Invalid fields show a stronger color and an associated message. Submission feedback is announced in a live region.
- **Motion.** Use 150ms for control color changes, drawer transitions and the sliding language indicator. The reduced-motion preference removes transitions and animations.

## Do's and Don'ts

- Do use readable text labels for navigation and pair the current-route color with an underline.
- Do pair the accent fill with its theme-specific foreground and reserve the error color for validation or failure.
- Do let long copy, labels, and tags wrap within their columns in both English and French.
- Don't add gradients, glass effects, neon, or decorative icons to the shell.
- Don't make color the only cue for keyboard focus, link purpose, or current navigation.

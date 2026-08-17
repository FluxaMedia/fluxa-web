---
title: "Known Limitations"
description: "Important constraints and tradeoffs to understand before troubleshooting."
section: reference
icon: "alert-circle"
order: 6
badges: ["Limits"]
---

## No hosted content

Fluxa does not host, bundle, or provide media. Content availability depends entirely on the addons you install.

## Addon reliability

Addons are third-party services. They can change, go offline, rate-limit, return incomplete data, or stop supporting a provider without Fluxa changing.

## Offline use

Fluxa can open locally and show existing local state, but watching requires network access because streams come from online sources. Offline downloads are not currently supported.

## Platform differences

Desktop, Android, and web/webOS aim for feature parity, but playback behavior can vary because hardware decoding, OS permissions, and video output systems differ by platform. webOS in particular has more limited hardware decoding than desktop.

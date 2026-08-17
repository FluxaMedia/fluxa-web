---
title: "Data Locations"
description: "Where Fluxa stores data and how to back up or move it."
section: "Operations"
icon: "database"
order: 2
badges: ["Backup", "Desktop", "Android"]
---

## Desktop paths

| Platform | Typical path |
| --- | --- |
| Windows | `%APPDATA%\fluxa-desktop` |
| macOS | `~/Library/Application Support/fluxa-desktop` |
| Linux | `~/.local/share/fluxa-desktop` |

## Android storage

Android app data is managed by Android. Normal users should use Nuvio sync or in-app export flows instead of manually editing app storage.

## Backup and restore

1. Close Fluxa fully.
2. Copy the app data folder for your platform.
3. Install Fluxa on the new device.
4. Close Fluxa, replace the new data folder with your backup, then reopen.

For collections only, use collection export/import instead of copying the whole app data folder.

## When to use Nuvio instead

Use Nuvio when you want ongoing sync between devices. Use manual backups when moving one installation or saving a snapshot before risky changes.

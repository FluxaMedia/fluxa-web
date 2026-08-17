---
title: "Platform Install Notes"
description: "Install and platform-specific notes for Windows, macOS, Linux, Android, and webOS."
section: "Operations"
icon: "monitor-smartphone"
order: 4
badges: ["Windows", "macOS", "Linux", "Android", "webOS"]
---

## Windows

Use the EXE installer from the release page. If Windows SmartScreen appears, confirm the publisher/source and choose to run anyway only if you downloaded from the official release.

Uninstall from Windows Settings like any other app. App data may remain unless you remove it manually.

## macOS

Open the DMG and drag Fluxa into Applications. If macOS blocks first launch, go to System Settings -> Privacy & Security and choose Open Anyway for Fluxa.

## Linux

Use DEB for Debian/Ubuntu, RPM for Fedora/RHEL, or AppImage for portable use. If video output is black, test Wayland vs X11 and see the playback troubleshooting notes.

## Android

Download the APK from official releases. Android may ask for permission to install unknown apps for your browser or file manager. Disable that permission again after installing if you prefer a stricter setup.

## webOS

Fluxa also runs as a native app on LG webOS TVs, built from the same web codebase. Enable Developer Mode on your TV through the LG Developer Mode app, note the IP address and passphrase it shows, then use it to sideload the `.ipk` package from the latest release.

Developer Mode installs expire after a set number of days unless the TV stays signed in with a paired LG developer account — reinstall if the app disappears.

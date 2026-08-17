---
title: "Debrid & Usenet Setup"
description: "Generic setup flow for debrid and Usenet without locking you into a provider."
section: operations
icon: "server"
order: 1
badges: ["Debrid", "Usenet"]
---

## Generic setup flow

1. Create an account with the provider you choose.
2. Find the provider API key or credentials in its dashboard.
3. Open the stream addon's configuration page.
4. Paste the key, choose quality filters, and save.
5. Install the generated manifest URL in Fluxa.

## Cached vs uncached

Cached means the provider already has the file and can stream immediately. Uncached means the provider needs to fetch it first, which can take time or fail if the source is weak.

## Direct stream vs torrent

Debrid and some Usenet integrations convert source references into direct HTTP streams. Direct streams usually start faster and avoid peer-swarm reliability problems.

## Provider neutrality

Fluxa does not require a specific provider. Choose based on addon support, region, price, reliability, and your own needs.

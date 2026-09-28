<!-- Moonlight Hosts — 15:6 Ventures — © 15:6 Ventures — proprietary -->
# Architecture Decisions

- Store uploaded production media as Lovable CDN asset pointers and import each pointer's `url`, keeping large binaries out of the source repository.
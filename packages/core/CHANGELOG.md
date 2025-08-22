# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-22

### Added
- Initial release of the Astro Awaited/Fallback integration
- `Awaited` component for conditional rendering with fallback support
- `Fallback` component for loading states and placeholders
- Automatic transformation of `Fallback` components to include `slot="fallback"` attribute
- TypeScript support with full type definitions
- Configurable component and slot names
- Zero-configuration setup with sensible defaults

### Features
- Works with server-rendered pages
- Fast and reliable AST transformation during build time
- Minimal build-time overhead
- Compatible with Astro 4.0.0 and higher


---
name: ecc-security-check
allowed-tools: Read, Grep, Glob
description: Run security vulnerability scan
model: fable
effort: xhigh
disable-model-invocation: true
metadata:
  author: <author>
  version: "1.0"
---

Analyze the codebase for security vulnerabilities including:

- SQL injection risks
- XSS vulnerabilities
- Exposed credentials
- Insecure configurations

# Analytics Helper Extension

content_scripts: servem para ser executados automaticamente nas páginas definidas
ex:

```json
  "content_scripts": [
    {
      "matches": [
        "http://*/*",
        "https://*/*"
      ],
      "js": [
        "content.js"
      ]
    }
  ],
```

background.service_worker: vai ser executado programaticamente nas páginas de "host_permissions" ou na activeTab

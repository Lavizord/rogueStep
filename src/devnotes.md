### Guia Desenvolvimento Inicial.

- Antes de fazer novas páginas (hub, combat, character screen, inventário) completar as seguintes coisas:

  1. Limpar os bugs / tech debt.
  2. Terminar de implementar o alerta de morte (com butões de escolha placeholder).
  3. substituir addItem() pelo handleAddBackpack na use scene ( pode já não ser válido confirmar 11/04/2023)
  4. Implementar sistema que impeça a história inicial de se repetir (guardar os storyIds e excluir dee novos).
  5. Implementar UI na appbar com steps.
  6. Fazer uma validação para apenas aparecerem as notificações que mudam valores (excluir notificações de 0).
     ?. Por último deve ser implementado routing.

  A EVITAR até os pontos acima serem concluidos.

  1.  Mexer no inventário.
  2.  Aumenter os pontos acima.

### Bugs para tratar

#### Tech Debt

## SceneChoice.tsx

- Está limitado a 2 choices, mais do que isso vai cheirar mal. ?
  dá o seguinte erro.
  act_devtools_backend.js:2655 Warning: Encountered two children with the same key, `3`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.

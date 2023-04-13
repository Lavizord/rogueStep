### Guia Desenvolvimento Inicial.

- Antes de fazer novas páginas (hub, combat, character screen, inventário) completar as seguintes coisas:

  1. Limpar os bugs / tech debt. (LAVI)
  2. ~~Terminar de implementar o alerta de morte (com butões de escolha placeholder). (MIGUEL)~~
  3. Implementar sistema que impeça a história inicial de se repetir (guardar os storyIds e excluir dee novos). (LAVI)
  4. ~~Implementar UI na appbar com steps. (MIGUEL)~~
  5. ~~Fazer uma validação para apenas aparecerem as notificações que mudam valores (excluir notificações de 0). (MIGUEL)~~
     ~~?. Por último deve ser implementado routing. (MIGUEL)~~

  A EVITAR até os pontos acima serem concluidos.

  1.  Mexer no inventário.
  2.  Aumenter os pontos acima.

  Novos Pontos:

  1. Avaliar se não é melhor mostrar as notificações dos items no useBackpack.
     - Assim temos controlo sobre a mensagem, podendo alertar que a backpack se encontra cheia, etc?

### Bugs para tratar

#### Tech Debt

## SceneChoice.tsx

1.  React Component with the same ID:

    Quando temos duas esclhas com o mesmo ID dá o seguinte erro.

    act_devtools_backend.js:2655 Warning: Encountered two children with the same key, `3`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.

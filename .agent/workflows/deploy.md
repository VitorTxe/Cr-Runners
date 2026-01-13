---
description: Deploy do site usando Vercel
---

Este workflow irá te guiar para colocar seu site no ar usando a Vercel.

1.  Primeiro, vamos instalar a CLI da Vercel globalmente (opcional, mas recomendado) ou usar npx.
    // turbo
    Comando: `npm install -g vercel` (Se falhar, usaremos npx)

2.  Login na Vercel
    Execute o comando abaixo e siga as instruções no navegador:
    Comando: `npx vercel login`

3.  Fazer o Deploy
    Agora vamos enviar seu projeto. Aceite as configurações padrão (apenas dê Enter em tudo).
    Comando: `npx vercel`

4.  Deploy de Produção
    Se tudo estiver certo no passo anterior (que cria um link de "preview"), vamos jogar para a produção oficial:
    Comando: `npx vercel --prod`

---
**Alternativa via GitHub (Recomendado para longo prazo):**
1. Crie um repositório no GitHub.
2. Envie seu código para lá (`git push`).
3. Acesse [vercel.com](https://vercel.com), clique em "Add New Project" e importe seu repositório.
4. A Vercel fará deploys automáticos a cada alteração que você fizer!

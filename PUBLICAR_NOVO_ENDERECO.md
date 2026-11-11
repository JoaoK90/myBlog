# Publicar em joaok90.github.io

O Hugo está configurado para `https://joaok90.github.io/`. O remoto local ainda aponta para `https://github.com/JoaoK90/myBlog.git`.

Para o endereço sem `/myBlog/`, o GitHub Pages precisa de um repositório chamado `joaok90.github.io`, conforme a [documentação do GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites).

1. No GitHub, abra o repositório `myBlog`, entre em **Settings → General** e renomeie o repositório para `joaok90.github.io`.
2. Depois da renomeação, atualize o endereço remoto local:

```powershell
cd C:\Aulas\HugoWebsite\jsite
git remote set-url origin https://github.com/JoaoK90/joaok90.github.io.git
```

3. Revise e publique suas alterações com o fluxo normal de commit e push. Em **Settings → Pages**, a fonte de publicação deve continuar como **GitHub Actions**.

O workflow existente recebe o endereço real do GitHub Pages automaticamente; após a renomeação, ele passa a gerar os links para a raiz. A renomeação remota e o push não foram executados nesta edição.

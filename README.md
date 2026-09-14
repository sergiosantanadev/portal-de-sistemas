# Portal de Sistemas — Distrito Nordeste Central

Portal web estático para centralizar o acesso aos sistemas administrativos do **Distrito Nordeste Central / Coordenação Integral de Ministérios (CIM)**.

## Melhorias implementadas

Esta versão reorganiza o projeto e aplica as recomendações técnicas:

- HTML, CSS e JavaScript separados.
- Pasta `assets/` para recursos visuais.
- Catálogo de sistemas separado em `js/systems.config.js`.
- Favicon em SVG.
- Open Graph e Twitter Card para compartilhamento.
- Skeleton/loading state para os cards.
- Feedback visual por toast ao copiar links e ao tentar acessar uma configuração inválida.
- Fallback de cópia quando a Clipboard API não estiver disponível.
- Validação das URLs antes de liberar o acesso.
- Validação de IDs duplicados no catálogo.
- Mantidas busca, status, compartilhamento via WhatsApp, responsividade e acessibilidade existentes.

## Estrutura

```text
portal-sistemas/
├── assets/
│   ├── favicon.svg
│   └── og-image.png
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── systems.config.js
├── index.html
└── README.md
```

> `assets/logo.png` é reservado para a logo institucional oficial. O portal oculta a imagem automaticamente quando esse arquivo ainda não estiver disponível.

## Tecnologias

- HTML5
- CSS3
- JavaScript ES Modules
- Web Clipboard API
- WhatsApp Web/App para compartilhamento

Não é necessário Node.js, npm, banco de dados ou backend para executar a versão atual.

## Configuração dos sistemas

Todos os sistemas ficam em:

```text
js/systems.config.js
```

Exemplo:

```javascript
{
  id: "novo-sistema",
  nome: "Novo Sistema",
  descricao: "Descrição do sistema.",
  icone: "🖥️",
  categoria: "Administrativo",
  status: "disponivel",
  access: true,
  url: "https://exemplo.com"
}
```

### Status permitidos

```text
disponivel
manutencao
indisponivel
```

### Regras de acesso

O botão **Acessar sistema** só é liberado quando:

```text
status = disponivel
access = true
URL HTTP/HTTPS válida
```

URLs vazias, `#`, inválidas ou com protocolos diferentes de HTTP/HTTPS não são liberadas.

## Validação de URLs

A função `validateSystemUrl()` em `js/app.js` valida o endereço usando `URL` nativa do navegador e aceita somente:

```text
http:
https:
```

Quando um sistema está configurado como disponível, mas possui URL inválida, o card apresenta **Configuração inválida** e não permite acesso.

## Loading state

Os cards iniciam com skeleton placeholders enquanto o módulo JavaScript é carregado. Depois da inicialização, o conteúdo real substitui os placeholders.

Isso evita uma tela visualmente vazia durante o carregamento.

## Feedback de cópia

A opção **Copiar link** usa `navigator.clipboard.writeText()` e apresenta:

```text
✓ Link copiado
```

Além disso, existe um fallback com `document.execCommand('copy')` para ambientes em que a Clipboard API não esteja disponível.

Um toast também confirma a operação.

## Open Graph

O `index.html` possui metadados para compartilhamento:

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Portal de Sistemas — Distrito Nordeste Central">
<meta property="og:description" content="...">
<meta property="og:image" content="./assets/og-image.png">
```

Também foi adicionada configuração para Twitter/X.

### Importante para produção

Para compartilhamento consistente em redes sociais, configure `og:image` com uma URL absoluta do domínio de produção, por exemplo:

```html
<meta property="og:image" content="https://seu-dominio.com/assets/og-image.png">
```

## Favicon

O favicon está em:

```text
assets/favicon.svg
```

A referência está no `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="./assets/favicon.svg">
```

## Logo institucional

Coloque a logo oficial em:

```text
assets/logo.png
```

O HTML utiliza:

```html
<img
  src="./assets/logo.png"
  alt="Distrito Nordeste Central"
  class="brand-logo-image"
>
```

Não substitua a logo oficial por um símbolo genérico em produção.

## Execução local

Como o projeto utiliza ES Modules, recomenda-se executar por um servidor HTTP local, em vez de abrir o `index.html` diretamente via `file://`.

Com Python:

```bash
python -m http.server 8000
```

Depois:

```text
http://localhost:8000
```

## Deploy

O projeto é compatível com hospedagem estática, incluindo:

- GitHub Pages
- Vercel
- Netlify
- Servidor web tradicional

Não existe etapa obrigatória de build.

## GitHub Pages

```bash
git init
git add .
git commit -m "feat: portal de sistemas"
git branch -M main
git remote add origin SEU_REPOSITORIO
git push -u origin main
```

Depois, habilite GitHub Pages no repositório.

## Vercel

Importe o repositório e publique como site estático. Não é necessário definir um comando de build para esta versão.

## Netlify

Conecte o repositório ou publique diretamente a pasta do projeto.

## Arquitetura

```text
                 ┌─────────────────────┐
                 │      index.html      │
                 │  estrutura da UI    │
                 └──────────┬──────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
      ┌───────▼────────┐        ┌────────▼─────────┐
      │ css/styles.css │        │    js/app.js     │
      │   apresentação │        │ regras e eventos │
      └────────────────┘        └────────┬─────────┘
                                         │
                                ┌────────▼─────────────┐
                                │ js/systems.config.js │
                                │ catálogo de sistemas │
                                └──────────────────────┘
```

## Segurança

O portal é apenas a camada de apresentação e encaminhamento. Ele não deve armazenar:

- senhas;
- tokens privados;
- chaves secretas de API;
- credenciais administrativas;
- informações sensíveis.

A autenticação e autorização devem ser realizadas pelos sistemas de destino.

Os links externos são abertos com:

```html
target="_blank"
rel="noopener noreferrer"
```

## Sistemas atualmente configurados

- Assembleias Locais — disponível e com acesso configurado.
- Cadastro de Igrejas — cadastro do card, acesso ainda não publicado.
- Relatórios Administrativos — cadastro do card, acesso ainda não publicado.
- Documentos Administrativos — cadastro do card, acesso ainda não publicado.
- Agenda Administrativa — em manutenção.
- Administrador/Secretário — indisponível.

## Checklist antes da publicação

- [ ] Colocar `assets/logo.png` oficial.
- [ ] Revisar URLs dos sistemas.
- [ ] Conferir status e `access`.
- [ ] Definir URL absoluta do `og:image`.
- [ ] Testar busca.
- [ ] Testar abertura dos sistemas.
- [ ] Testar WhatsApp.
- [ ] Testar cópia dos links.
- [ ] Testar desktop, tablet e celular.
- [ ] Testar navegação por teclado.
- [ ] Testar os links publicados em HTTPS.

## Próxima evolução recomendada

Para uma futura versão administrativa, o catálogo pode migrar de um arquivo JavaScript para uma API e banco de dados, permitindo cadastro de sistemas, usuários, perfis, status, auditoria e monitoramento de disponibilidade sem editar o código-fonte.

## Organização

**Distrito Nordeste Central**  
**Coordenação Integral de Ministérios — CIM**  
**Igreja do Nazareno**

# Office Portal

Um projeto estático (HTML/CSS/JavaScript) com várias páginas demonstrativas para um portal de escritório / showcase de produto. O repositório contém versões diferentes (basic, intermediate, final) e recursos estáticos na pasta `assets`.

## Visão geral
- Projeto estático sem backend.
- Principais tecnologias: HTML5, CSS3, JavaScript (client-side).

## Estrutura principal (arquivos importantes)
- `index.html` — Página principal / ponto de entrada.
- `basic.html` — Versão básica/demonstrativa.
- `intermediate.html` — Versão intermediária.
- `final.html` — Versão final.
- `product.html` — Página de produto/detalhes.
- `viewer.html` — Página de visualização (viewer).
- `assets/` — Imagens e recursos estáticos.
- `.gitignore` — Arquivo gitignore (atualmente vazio).

## Como visualizar / executar localmente
Opção 1 — Abrir diretamente:
1. Clone o repositório:
   - `git clone https://github.com/danielmeireles1981/Office_Portal.git`
2. Abra `index.html` no navegador (duplo clique). Alguns recursos podem requerer servidor local dependendo de caminhos relativos.

Opção 2 — Servir com um servidor HTTP simples (recomendado):
- Python 3:
  - Na raiz do repositório: `python -m http.server 8000`
  - Abra: `http://localhost:8000/index.html`
- Node (npx serve):
  - `npx serve .`
- VS Code (extensão Live Server):
  - Abra a pasta do projeto e clique em "Go Live".

## Uso das páginas
- `index.html`: página inicial com navegação para as demos.
- `basic.html`, `intermediate.html`, `final.html`: versões progressivas do design do portal.
- `product.html`: exemplo de página de produto/detalhes.
- `viewer.html`: exemplo de visualização de conteúdo.

## Boas práticas e sugestões
- Adicionar `package.json` e scripts (`start`, `build`) se for usar bundlers/linters.
- Configurar ESLint/Prettier e stylelint para qualidade do código.
- Adicionar workflow de CI (GitHub Actions) para validação.
- Adicionar `LICENSE` (por exemplo MIT) para explicitar termos de uso.
- Minificar CSS/JS e configurar cache busting para produção.
- Melhorar acessibilidade (HTML semântico, atributos ARIA quando necessário).

## Contribuição
Contribuições são bem-vindas:
1. Fork do repositório
2. Criar branch: `git checkout -b feature/minha-melhora`
3. Commit e push
4. Abrir Pull Request descrevendo a mudança

## Licença
Nenhuma licença encontrada. Recomenda-se adicionar uma (ex.: MIT) para esclarecer termos de uso.

## Contato
- Repositório: https://github.com/danielmeireles1981/Office_Portal
- Autor: danielmeireles1981
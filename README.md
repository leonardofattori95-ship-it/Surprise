# Surpresa — site

Protótipo do Surpresa como projeto React de verdade (Vite + Tailwind), pronto pra rodar local e publicar.

## Rodando local

Precisa ter o [Node.js](https://nodejs.org) instalado (versão 18 ou mais recente).

```bash
npm install
npm run dev
```

Isso abre o site em `http://localhost:5173` — mexa no código, salve, e a página atualiza sozinha.

## Publicando na Vercel (deixar o link público)

**Opção mais simples — sem usar terminal:**

1. Crie uma conta em [vercel.com](https://vercel.com) (dá pra usar login do GitHub).
2. Suba essa pasta pra um repositório no GitHub (pode arrastar os arquivos direto pela interface do GitHub, sem precisar de comandos).
3. Na Vercel, clique em "Add New Project", escolha esse repositório.
4. A Vercel detecta sozinha que é um projeto Vite — não precisa mudar nenhuma configuração. Clique em "Deploy".
5. Em cerca de 1 minuto, você recebe uma URL pública (tipo `surpresa.vercel.app`).

Depois disso, toda vez que uma nova versão do código for enviada pro GitHub, a Vercel atualiza o site sozinha.

## Estrutura do projeto

```
src/
  App.jsx       → toda a lógica e telas do app
  main.jsx      → ponto de entrada do React
  index.css     → estilos globais e fonte
tailwind.config.js → cores e fontes usadas (paleta já aprovada)
```

## O que já está pronto

- Lista de participantes com contagem regressiva de aniversário
- Cadastro de novo participante (vira automaticamente o "logado" pra montar a própria lista)
- Lista de desejos com nota, link do produto e ofertas de exemplo
- Registro de compra do presente com divisão automática entre o grupo
- Marcar dívida como paga
- Arquivo do próprio aniversariante fica "confidencial" (lista de desejos visível, mas nada da parte financeira)

## Próximos passos (ver roadmap completo)

- Conectar banco de dados (Firebase) pra dados persistirem de verdade
- Autenticação/login por grupo
- Notificações de aniversário chegando

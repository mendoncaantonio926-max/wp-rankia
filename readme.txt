=== RankIA — SEO AEO GEO Optimizer ===
Contributors: rankia
Tags: seo, aeo, geo, content optimization, ai, gutenberg
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPL-2.0+
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Otimize seus posts para SEO, AEO e GEO diretamente no editor WordPress com inteligência artificial.

== Description ==

O RankIA adiciona uma sidebar ao editor Gutenberg que permite otimizar qualquer post ou página com um clique. A IA analisa seu conteúdo, pesquisa o mercado em tempo real e reescreve com foco em:

* **SEO** — Keywords, headings, readability, pirâmide invertida
* **AEO** — Estrutura FAQ, perguntas H2, Answer Engine Optimization
* **GEO** — Tabelas de dados, citações de autoridade, Generative Engine Optimization

**Como funciona:**

1. Escreva seu post normalmente
2. Abra a sidebar RankIA no Gutenberg
3. Escolha o tom de voz e o foco de otimização
4. Clique em "Otimizar Agora"
5. Compare os scores no modal e aplique ao post

**Scores calculados:**

* SEO Score (keyword density, H1/H2/H3, readability)
* AEO Score (direct answer box, PAA matching)
* GEO Score (information gain, citações)
* InfoGain (densidade de insights únicos)
* Humanity (variação natural de escrita)
* Final Score (média ponderada)

**Requisitos:**

* Conta RankIA com plano Max (inclui API key)
* WordPress 6.0+ com editor Gutenberg

== Installation ==

1. Faça upload da pasta `wp-rankia` para `/wp-content/plugins/`
2. Ative o plugin em Plugins no painel WordPress
3. Vá em Configurações → RankIA
4. Cole sua API key (gerada em rankia.com.br/settings)
5. Abra qualquer post no Gutenberg e use a sidebar RankIA

== Frequently Asked Questions ==

= Preciso de uma conta RankIA? =

Sim. O plugin se conecta à API do RankIA para processar otimizações. Você precisa de uma API key válida, disponível no plano Max.

= O plugin funciona com o editor clássico? =

Não. O RankIA funciona exclusivamente com o editor Gutenberg (Block Editor).

= Meu conteúdo é enviado para servidores externos? =

Sim. O conteúdo do post é enviado para a API do RankIA (rankia.com.br) para processamento. A conexão é feita via HTTPS e o conteúdo não é armazenado permanentemente.

= Posso escolher o tom de voz? =

Sim. Tons disponíveis: Explicativo, Jornalístico, Conversacional, Técnico e Institucional.

== Screenshots ==

1. Sidebar RankIA no editor Gutenberg
2. Seleção de tom de voz e foco
3. Modal de comparação de scores
4. Página de configurações com API key

== Changelog ==

= 1.0.0 =
* Sidebar Gutenberg com seleção de tom e foco
* Modal de comparação de scores (SEO, AEO, GEO, InfoGain, Humanity)
* Proxy REST seguro (API key server-side)
* Página de configurações para API key
* Botão "Aplicar ao Post" para substituir conteúdo

== Upgrade Notice ==

= 1.0.0 =
Versão inicial do plugin RankIA para WordPress.

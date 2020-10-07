# 4x2048
Uma versão minha do famoso jogo 2048 com o diferencial de você precisar alcançar 2048 em 4 tabuleiros ao mesmo tempo

## Conceito
Aqui vão as ideias norteadoras do projeto

### Design
Uma página com 4 tabuleiros 4x4, acima dos tabuleiros tem um contador indicando há quanto tempo a pessoa está jogando.

### Regra de negócio
Quando a pessoa apertar alguma das setas direcionais convencionais ou alternativas (W,A,S e D) irá enviar ao servidor uma requisição de movimento e este retornará com os movimentos, transformações e/ou acrescimos que serão feitos em cada tabuleiro. Toda informação vai estar no servidor utilizando o `$_SESSION` do PHP.

### Extras
Alguns recursos extras que poderão ser incluídos no jogo são:
- [ ] Implementar o jogo para o celular
- [ ] A possibilidade de definir níveis de dificuldade, onde haverá um tempo limite para concluir os 4 tabuleiros
- [ ] Medalhas diferentes considerando o quão perto dos quatro 2048 o jogador chegou ou o quão rápido
- [ ] Placar global - requer algum tipo de banco de dados, então possivelmente não iremos implementar
- [ ] Missôes que vão aparecendo que ao serem concluídas ajudam o jogador ou dão pontos extras

## Diário
Caso você queira acompanhar o progresso do projeto, considere visitar nosso [Diário de bordo](https://github.com/samuel-ifrs/4x2048/issues/1)

## Tecnologias utilizadas
Esse projeto pretende utilizar apenas as tecnologias básicas de qualquer projeto web, sendo estas:
- HTML
- Javascript
- CSS
- PHP

## Ideias para expandir
Algumas ideias que definitivamente não serão implementadas neste repositório, mas que você pode usar:
- **Modo infinito** - Não será implementado porque penso que chegar no 2048 já vai ser desafio suficiente para o jogador cansar
- **Salvar e carregar o jogo** - Seria fácil implementar, mas acredito que o jogo seja rápido o suficiente para que a pessoa possa ou perder ou ganhar antes de querer salvar
- **Vidas** - Acredito que manter a dificuldade dos jogos seja a chave para mantê-los intrigantes
- **Utilizar WebSockets com Node.JS** - Como a proposta do projeto é ser algo acessível e podemos construir o jogo sem utilizar WebSockets porque o assincronismo não é algo vital para ele, pela ausência de multiplayer, optei por não utilizar essas tecnologias
- **Multiplayer local cooperativo e competitivo** - Não será implementado porque acredito que fugiria muito da proposta inicial do jogo
- **Multiplayer online cooperativo e competitivo** - Não será implementado porque acredito que fugiria muito da proposta inicial do jogo e, além disso, iria ampliar muito o nível de complexidade do projeto pela necessidade de assincronismo.

## Sobre o desenvolvedor
Me chamo **Samuel Andrade**, sou gaucho de Gravataí-RS. Estou começando no GitHub pois quero mostrar pra comunidade de programadores algumas ideias que tenho e meu jeito de programar. Posso trabalhar com as linguagens `C#`, `Delphi`, `Assembly x86/x64`, `PHP`, `JS`, `CSS`, `SQL`, além de engenharia reversa. Sou, além de programador, matemático, o que me ajuda a entender com bastante facilidade assuntos que envolvam lógica, não é um desafio hercúlio aprender uma nova linguagem ou tecnologia. Estou aberrto a oportunidades que surjam nas áreas de programação ou hacking ético (ou não, brincadeirinha).

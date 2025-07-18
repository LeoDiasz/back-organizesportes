
## Leonardo Duarte Dias - Projeto OrganizEsportes



## Repositórios

- [ ] Front-End - [https://github.com/LeoDiasz/front-organizesportes](https://github.com/LeoDiasz/front-organizesportes)

- [ ] Back-End - [https://github.com/LeoDiasz/back-organizesportes](https://github.com/LeoDiasz/back-organizesportes)

## **Resumo do Projeto**

Este projeto tem como objetivo desenvolver um aplicativo voltado para organizadores de partidas esportivas, como futebol e vôlei, oferecendo funcionalidades que facilitem o gerenciamento das partidas, com convites, confirmação de presença e histórico de participantes. Normalmente, os organizadores realizam os convites, diretamente pela ferramenta WhatsApp, por listagem, com os usuários copiando a lista e colocando por cima, muitas vezes dá-se o problema de comunicação.

---

## **Definição do Problema**

Normalmente, a gerencia das partidas dos esportes, se da por grupo no WhatsApp, onde os organizadores criam a listagem por lá. Porém, acontece muito problema das pessoas que estão colocando seu nome na lista, se perderem nas informações de quem confirmou, tendo que ficar arrastando a listagem para copiar, colar e colocar seu nome, e ver se não tiraram seu nome sem querer, ficando com uma péssima organização. Também, na hora que esta acontecendo o evento, é difícil gerenciar quem venho ou não da listagem, tendo problemas em atraso ao inicio da partida.



---

## **Objetivos**

### **Objetivo Geral**

O Objetivo do projeto é facilitar o gerenciamento de partidas, para maior agilidade ao iniciar elas e a melhora na organização.

### **Objetivos Específicos**

- Permitir criação das partidas de acordo com a modalidade esportiva (Vôlei, Futebol Society, Futebol Campo);

- Convidar pessoas através de um link;

- Controlar confirmações de presença dos convidados na hora do evento;

- Gerar histórico de partidas com registro de quem compareceu.



Os Jogadores terão uma melhor agilidade para inicio das partidas.

---

## **Stack Tecnológico**

- **Frontend:** React (Responsivo para Mobile)

    - Porque o React é o mais adaptado para solução, com uma facilidade a mais de desenvolver o projeto.

- **Backend:** NodeJS e Prisma

    - NodeJS por ter integrações e comunicações facilitadas com React.

    - Prisma Orm para facilitar a comunicação com banco de dados.

- Banco de Dados: PostgreSQL

    - Banco de dados relacional.

- Hospedagem: Supabase (Banco de dados), Render (Back-end), Vercel(Front-end)

- **Autenticação:** Firebase Auth e JWT (com login por Conta google)

    - Para melhorar a experiência dos usuários, utilização do firebase, para facilitar a autenticação dos organizadores somente com a conta do google.

    - JWT para validar os usuários que estão autenticados e tem permissão para se comunicar com o back-end

---

## **Descrição da Solução**

O usuário ira acessar uma tela inicial, onde ira ter a opção de entrar pelo google. Após realizar o login, o usuário irá entrar na tela onde ira criar sua organização, colocando o nome da organização que será criada e a modalidade principal. Após criada a organização, será redirecionado para tela de home, onde ira exibir a listagem das partidas criadas e a funcionalidade para criar a partida.

Com a criação da partida, o usuário conseguira escolher a modalidade de esporte que será criada, a data, horário, duração, local, numero mínimo de participantes para o evento acontecer, e o máximo também. Após sua criação, o usuário será encaminhado para o detalhes da partida.

Na tela de detalhes da partida, o organizador tera as informações da partida, e as opções para gerenciar. Terá um botão para criar convite para os jogadores se registrarem na partida, gerando um link que será distribuído para os participantes. A tela mostrara os jogadores registrados, com a possibilidade do organizador confirmar a presença dos jogadores na hora do jogo, e gerar uma lista com os confirmados para dividir os times em aplicativos externos. 

O organizador, tera a possibilidade também de adicionar jogadores, no intuito se tiver pessoas a mais que não foram chamadas na hora do jogo, registra-las. Também tem a possibilidade de cancelar a partida, e após acabar a partida, finaliza-la.



### Telas

- Login

- Criar Organização

- Home

- Criar Partida

- Detalhes da Partida

- Convite da Partida

---

## **Arquitetura**

#### Relacionamento Banco de dados

[Relacionamento organizEsportes](https://app.capacities.io/41ef5056-e1bd-4d9b-88ab-9879dc7d3866/c15e19d9-1248-41d3-b945-e80e0bcf1c28)

---

## **Validação**

- [x] Autenticação

    - [x] Somente usuários que realizaram login podem cadastrar uma organização.

    - [x] Conta do usuário google não pode ter mais de uma organização

    - [x] Se usuário tiver organização e não estiver logado, é redirecionado para pagina de login.

- [x] Tela Login

    - [x] Ao clicar no botão de login, e se autenticar, usuário é encaminhado para tela de criar organização.

    - [x] Se usuário entrar na tela de login, e já estiver logado, é encaminhado para tela de criar organização se não possuir organização criada, ou para tela home, se tiver organização.

- [x] Tela Criar Organização

    - [x] Validação dos campos obrigatórios para cadastro.

    - [x] Valida se não possui uma organização já pelo e-mail do usuário, se tiver, é encaminhado para tela de home.

    - [x] Realizando cadastro da organização, após preencher os campos, e encaminhando para tela home.

- [x] Tela Home

    - [x] Se não possuir partidas cadastradas, mostra mensagem que não possui partidas.

    - [x] Ao possuir partidas cadastradas, esta exibindo a lista.

    - [x] Ao clicar botão de criar partida, redirecionando para tela de criação de partidas.

    - [x] Listagem de partidas

        - [x] Para as partidas que estiverem com status cancelada, desabilita o encaminhamento para o detalhes da partida

        - [x] Partidas com status finalizada e agendada, permiti entrar no detalhes da partida

    - [x] Filtragem das partidas

- [x] Header

    - [x] Ao clicar no avatar, e clicar no botão sair, esta deslogando.

- [x] Tela Criar Partida

    - [x] Validação dos campos obrigatórios.

    - [x] Usuário não pode colocar número máximo de jogadores menor que o número minimo.

    - [x] Número mínimo não pode ser maior que número máximo.

    - [x] Organizador não poderá criar partida se já estiver partida cadastrada no local, no mesmo horário, ou no prazo da duração da partida.

- [x] Tela Detalhes da Partida

    - [x] Se a partida estiver com status finalizada, ira exibir a lista de quem compareceu na partida e quem não compareceu.

    - [x] Se a partida estiver com status finalizada, usuário não poderá fazer ações de gerar convite, adicionar jogador e cancelar partida.

    - [x] Gerar Convite

        - [x] Ao clicar no botão gerar convite, irá gerar a URL de convite para o usuário e será copiada.

        - [x] Ao entrar na url, irá exibir a tela para usuário preencher seus dados para entrar na partida.

    - [x] Adicionar jogadores

        - [x] Todos os campos obrigatórios.

        - [x] Ao cadastrar, se jogador já estiver registrado na partida, da mensagem de erro que já existe jogador.

        - [x] Se o limite de jogadores já ocorrer, não a opção de registrar na partida.

    - [x] Cancelar partida

        - [x] Usuário só poderá cancelar partida se o status estiver Agendada.

        - [x] Ao clicar no botão cancelar partida, irá abrir um modal para confirmar se quer cancelar realmente.

        - [x] Ao cancelar, redirecionado para tela home.

    - [x] Lista de jogadores

        - [x] Se não tiver jogadores na partida, exibe aviso que esta sem jogadores registrados.

        - [x] Se tiver jogadores, exibe a listagem de jogadores.

        - [x] Ao clicar no checkbox de presença do jogador, confirma presença na partida.

        - [x] Ao clicar no botão de deletar, deleta o jogador da partida.

    - [x] Finalizar partida

        - [x] Usuário só poderá finalizar partida, se tiver um jogador na partida.

        - [x] Ao finalizar partida, é redirecionado para tela de home.

    - [x] Gerar lista

        - [x] Se tiver jogador com presença confirmada, botão de gerar lista é habilitado.

        - [x] Ao clicar no botão de gerar lista, copia a lista dos jogadores confirmados.

    - [x] Convite de Usuários

        - [x] Ao Clicar no botão gerar convite, esta gerando o convite, copiando o link da url.

- [x] Tela convite de jogadores

    - [x] Ao entrar na tela, irá exibir as informações da partida.

    - [x] Jogador conseguindo cadastrar-se na partida.

---

---

## **Conclusões**

A partir do desenvolvimento e dos estudos em torno do problema, conclui-se que o objetivo foi sanado com sucesso. Com as funcionalidades fornecidas, o organizador terá um gerenciamento otimizado das partidas, garantindo agilidade no início e uma organização superior para todos os envolvidos.

---

---

## **Perspectivas Futuras**

- Separação de times por preferência de posição, modalidade e rank;

- Envio de mensagens para os jogadores via WhatsApp e e-mail;

- Abertura para publico das partidas dos organizadores;

- Sistema de votação para os jogadores das partidas;

---

## **Referências Bibliográficas**

- Firebase Documentation. Disponível em: [https://firebase.google.com/docs](https://firebase.google.com/docs)

- WhatsApp Business API. Disponível em: [https://www.whatsapp.com/business/api](https://www.whatsapp.com/business/api)

- Ferramenta CopaFacil: [https://copafacil.com/](https://copafacil.com/)

- Prisma: [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction)

- Appito: [https://appito.com/](https://appito.com/)

- Supabase: [https://supabase.com/docs](https://supabase.com/docs)


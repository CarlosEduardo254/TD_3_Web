# Gestor de Tarefas Pessoais

![Capa do Projeto](https://placehold.co/1200x600/10102E/E0E0E0?text=Gestor%20de%20Tarefas)

## Descrição do Projeto

Este é um projeto Full Stack de um sistema de gerenciamento de tarefas pessoais, desenvolvido como trabalho prático para a disciplina de Desenvolvimento Web. A aplicação permite que os usuários se cadastrem, façam login e gerenciem seus próprios projetos, tarefas e etiquetas de forma organizada e intuitiva.

O sistema foi construído com uma arquitetura desacoplada, consistindo em um **Back-end** robusto em ASP.NET Core Web API e um **Front-end** moderno e reativo em React com TypeScript. Toda a aplicação é containerizada com Docker, garantindo portabilidade e facilidade de execução em qualquer ambiente.

---

## Funcionalidades

-   **Autenticação de Usuários:** Sistema seguro de registo e login com JWT (JSON Web Tokens).
-   **Gerenciamento de Projetos:** Crie, edite e exclua projetos para agrupar suas tarefas.
-   **Gerenciamento de Tarefas:** Adicione tarefas a projetos, defina prazos, status (Pendente, Em Andamento, Concluído) e associe etiquetas.
-   **Gerenciamento de Etiquetas:** Crie etiquetas coloridas para categorizar e identificar visualmente suas tarefas.
-   **Interface Reativa:** Experiência de usuário fluida e sem recarregamentos de página, construída com React.
-   **Containerização:** Aplicação completa (Front-end e Back-end) empacotada em uma única imagem Docker para fácil execução.

---

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

### **Back-end**

-   **C#** e **.NET**
-   **ASP.NET Core Web API** para a construção dos endpoints RESTful.
-   **Entity Framework Core** com provedor **In-Memory** para persistência de dados.
-   **JWT (JSON Web Tokens)** para autenticação e autorização.
-   **Princípios SOLID** aplicados na arquitetura de Serviços e Repositórios.

### **Front-end**

-   **React** com **TypeScript**
-   **Vite** como ferramenta de build e desenvolvimento.
-   **React Router DOM** para gerenciamento de rotas.
-   **Axios** para comunicação com a API do back-end.
-   **Tailwind CSS** para estilização moderna e responsiva.

### **DevOps**

-   **Docker** para containerização da aplicação completa.

---

## Como Executar com Docker

Para executar este projeto, é necessário ter o **Docker Desktop** instalado e em execução.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/carloseduardo254/td_3_web.git](https://github.com/carloseduardo254/td_3_web.git)
    cd td_3_web
    ```

2.  **Construa a imagem Docker:**
    Na raiz do projeto (onde o `Dockerfile` está localizado), execute o comando abaixo. Este processo irá compilar o back-end, o front-end e empacotá-los numa única imagem.
    ```bash
    docker build -t gestor-tarefas .
    ```

3.  **Execute o container:**
    Após a imagem ser construída, inicie o container com o comando:
    ```bash
    docker run -p 8080:8080 -d gestor-tarefas
    ```

4.  **Acesse a aplicação:**
    Abra o seu navegador e acesse **[http://localhost:8080](http://localhost:8080)**.

---

## 📸 Evidências de Funcionamento

A seguir, algumas capturas de ecrã que demonstram a aplicação em funcionamento.

### Tela de Login e Registo

![Tela de Login](https://github.com/user-attachments/assets/d559e96e-10b0-4989-ab3c-cb15723a6c6e)

### Dashboard Principal

![Dashboard](https://github.com/user-attachments/assets/96fe7586-03ba-4a80-8df6-b437fd05a8dd)

### Gerenciamento de Projetos

![Gerenciamento de Projetos](https://github.com/user-attachments/assets/1781349c-8096-4112-8ce3-d10fb2a2ab4f)

### Gerenciamento de Tarefas

![Gerenciamento de Tarefas](https://github.com/user-attachments/assets/9108a494-b4fc-4d10-ad85-b72f470d409d)

![Edição de Tarefas](https://github.com/user-attachments/assets/12fb32c7-99eb-475d-8547-3121d71a653c)

### Prova de Consumo da API (Network Tab)

![Consumo da API](https://github.com/user-attachments/assets/5f5e20a7-e5c5-488a-b0c7-b20023c755bc)

---


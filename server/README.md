# App
<img src="./assets/mjv.png">

E-Order Service: It is an application that controls service orders for cell phone technical assistance, making it easier for employees and customers to use.

## RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar uma ordem de serviço;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o número da ordem de serviço;


- [x] Deve ser possível o usuário realizar login;
- [x] Deve ser possível validar o login de um usuário;
- [x] Deve ser possível cadastrar um usuário;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder se cadastrar com um username duplicado;
- [x] O usuário não pode listar notas sem estar logado;
- [x] O cliente só pode pesquisar uma nota de serviço que seja de algum serviço seu;
- [x] só um usuario logado poderá cadastrar uma nota de serviço;
- [x] Só um usuário poderá manipular(CRUD) uma nota de serviço;


## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

```

 # Clone the remote repository
 $ git clone git@github.com:Felipe10amaral/MJV-School-Node.git

```

```

 # Install dependencies
 $ npm install

```

```

 # start project
 $ npm run dev

```

- A biblioteca ZOD é utilizada para validação
# Web Chef Api

Uma API de receitas baseada nas APIs [The Meal DB](https://www.themealdb.com/api.php) e [The Cocktail DB](https://www.thecocktaildb.com/api.php). A principal vantagem de utilizar a Web Chef API é o design mais moderno, tanto no retorno da API quanto na aplicação.

## Documentação da API

#### Retorna todas as receitas

```http
  GET /recipes
```

#### Retorna uma receita

```http
  GET /recipes/id/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da receita que você quer |

#### Retorna as receitas que tenham o nome

```http
  GET /recipes/name/${name}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O `name` da receita que você quer |

#### Retorna todas as receitas de comidas

```http
  GET /recipes/meals
```

#### Retorna todas as receitas de bebidas

```http
  GET /recipes/drinks
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL` Aqui você vai colocar o link de conexão ao mongodb.

`SECRET_KEY` Aqui você vai colocar a chave secreta do JWT.

Vale lembrar que um exemplo dessas variáveis de ambiente está no `.env.example`.

## Rodando a aplicação

Para rodar o projeto você precisa ter na sua máquina o [docker](https://www.docker.com/).

Com o docker instalado e as variáveis de ambiente configuradas basta executar:

```bash
docker compose up
```

Após isso o docker compose vai iniciar o container do mongodb na porta `27017` e o container da api na porta `3001`. Você pode mudar as portas da api ou outras configurações no arquivo `docker-compose.yml`.

## Stack utilizada

**Back-end:** Node, Express, Prisma, MongoDB, Zod

Aqui vale lembrar que o uso do Prisma com o MongoDB é possível mas não é recomendável. O uso nesse projeto foi mais uma prova de conceito, o Prisma é o ORM e não um ODM.

## Autores

- [@walefy](https://www.github.com/walefy)
- [@leandro](https://github.com/leandrojpcarvalho)

// Zmienna z adresem API GraphQL (używamy testnetu do testów)
export const GRAPHQL_ENDPOINT = "https://graphql.testnet.iota.cafe/";

// 1. Definiujemy czyste zapytanie GraphQL
export const TRANSACTIONS_QUERY = `
  query {
    transactionBlocks(last: 10) {
      nodes {
        digest
        sender {
          address
        }
        effects {
          status
        }
      }
    }
  }
`;

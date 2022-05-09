import { JsonSQLite } from "@capacitor-community/sqlite";

export const db: JsonSQLite = {
    database: "gogocash_db",
    version: 1,
    encrypted: false,
    mode: "full",
    tables: [
      {
        name: "unit",
        schema: [
          { column: "id", value: "PRIMARY KEY" },
          { column: "name", value: "VARCHAR(255) NOT NULL" },
          { column: "symbol", value: "VARCHAR(10) NOT NULL" }
        ],
        values: [
          [1, "Jour", "Jr"],
          [2, "Mois", "M"],
          [3, "Année", "An"],
          [4, "Semaine", "S"]
        ]
      },
      {
        name: "category",
        schema: [
          { column: "id", value: "PRIMARY KEY" },
          { column: "name", value: "VARCHAR(255) NOT NULL" },
          { column: "flow", value: "VARCHAR(2) NOT NULL" },
          { column: "icon", value: "VARCHAR(50) NOT NULL" }
        ],
        values: [
          [1, "Salaire", "IN", ""],
          [2, "Cotisation", "IN", ""],
          [3, "Loyer", "OUT", ""],
          [4, "Transport", "OUT", ""]
        ]
      },
      {
        name: "budget",
        schema: [
          { column: "id", value: "PRIMARY KEY" },
          { column: "year", value: "INTEGER NOT NULL" },
          { column: "month", value: "INTEGER NOT NULL" },
          { column: "startBalance", value: "INTEGER NOT NULL" }
        ]
      },
      {
        name: "budget_line",
        schema: [
          { column: "id", value: "PRIMARY KEY" },
          { column: "quantity", value: "INTEGER" },
          { column: "budget_id", value: "INTEGER NOT NULL" },
          { column: "category_id", value: "INTEGER NOT NULL" },
          { column: "unit_id", value: "INTEGER NOT NULL" },
          { column: "amountPrevision", value: "INTEGER" },
          {
            foreignkey: "unit_id",
            value: "REFERENCES unit(id)"
          },
          {
            foreignkey: "budget_id",
            value: "REFERENCES budget(id)"
          },
          {
            foreignkey: "category_id",
            value: "REFERENCES category(id)"
          }
        ]
      },
      {
        name: "budget_transaction",
        schema: [
          { column: "id", value: "PRIMARY KEY" },
          { column: "budget_line_id", value: "INTEGER NOT NULL" },
          { column: "amount", value: "INTEGER" },
          { column: "date", value: "datetime NOT NULL" },
          { column: "description", value: "TEXT NOT NULL" },
          {
            foreignkey: "budget_line_id",
            value: "REFERENCES budget_line(id)"
          }
        ]
      }
    ]
  }
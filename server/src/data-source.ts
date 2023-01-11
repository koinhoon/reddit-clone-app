import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "postgres",
    synchronize: true, // 서버 실행시마다 entity랑 DB랑 sync를 맞춤, 개발은 sync하다 날려도됨 (운영에서는 false)
    logging: false,
    entities: [
        "src/entities/**/*.ts"
    ],
    migrations: [],
    subscribers: [],
})

/*https://bookstore.demoqa.com/swagger/
Напишите АПИ-тесты:


Генерация токена успешно*/

import { createUser, generateToken } from "../src/api.js";

describe('Some API tests for bookstore service', () => {
    //Создание пользователя c ошибкой, логин уже используется
    it('Create user with error: login already used', async () => {
        const response = await createUser('Tname', 'Londo3@@')
        const data = await response.json()
        expect(response.status).toBe(406)
        expect(data.code).toBe('1204')
        expect(data.message).toBe('User exists!')
    })

    //Создание пользователя c ошибкой, пароль не подходит
    it('Create user with error: Password is not fit the requirements', async () => {
        const response = await createUser('Tname', 'Londo3@')
        const data = await response.json()
        expect(response.status).toBe(400)
        expect(data.code).toBe('1300')
        expect(data.message).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    })
    //Создание пользователя успешно
    it('User succesfully created', async () => {
        const response = await createUser('Tname2', 'Londo3@@')
        const data = await response.json()
        expect(response.status).toBe(201)
        expect(data.userID).toBeDefined()
        expect(data.username).toBe('Tname1')
        expect(data.books).toEqual([])
    })
    //Успешная генерация токена
    it('Token successfully generated', async () => {
        const response = await generateToken('Tname', 'Londo3@@')
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.token).toBeDefined()
        expect(data.expires).toBeDefined()
        expect(data.status).toBe('Success')
        expect(data.result).toBe('User authorized successfully.')
    })
    //Генерация токена c ошибкой
    it('Error on generating token', async () => {
        const response = await generateToken('Tname11111', 'Londo3@@')
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.token).toBe(null)
        expect(data.expires).toBe(null)
        expect(data.status).toBe('Failed')
        expect(data.result).toBe('User authorization failed.')
    })
})

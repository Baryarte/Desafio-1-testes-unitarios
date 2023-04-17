import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "./ICreateUserDTO";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to create a new user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "teste@teste.com",
            password: "123456"
        };

        const userCreated = await createUserUseCase.execute(user);

        expect(userCreated).toHaveProperty("id");
    });

    it("should not be able to create a new user with an email that already exists", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                email: "teste@teste.com",
                password: "123456"
            };

            await createUserUseCase.execute(user);

            await createUserUseCase.execute(user);

        }).rejects.toBeInstanceOf(CreateUserError);
    });

    
});
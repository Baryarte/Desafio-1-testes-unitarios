
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from '../createUser/ICreateUserDTO';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError';


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(
        () => {
            usersRepositoryInMemory = new InMemoryUsersRepository();
            authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
            createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        }
    );

    it("should be able to authenticate an user", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123456"
        };

        
        await createUserUseCase.execute(user);
        

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        console.log(result);

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user",  () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "falsepassword",
            });
        }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test Error",
                email: "user@test.com",
                password: "1234",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword",
            });
        }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
    })

});     
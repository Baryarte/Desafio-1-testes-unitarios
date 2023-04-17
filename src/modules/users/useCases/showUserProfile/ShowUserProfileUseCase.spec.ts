import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Show User Profile", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
    });

    it("should be able to show user profile", async () => {
        const user = {
            name: "User Test",
            email: "teste@teste.com",
            password: "123456"
        };

        const userCreated = await createUserUseCase.execute(user);

        const userShowed = await showUserProfileUseCase.execute(userCreated.id as string);

        expect(userShowed).toHaveProperty("id");
    });

    it("should not be able to show user profile if user does not exists", async () => {
        expect(async () => {
            await showUserProfileUseCase.execute("12345");
        }).rejects.toBeInstanceOf(ShowUserProfileError);
    });
    
})
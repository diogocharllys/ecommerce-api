import { prisma } from "../lib/prisma";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";

interface RegisterOutput {
  id: string;
  name: string;
  email: string;
}

interface LoginOutput {
  token: string;
}

export class AuthService {
  async register(data: RegisterInput): Promise<RegisterOutput> {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(data: LoginInput): Promise<LoginOutput> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error("Invalid credentials");

    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!passwordValid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      jwtConfig.secret as jwt.Secret,
      {
        expiresIn: jwtConfig.expiresIn as jwt.SignOptions["expiresIn"],
      }
    );

    return { token };
  }
}

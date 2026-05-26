import type { Request, Response } from "express";
import "dotenv/config";
import express from "express";
import { PrismaClient } from "../../generated/prisma_client/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const app = express();
const prisma = new PrismaClient({
  adapter,
});

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age, isMarried, sport } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age,
        isMarried,
        sport,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await prisma.user.delete({
      where: { id },
    });
    res.json(deleted);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
};

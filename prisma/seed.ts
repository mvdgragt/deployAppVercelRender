import { PrismaClient } from "../generated/prisma_client/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Michiel van der Gragt",
        email: "michiel.vandergragt@sundsgarden.se",
        age: 34,
        isMarried: true,
        sport: "cycling",
      },
      {
        name: "Erik Andersson",
        email: "erik.andersson@sundsgarden.se",
        age: 28,
        isMarried: false,
        sport: "running",
      },
      {
        name: "Anna Sjöberg",
        email: "anna.sjoberg@sundsgarden.se",
        age: 31,
        isMarried: true,
        sport: "swimming",
      },
      {
        name: "Lars Nilsson",
        email: "lars.nilsson@sundsgarden.se",
        age: 42,
        isMarried: true,
        sport: "cycling",
      },
      {
        name: "Karin Lundqvist",
        email: "karin.lundqvist@sundsgarden.se",
        age: 37,
        isMarried: false,
        sport: "running",
      },
      {
        name: "Johan Persson",
        email: "johan.persson@sundsgarden.se",
        age: 29,
        isMarried: false,
        sport: "swimming",
      },
      {
        name: "Elin Karlsson",
        email: "elin.karlsson@sundsgarden.se",
        age: 26,
        isMarried: false,
        sport: "cycling",
      },
      {
        name: "Oskar Bergström",
        email: "oskar.bergstrom@sundsgarden.se",
        age: 33,
        isMarried: true,
        sport: "running",
      },
      {
        name: "Sofia Nyman",
        email: "sofia.nyman@sundsgarden.se",
        age: 30,
        isMarried: false,
        sport: "swimming",
      },
      {
        name: "Hampus Eriksson",
        email: "hampus.eriksson@sundsgarden.se",
        age: 24,
        isMarried: false,
        sport: "cycling",
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

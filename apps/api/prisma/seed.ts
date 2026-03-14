import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedCategory = {
  slug: string;
  name: string;
  groupName: string;
};

const categories: SeedCategory[] = [
  // Anime
  { slug: "naruto", name: "Naruto", groupName: "Anime" },
  { slug: "bleach", name: "Bleach", groupName: "Anime" },
  { slug: "one-piece", name: "One Piece", groupName: "Anime" },
  { slug: "attack-on-titan", name: "Attack on Titan", groupName: "Anime" },
  { slug: "demon-slayer", name: "Demon Slayer", groupName: "Anime" },

  // Gaming
  { slug: "warhammer-40k", name: "Warhammer 40K", groupName: "Gaming" },
  { slug: "dota-2", name: "Dota 2", groupName: "Gaming" },
  { slug: "league-of-legends", name: "League of Legends", groupName: "Gaming" },
  { slug: "minecraft", name: "Minecraft", groupName: "Gaming" },
  { slug: "dark-souls", name: "Dark Souls", groupName: "Gaming" },

  // History
  { slug: "ancient-rome", name: "Ancient Rome", groupName: "History" },
  { slug: "ancient-egypt", name: "Ancient Egypt", groupName: "History" },
  { slug: "medieval-europe", name: "Medieval Europe", groupName: "History" },
  { slug: "japanese-history", name: "Japanese History", groupName: "History" },
  { slug: "world-war-2", name: "WW2", groupName: "History" },

  // Crafts
  { slug: "embroidery", name: "Embroidery", groupName: "Crafts" },
  { slug: "knitting", name: "Knitting", groupName: "Crafts" },
  { slug: "origami", name: "Origami", groupName: "Crafts" },
  { slug: "woodworking", name: "Woodworking", groupName: "Crafts" },
  { slug: "3d-printing", name: "3D Printing", groupName: "Crafts" },

  // Mythology
  { slug: "japanese-pantheon", name: "Japanese Pantheon", groupName: "Mythology" },
  { slug: "greek-mythology", name: "Greek Mythology", groupName: "Mythology" },
  { slug: "norse-mythology", name: "Norse Mythology", groupName: "Mythology" },
  { slug: "egyptian-gods", name: "Egyptian Gods", groupName: "Mythology" },

  // Science
  { slug: "astronomy", name: "Astronomy", groupName: "Science" },
  { slug: "biology", name: "Biology", groupName: "Science" },
  { slug: "physics", name: "Physics", groupName: "Science" },
  { slug: "mathematics", name: "Mathematics", groupName: "Science" },

  // Other
  { slug: "chess", name: "Chess", groupName: "Other" },
  { slug: "jazz-music", name: "Jazz Music", groupName: "Other" },
  { slug: "street-art", name: "Street Art", groupName: "Other" },
  { slug: "philosophy", name: "Philosophy", groupName: "Other" },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        slug: category.slug,
        name: category.name,
        groupName: category.groupName,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


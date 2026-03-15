"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const categories = [
        { slug: 'naruto', name: 'Naruto', groupName: 'Anime' },
        { slug: 'bleach', name: 'Bleach', groupName: 'Anime' },
        { slug: 'one-piece', name: 'One Piece', groupName: 'Anime' },
        { slug: 'attack-on-titan', name: 'Attack on Titan', groupName: 'Anime' },
        { slug: 'demon-slayer', name: 'Demon Slayer', groupName: 'Anime' },
        { slug: 'warhammer-40k', name: 'Warhammer 40K', groupName: 'Gaming' },
        { slug: 'dota-2', name: 'Dota 2', groupName: 'Gaming' },
        {
            slug: 'league-of-legends',
            name: 'League of Legends',
            groupName: 'Gaming',
        },
        { slug: 'minecraft', name: 'Minecraft', groupName: 'Gaming' },
        { slug: 'dark-souls', name: 'Dark Souls', groupName: 'Gaming' },
        { slug: 'ancient-rome', name: 'Ancient Rome', groupName: 'History' },
        { slug: 'ancient-egypt', name: 'Ancient Egypt', groupName: 'History' },
        { slug: 'medieval-europe', name: 'Medieval Europe', groupName: 'History' },
        {
            slug: 'japanese-history',
            name: 'Japanese History',
            groupName: 'History',
        },
        { slug: 'ww2', name: 'WW2', groupName: 'History' },
        { slug: 'embroidery', name: 'Embroidery', groupName: 'Crafts' },
        { slug: 'knitting', name: 'Knitting', groupName: 'Crafts' },
        { slug: 'origami', name: 'Origami', groupName: 'Crafts' },
        { slug: 'woodworking', name: 'Woodworking', groupName: 'Crafts' },
        { slug: '3d-printing', name: '3D Printing', groupName: 'Crafts' },
        {
            slug: 'japanese-mythology',
            name: 'Japanese Mythology',
            groupName: 'Mythology',
        },
        {
            slug: 'greek-mythology',
            name: 'Greek Mythology',
            groupName: 'Mythology',
        },
        {
            slug: 'norse-mythology',
            name: 'Norse Mythology',
            groupName: 'Mythology',
        },
        { slug: 'egyptian-gods', name: 'Egyptian Gods', groupName: 'Mythology' },
        { slug: 'astronomy', name: 'Astronomy', groupName: 'Science' },
        { slug: 'biology', name: 'Biology', groupName: 'Science' },
        { slug: 'physics', name: 'Physics', groupName: 'Science' },
        { slug: 'chess', name: 'Chess', groupName: 'Other' },
        { slug: 'jazz', name: 'Jazz Music', groupName: 'Other' },
        { slug: 'philosophy', name: 'Philosophy', groupName: 'Other' },
    ];
    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        });
    }
    console.log('Seed completed');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map
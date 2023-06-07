const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const path = require('path');
const bcrypt = require('bcryptjs');

async function main() {
    // ************* Delete and create admin *******************
    await prisma.user.deleteMany({
        where: {
            email: process.env.ADMIN_MAIL,
        },
    });
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(process.env.ADMIN_PASS.trim(), 10, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
    if (!hashedPassword) throw new Error('Error in Creating of Hashed Password');

    const superAdmin = await prisma.user.create({
        data: {
            role: 'admin',
            name: 'switch',
            email: process.env.ADMIN_MAIL,
            mobile: '999999999',
            password: hashedPassword,
            permissions: {
                case: ["all"],
                member: {
                    read: ["all"],
                    write: ["all"],
                    update: ["all"],
                    delete: ["all"]
                }
            },
            is_active: true,
            is_deleted: false
        },
    });
    if (!superAdmin) throw new Error('Admin Not Created');
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

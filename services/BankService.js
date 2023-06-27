const fp = require('fastify-plugin');

const bankService = (fastify) => {

    const create = async (data) => fastify.prisma.bank.create({
        data
    }).catch((err) => {
        throw err;
    });

    const read = async (cond = {}) => fastify.prisma.bank.findFirst({
        where: { is_deleted: false, ...cond },
    }).catch((err) => {
        throw err;
    });

    const update = async (id, data) => fastify.prisma.bank.update({
        where: { id },
        data,
    }).catch((err) => {
        throw err;
    });

    const all = async (page_no, no_of_records, search, cond = {}) => {
        const dataPipeline = [];
        const total_records_pipeline = []


        total_records_pipeline.push(
            {
                $match: {
                    is_deleted: false,
                    ...cond,
                },
            },
            {
                $count: 'count',
            }
        );

        dataPipeline.push(
            {
                $match: {
                    is_deleted: false,
                    ...cond
                },
            },
        );


        if (search) {
            dataPipeline.push({
                $match: {
                    $or: [
                        {
                            name: {
                                $regex: `.*${search}.*`,
                                $options: 'i',
                            },
                        },
                    ],
                },
            });
        }

        dataPipeline.push({
            $skip: page_no > 1 ? no_of_records * (page_no - 1) : 0,
        }, {
            $limit: no_of_records,
        });

        const pipeline = [
            {
                $facet: {
                    total_records: total_records_pipeline,
                    data: dataPipeline,
                },
            },
        ];

        return fastify.prisma.bank.aggregateRaw({ pipeline }).catch((err) => {
            throw err;
        });
    };

    return { create, read, all, update };
};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('bankService', bankService(fastify));
    next();
});

export default {
    type: "object",
    properties: {
        buttonId: { type: 'string' },
        navigationId: { type: 'string' },
        userId: { type: 'string' },
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' }

    },
    required: ['buttonId', 'navigationId', 'userId']
} as const;

export default {
  type: "object",
  properties: {
    buttonId: { type: 'string' },
    navigationId: { type: 'string' },
    userId: { type: 'string' },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' }
    // name: { type: 'string' }
  },
  required: ['buttonId', 'navigationId', 'userId']
} as const;

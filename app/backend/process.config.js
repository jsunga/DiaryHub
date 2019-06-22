module.exports = { 
  apps: [
    {
      name: 'gateway',
      script: './api/gateway.js',
      watch: true,
    },
    {
      name: 'user',
      script: './api/user.js',
      watch: true,
    },
    {
      name: 'food',
      script: './api/food.js',
      watch: true,
    },
    {
      name: 'recipe',
      script: './api/recipe.js',
      watch: true,
    },
    {
      name: 'workout',
      script: './api/workout.js',
      watch: true,
    },
    {
      name: 'counter',
      script: './api/rediscounter.js',
      watch: true,
    },
    {
      name: 'checkin',
      script: './api/checkin.js',
      watch: true,
    },
    {
      name: 'websocket',
      script: './api/websocket.js',
      watch: true,
    },
  ],
};
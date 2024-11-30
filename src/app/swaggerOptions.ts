export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OpenAI API",
      version: "1.0.0",
      description: "Express API based on OpenAI API endpoints",
    },
    servers: [
      {
        url: `http://localhost:${process.env.EXT_PORT || "3000"}`,
      },
    ],
  },
  apis: ["./src/app/routes/**/*.ts"],
};


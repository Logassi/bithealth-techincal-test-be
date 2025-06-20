import app from "./server";
import { PORT as portFromEnv } from "./configs";
import ErrorMiddleware from "./middlewares/error-handler.middlewares";
import apiRoutes from "./routes";
// import "./index"; // This loads src/types/index.d.ts

const PORT = portFromEnv || 8000;

// app.use("/api", routes);
app.use("/api", apiRoutes);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  // console.log(`${}`);
  console.log(`Server started on port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api/docs`);
});

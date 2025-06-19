import app from "./server";
import { PORT as portFromEnv } from "./src/configs";
import apiRoutes from "./src/routes";

const PORT = portFromEnv || 8000;

// app.use("/api", routes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api/docs`);
});

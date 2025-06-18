import app from "./server";
import { PORT as portFromEnv } from "./src/configs";
import routes from "./src/routes";

const PORT = portFromEnv || 8000;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api/docs`);
});

import { globalErrorHandling } from "./middlewares/GlobalErrorHandling.js";
import { AppError } from "./utils/AppError.js";
import authRouter from "./modules/auth/auth.routes.js";
import megamenuRouter from "./modules/megaMenu/megamenu.routes.js";
import servicesRouter from "./modules/services/services.routes.js";
import userRouter from "./modules/user/user.routes.js";
import bookingRouter from "./modules/booking/booking.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import subcategoryRouter from "./modules/subcategory/subcategory.routes.js";

export function bootstrap(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/megamenu", megamenuRouter);
  app.use("/api/v1/services", servicesRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/booking", bookingRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subcategoryRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(404,"Endpoint was not found"));
  });

  app.use(globalErrorHandling);
}

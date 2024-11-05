import { Router } from "express";
import Controllers from "./controllers";

class Routes {
  public router: Router;
  private controllers: Controllers;

  constructor() {
    this.router = Router();
    this.controllers = new Controllers();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.controllers.homeRoute);
    this.router.get("/api/items", this.controllers.getItems);
    this.router.post("/api/items", this.controllers.createItem);
  }
}

export default Routes;

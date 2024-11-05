import { Request, Response } from "express";

class Controllers {
  public homeRoute(req: Request, res: Response): void {
    res.status(200).json("¡Hola, mundo!");
  }

  public getItems(req: Request, res: Response): void {
    res.status(200).json({ message: "Lista de items" });
  }

  public createItem(req: Request, res: Response): void {
    const newItem = req.body;
    res.status(201).json({ message: "Item creado", item: newItem });
  }
}

export default Controllers;

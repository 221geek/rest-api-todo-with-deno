import { Drash } from "https://deno.land/x/drash/mod.ts";
import { Task } from "./task.ts";

let todos: Array<Task> = [
  { id: 1, title: "tache 1", completed: false },
  { id: 2, title: "tache 2", completed: true },
  { id: 3, title: "tache 3", completed: true },
  { id: 4, title: "tache 4", completed: false },
];

export class TodoList extends Drash.Http.Resource {
  static paths = ["/todos"];

  public GET() {
    this.response.body = todos;
    return this.response;
  }
}

export class TodoElement extends Drash.Http.Resource {
  static paths = ["/todos/:id"];

  public GET() {
    const URL_param = this.request.getPathParam("id");
    const task = todos.find((task) => task.id === Number(URL_param));

    if (!task) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Task with id ${URL_param} not found`,
      );
    }
    this.response.body = task;

    return this.response;
  }
}

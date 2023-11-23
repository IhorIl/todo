export interface CreateTodo {
  title: string;
  description: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

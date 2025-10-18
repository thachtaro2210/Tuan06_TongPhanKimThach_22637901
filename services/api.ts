const API_BASE_URL = 'https://67c83bfc0acf98d0708585e6.mockapi.io/todo';

export interface Todo {
  id: string;
  title: string;
  body: string;
  createdAt?: string;
  name?: string;
  avatar?: string;
}

export class TodoService {
  // Lấy tất cả todos
  static async getAllTodos(): Promise<Todo[]> {
    try {
      const response: Response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  // Tạo todo mới
  static async createTodo(title: string, body: string): Promise<Todo> {
    try {
      const response: Response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  // Cập nhật todo
  static async updateTodo(id: string, title: string, body: string): Promise<Todo> {
    try {
      const response: Response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  // Xóa todo
  static async deleteTodo(id: string): Promise<void> {
    try {
      const response: Response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}

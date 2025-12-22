import React from "react";
import { Api } from "../services/api-client";
import toast from "react-hot-toast";

export const useAdminUsers = () => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await Api.admin.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Ошибка при загрузке пользователей");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: number) => {
    if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      return;
    }

    try {
      await Api.admin.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      toast.success("Пользователь удален");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Ошибка при удалении пользователя");
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, deleteUser, refetch: fetchUsers };
};
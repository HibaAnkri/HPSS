package hsid.demo.HSID_Backend.Service;

import hsid.demo.HSID_Backend.Entities.User;
import hsid.demo.HSID_Backend.Enum.Role;
import java.util.List;

public interface UserService {

    User createUser(User user);

    User loginUser(User user);

    List<User> getAllUsers();

    User updateUserStatus(Long userId);

    void deleteUserById(Long id);

    User changePassword(Long userId, String newPassword);

    User setInactive(Long id);

    // Nouvelle méthode pour changer le rôle
    User changeUserRole(Long userId, Role newRole);
}

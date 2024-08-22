package hsid.demo.HSID_Backend.Service;

import hsid.demo.HSID_Backend.Entities.User;
import hsid.demo.HSID_Backend.Enum.Role;
import java.util.List;
import java.util.Optional;

public interface UserService {

    User createUser(User user);

    User loginUser(User user);

    List<User> getAllUsers();

    User updateUserStatus(Long userId);

    void deleteUserById(Long id);

    User changePassword(Long userId,String oldPassword, String newPassword);

    User setInactive(Long id);

    Optional<User> findById(Long id);

    User changeUserRoleToConfirmed(Long id);
}
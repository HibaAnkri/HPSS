package hsid.demo.HSID_Backend.Service.Impl;

import hsid.demo.HSID_Backend.Entities.User;
import hsid.demo.HSID_Backend.Enum.Role;
import hsid.demo.HSID_Backend.Repository.UserRepository;
import hsid.demo.HSID_Backend.Service.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void createAnAdminAccount() {
        Optional<User> adminAccount = userRepository.findByRole(Role.ADMIN);
        if (adminAccount.isEmpty()) {
            User user = new User();
            user.setEmail("admin@hps-worldwide.com");
            user.setName("Admin");
            user.setPassword("admin");
            user.setRole(Role.ADMIN);
            user.setActive(true);
            userRepository.save(user);
            System.out.println("Admin account created successfully");
        } else {
            System.out.println("Admin account already exist");
        }
    }

    public User createUser(User user){
        user.setRole(Role.USER);
        user.setActive(false);
        return userRepository.save(user);
    }



    public User loginUser(User user){
        Optional<User> optionalUser = userRepository.findFirstByEmail(user.getEmail());
        if(optionalUser.isPresent()){
            User dbUser = optionalUser.get();
            if(!dbUser.getActive()){
                throw new EntityNotFoundException("User is not active.");
            }

            if(dbUser.getPassword().equals(user.getPassword())){
                return dbUser;
            }else{
                throw new EntityNotFoundException("Password is wrong.");
            }
        }else{
            throw new EntityNotFoundException("User not found.");
        }
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }


    public User updateUserStatus(Long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            User dbUser = optionalUser.get();

            dbUser.setActive(!dbUser.getActive());

            return userRepository.save(dbUser);
        }else{
            throw new EntityNotFoundException("User not found.");
        }
    }

    @Override
    public void deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public User changePassword(Long userId, String oldPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.getPassword().equals(oldPassword)) {
                throw new RuntimeException("Old password is incorrect");
            }
            user.setPassword(newPassword);
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public User setInactive(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setActive(false);
            return userRepository.save(user);
        } else {
            throw new EntityNotFoundException("User not found.");
        }
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User changeUserRoleToConfirmed(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getRole() == Role.USER) {
                user.setRole(Role.CONFIRMED_USER);
                return userRepository.save(user);
            } else {
                throw new IllegalArgumentException("User is not in the USER role.");
            }
        } else {
            throw new EntityNotFoundException("User not found with id " + id);
        }
    }

}
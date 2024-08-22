package hsid.demo.HSID_Backend.Enum;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN(0), USER(1), CONFIRMED_USER(2);

    private final int value;

    Role(int value) {
        this.value = value;
    }

    public static Role fromValue(int value) {
        for (Role role : values()) {
            if (role.value == value) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role value: " + value);
    }
}
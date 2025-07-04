package co.unicauca.chpp.platform.users.infraestructure.input.rest.data.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

import co.unicauca.chpp.platform.users.domain.model.User.Role;

public class UserRequest {

    @Null(message = "El campo debe estar vacío")
    private long id;
    @NotEmpty(message = "User no puede estar en blanco")
    private String user;
    @NotEmpty(message = "Nombre no puede estar en blanco")
    private String name;
    @NotEmpty(message = "E-Mail no puede estar en blanco")
    private String email;
    @NotEmpty(message = "Contraseña no puede estar en blanco")
    private String password;
    private Role role;
    @NotNull
    private boolean enabled;

    public UserRequest() {
    }

    public UserRequest(long id, String user, String name, String email, String password, Role role, boolean enabled) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.enabled = enabled;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUser() {
        return this.user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}

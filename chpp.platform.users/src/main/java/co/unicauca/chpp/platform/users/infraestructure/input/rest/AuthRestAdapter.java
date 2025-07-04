package co.unicauca.chpp.platform.users.infraestructure.input.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chpp")
public class AuthRestAdapter {
    
    @GetMapping("/login")
    public String ChppLoginPage(){
        return "pag";
    }

    @GetMapping("/logout")
    public String ChppLogoutPage(){
        return "pag";
    }
}

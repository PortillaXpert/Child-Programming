package co.unicauca.chpp.platform.workspace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication()
@EnableJpaRepositories("co.unicauca.chpp.platform.workspace.infraestructure.output.persistence.*")
@EntityScan("co.unicauca.chpp.platform.workspace.infraestructure.output.persistence.*")   
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}

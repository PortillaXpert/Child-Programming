package chpp.plataform.teams_proyects.domain.common;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApiErrorDto implements Serializable {
    private String field;
    private String message;
}
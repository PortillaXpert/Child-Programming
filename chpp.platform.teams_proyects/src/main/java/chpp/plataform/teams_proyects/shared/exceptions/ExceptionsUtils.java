package chpp.plataform.teams_proyects.shared.exceptions;

import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.shared.messages.MessagesUtils;
import org.springframework.http.HttpStatus;

public class ExceptionsUtils {
    public static BusinessRuleException notFound(String key, Object... args) {
        return new BusinessRuleException(
                HttpStatus.NOT_FOUND.value(),
                key,
                MessagesUtils.get(key, args)
        );
    }
}

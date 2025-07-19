package chpp.plataform.teams_proyects.shared.validation;

import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.shared.messages.MessagesUtils;
import org.springframework.http.HttpStatus;

public class ValidationUtils {

    public static void validateRequired(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessagesUtils.get(MessagesConstant.EM004, fieldName)
            );
        }
    }

    public static void validateRequired(Object value, String fieldName) {
        if (value == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessagesUtils.get(MessagesConstant.EM004, fieldName)
            );
        }
    }
}

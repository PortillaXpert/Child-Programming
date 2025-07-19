package chpp.plataform.teams_proyects.shared.messages;

import chpp.plataform.teams_proyects.infrastructure.messages.MessageLoader;

public class MessagesUtils {
    public static String get(String key, Object... args) {
        return MessageLoader.getInstance().getMessage(key, args);
    }
}

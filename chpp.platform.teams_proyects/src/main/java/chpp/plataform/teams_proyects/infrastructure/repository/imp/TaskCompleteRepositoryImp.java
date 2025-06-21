package chpp.plataform.teams_proyects.infrastructure.repository.imp;

import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.domain.repository.ITaskCompleteRepository;
import chpp.plataform.teams_proyects.infrastructure.entity.TaskCompleteEntity;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.IJpaTaskCompleteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
@Transactional
public class TaskCompleteRepositoryImp implements ITaskCompleteRepository {

    private final IJpaTaskCompleteRepository jpaTaskCompleteRepository;

    @Override
    public TaskComplete save(TaskComplete taskComplete) {

        TaskCompleteEntity entity = new TaskCompleteEntity();
        entity.setId(taskComplete.getId());
        entity.setTitle(taskComplete.getTitle());

        jpaTaskCompleteRepository.save(entity);

        return taskComplete;
    }
}

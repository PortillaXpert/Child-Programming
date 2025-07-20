package chpp.plataform.teams_proyects.infrastructure.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class PagedResponseDTO<T> {
    private int currentPage;
    private int totalPages;
    private long totalElements;
    private List<T> data;
    private boolean isLastPage;
}
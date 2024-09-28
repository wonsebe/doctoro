package web.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ExpLogDto {
    private int eno;            // 경험치 번호
    private int expvalue;       // 경험치 획득량
    private String expmethod;   // 경험치 획득 방법
    private String expdate;     // 경험치 획득 날짜/시간
    private int mpno;           // 내 포켓몬 번호

}

package web.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MyPokemonDto {
    private int mpno;       // 내 포켓몬 번호
    private int pokeno;     // 포켓몬 번호
    private int stage;      // 단계
    private int uno;        // 유저 번호

}

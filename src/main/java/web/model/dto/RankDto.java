package web.model.dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RankDto {

    int pno;
    int click;
    int win;

    //포켓몬 데이터
    String ko_name;
    String en_name;
    String img;

}

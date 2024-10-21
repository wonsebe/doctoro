package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class VoteCityDto {

    //  마을 정보 테이블
    private int poll_city_info_no;
    private String poll_city_img_src;
    private String poll_city_title;
    private String poll_city_content;
    private String poll_city_motive;

    // 투표 기록 테이블
    private int poll_city_no;
    private int poll_city_first;
    private int poll_city_second;
    private int poll_city_third;
    private int uno;


    // 투표 기록 join용 테이블
    private String gender;
    private String ubirth;
    private int first_count;
    private int second_count;
    private int third_count;
}

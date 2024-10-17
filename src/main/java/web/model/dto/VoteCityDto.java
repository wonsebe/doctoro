package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class VoteCityDto {
    private int poll_city_info_no;
    private String poll_city_img_src;
    private String poll_city_title;
    private String poll_city_content;
    private String poll_city_motive;
}

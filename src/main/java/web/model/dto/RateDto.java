package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RateDto {

    private int rno;
    private float rscore;
    private float rrate;
    private int rresult;
    private int rpokeindex;
    private int rskillpower;
    private int rhp;
    private int ratk;
    private int rdef;
    private int rspd;
    private int rspatk;
    private int rspdef;

}

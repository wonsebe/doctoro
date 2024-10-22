package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserDto {
    private int uno;                // 유저 번호
    private String id;              // 아이디
    private String password;        // 비밀번호
    private String name;            // 이름
    private String gender;          // 성별
    private String phone;           // 전화번호
    private String ubirth;          // 생년월일
    private String distinction;     // 등급
    int rno; //신고횟수 추가 (김병찬)
}

package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserDto {
    private int uno;
    private String id;
    private String password;
    private String name;
    private String gender;
    private String phone;
    private String distinction;
}

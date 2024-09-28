package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.MyPokemonDto;
import web.service.MyPokemonService;

@RestController
@RequestMapping("/mypoke")
public class MyPokemonController {
    @Autowired private MyPokemonService myPokemonService;

    // 내 포켓몬 존재 유무
    @GetMapping("/exist")
    public MyPokemonDto myPokeExistCheck() {
        System.out.println("MyPokemonController.myPokeExistCheck");
        return myPokemonService.myPokeExistCheck();
    }

    // 내 포켓몬 생성
    @PostMapping("/add")
    public boolean myPokeAdd() {
        System.out.println("MyPokemonController.myPokeAdd");
        return myPokemonService.myPokeAdd();
    }





}

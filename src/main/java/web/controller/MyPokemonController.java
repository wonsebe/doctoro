package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    // 내 포켓몬 초기화
    @DeleteMapping("/reset")
    public boolean myPokeReset() {
        System.out.println("MyPokemonController.myPokeReset");
        return myPokemonService.myPokeReset();
    }

    // 내 포켓몬 진화
    @PutMapping("/evolve/new")
    public boolean myPokeEvolve(MyPokemonDto myPokemonDto) {
        System.out.println("MyPokemonController.myPokeEvolve");
        return myPokemonService.myPokeEvolve(myPokemonDto);
    }

}

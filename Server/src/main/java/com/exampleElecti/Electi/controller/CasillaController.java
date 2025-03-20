package com.exampleElecti.Electi.controller;

import com.exampleElecti.Electi.model.Candidate;
import com.exampleElecti.Electi.model.Casilla;
import com.exampleElecti.Electi.repository.CandidateRepository;
import com.exampleElecti.Electi.repository.CasillaRepository;
import com.exampleElecti.Electi.service.CandidateService;
import com.exampleElecti.Electi.service.CasillaService;
import com.exampleElecti.Electi.service.ReadCandidateFromExcel;
import com.exampleElecti.Electi.service.ReadCasillasFromExcel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/casilla")
public class CasillaController {

    //Repository
    private final CasillaRepository casillaRepository;


    @Autowired//Service
    private final CasillaService casillaService;

    //Constructor
    public CasillaController(CasillaRepository casillaRepository, CasillaService casillaService) {
        this.casillaRepository = casillaRepository;
        this.casillaService = casillaService;
    }

    @GetMapping//Returns all
    public List<Casilla> casillas(){//Returns all the candidates on the database
        return casillaRepository.findAll();
    }

    @GetMapping("/{id}")//Find the user by their Id
    public ResponseEntity<Casilla> getCasillaId(@PathVariable Long id){
        Optional<Casilla> casilla = casillaRepository.findById(id);
        return casilla.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Returns with a filter by the section number and the state in repository
    @GetMapping("/{section}/{state}/{type}")
    public ResponseEntity<Casilla> getCasillaSection(@PathVariable String section, @PathVariable String state, @PathVariable String type){
        Optional<Casilla> casillaOption = casillaRepository.findBySectionAndStateAndType(section, state, type);
        return casillaOption.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/updateAll")//Update all casillas from excel(polling stations)
    public ResponseEntity<String> updateAll(){
        ReadCasillasFromExcel readCasillasFromExcel = new ReadCasillasFromExcel();

        //Read from the excel and gets a list of casillas with the read from excel service
        String filepath = "src/main/resources/casillas.xlsx";//Gets the path
        List<Casilla> casillas = readCasillasFromExcel.readCasillas(filepath);//Return all the candidates
        casillaService.saveCasilla(casillas);

        //Return ok 200
        return new ResponseEntity<String>("Updated casillas", HttpStatus.OK);
    }

}

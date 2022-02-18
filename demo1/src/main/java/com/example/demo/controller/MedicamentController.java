package com.example.demo.controller;

import com.example.demo.model.Medicament;
import com.example.demo.repository.MedicamentRepository;
import com.example.demo.service.MedicamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value = "/api/meds", produces = "application/json")
public class MedicamentController {
    private final MedicamentService medicamentService;

    @Autowired
    MedicamentController(MedicamentService medicamentService){
        this.medicamentService = medicamentService;
    }

    @Autowired
    MedicamentRepository medicamentRepository;

    @GetMapping("/getAll")
    public List<Medicament> getAllMedicaments(){
        return medicamentService.findAll();
    }


    @PostMapping("/addMed")
    public ResponseEntity addMedicament(@RequestBody Medicament medicament){
        try{
        medicamentService.save(medicament);
        return ResponseEntity.status(HttpStatus.CREATED).body("Med was created!");
    }catch(Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Med was created!");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteMedicament(@PathVariable int id){
        try{
            medicamentService.deleteById(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted successfully!");}
        catch (Exception e){
            System.out.println("Not found!");
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
                    .body("Not found!");
        }
    }

    @PutMapping("/updateMed")
    public ResponseEntity updateMedicament(@RequestBody Medicament medicament){
        medicamentService.save(medicament);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Updated successfully!");
    }

    @GetMapping("/search/{terms}")
    public ResponseEntity searchMedicament(@PathVariable String terms){
        System.out.println("Service: "+medicamentService.search(terms));
        List results = medicamentService.search(terms);
        return ResponseEntity.status(HttpStatus.OK).body(results);
    }

    @GetMapping("/sortBySales")
    public ResponseEntity sortBySales(){
        List<Medicament> results = medicamentService.sortMedsBySalesDescending();
        return ResponseEntity.status(HttpStatus.OK).body(results);
    }

    @PutMapping("/increasePriceByPercentage/{percentage}/{compareTo}")
    public ResponseEntity increasePriceByPercentage(@PathVariable float percentage, @PathVariable float compareTo){
        try{
            int countOfMedicamentsToBeModified = medicamentService.increasePriceByPercentage(percentage, compareTo);
            return ResponseEntity.status(HttpStatus.OK).body(countOfMedicamentsToBeModified+" medicament's prices were updated!");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("No medicament was modified!");
        }
    }

}

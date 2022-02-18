package com.example.demo.controller;

import com.example.demo.model.Card;
import com.example.demo.model.Medicament;
import com.example.demo.repository.CardRepository;
import com.example.demo.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value="/api/cards",produces="application/json")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping("/getAll")
    public List<Card> getAllProducts(){
        return cardService.findAll();
    }

    @GetMapping("/getCard/{id}")
    public Optional<Card> getCard(@PathVariable int id){
        return cardService.findById(id);
    }

    @PostMapping("/addCard")
    public ResponseEntity addClient(@RequestBody Card card){

        try{
            Card newCard = cardService.save(card);

        return ResponseEntity.status(HttpStatus.CREATED).body(newCard);}
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Something went wrong!");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCard(@PathVariable int id){
        try{
            cardService.deleteById(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted successfully!");}
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED)
                    .body("Card not found or is linked to a transaction!");
        }
    }
    @PutMapping("/updateCard")
    public ResponseEntity updateMedicament(@RequestBody Card card){
        Optional<Card> cardToFind = cardService.findById(card.getId());
        if (cardToFind.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Wrong id!");
        }
        cardService.save(card);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Updated successfully!");
    }

    @GetMapping("/search/{terms}")
    public ResponseEntity searchCard(@PathVariable String terms){
        List result = cardService.search(terms);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/sortByDiscount")
    public ResponseEntity sortByDiscount(){
         List result = cardService.sortCardsByDiscounts();
         return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}

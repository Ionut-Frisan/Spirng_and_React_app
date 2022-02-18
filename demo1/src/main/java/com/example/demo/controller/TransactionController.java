package com.example.demo.controller;

import com.example.demo.dto.TransactionDTO;
import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/transactions", produces = "application/json")
public class TransactionController {
    @Autowired
    public TransactionRepository transactionRepository;
    @Autowired
    public TransactionService transactionService;


    public TransactionController(TransactionRepository transactionRepository, TransactionService transactionService) {
        this.transactionRepository = transactionRepository;
        this.transactionService = transactionService;
    }

    @GetMapping("/getAll")
    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }

    @PostMapping("/addTransaction")
    public ResponseEntity addTransaction(@RequestBody TransactionDTO transactionDTO){
        Transaction transaction = transactionService.convertDTOToEntity(transactionDTO);
        transaction.setDiscount();
        transactionService.save(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body("Transaction was successfully added!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteTransaction(@PathVariable int id){
        transactionService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Transaction was deleted successfully!");
    }

    @PutMapping("/update")
    public ResponseEntity updateTransaction(@RequestBody TransactionDTO transactionDTO){
        Transaction transaction = transactionService.convertDTOToEntity(transactionDTO);
        transaction.setDiscount();
        transactionService.save(transaction);
        return ResponseEntity.status(HttpStatus.OK).body("Updated successfully!");
    }

    @GetMapping("/getByInterval/{fromDate}to{toDate}")
    public ResponseEntity filterByInterval(@PathVariable String fromDate, @PathVariable String toDate){
        try{
            List<Transaction> results = transactionService.filterByInterval(fromDate, toDate);
            return ResponseEntity.status(HttpStatus.OK).body(results);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("");
        }
    }

    @DeleteMapping("/deleteByInterval/{fromDate}to{toDate}")
    public ResponseEntity deleteByInterval(@PathVariable String fromDate, @PathVariable String toDate){
        try{
            int countOfDeletedTransactions = transactionService.deleteByDateBetween(fromDate, toDate);
            return ResponseEntity.status(HttpStatus.OK).body(countOfDeletedTransactions+" transactions were deleted!");
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Something went wrong!");
        }
    }


}

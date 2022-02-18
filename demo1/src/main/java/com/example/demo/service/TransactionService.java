package com.example.demo.service;

import com.example.demo.dto.TransactionDTO;
import com.example.demo.model.Card;
import com.example.demo.model.Medicament;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.MedicamentRepository;
import com.example.demo.repository.TransactionRepository;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import javax.persistence.Query;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private MedicamentRepository medicamentRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private EntityManager entityManager;

    public TransactionDTO convertEntityToDto(Transaction transaction){
        /*
        Converts the Transaction object into into it's coresponding DTO
         */
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setId(transaction.getId());
        transactionDTO.setId_med(transaction.getMedicament().getId());
        transactionDTO.setId_card(transaction.getCard().getId());
        transactionDTO.setDate(transaction.getDate());
        transactionDTO.setTime(transaction.getTime());
        transactionDTO.setNoOfPieces(transaction.getNoOfPieces());

        return transactionDTO;
    }

    public Transaction convertDTOToEntity(TransactionDTO transactionDTO){
        /*
        Converts the Transaction DTO into the Transaction object
         */
        Transaction transaction = new Transaction();

        transaction.setId(transactionDTO.getId());

        Medicament medicament = medicamentRepository.getById(transactionDTO.getId_med());
        transaction.setMedicament(medicament);

        if(transactionDTO.getId_card() == 0)
            transaction.setCard(null);
        else{
            Card card = cardRepository.getById(transactionDTO.getId_card());
            transaction.setCard(card);
        }

        transaction.setDate(transactionDTO.getDate());
        transaction.setTime(transactionDTO.getTime());
        transaction.setNoOfPieces(transactionDTO.getNoOfPieces());

        return transaction;
    }

    public void save(Transaction transaction){
        /*
        Adds a new entity to the database
         */
        transactionRepository.save(transaction);
    }

    public void deleteById(int id){
        /*
        Deletes the entity with id==param:id
        */
        transactionRepository.deleteById(id);
    }

    public List<Transaction> filterByInterval(String from, String to) throws Exception{
//        try{
//            Query query = entityManager.createQuery("select  t from Transaction t where t.date >'"+from+"' and t.date<'"+to+"'");
//            return query.getResultList();
//
//        }
//        catch (Exception e){
//            throw new Exception("Converting params to Date is not possible");
//        }
        Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(from);
        Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(to);
        return transactionRepository.findAllByDateBetween(fromDate, toDate);
    }

    public int deleteByDateBetween(String from, String to) throws Exception{
        Date fromDate = new SimpleDateFormat("yyyy-MM-dd").parse(from);
        Date toDate = new SimpleDateFormat("yyyy-MM-dd").parse(to);

        int countOfDeletedTransactions = transactionRepository.countAllByDateBetween(fromDate, toDate);
        transactionRepository.deleteTransactionByDateBetween(fromDate, toDate);

        return countOfDeletedTransactions;
    }

}

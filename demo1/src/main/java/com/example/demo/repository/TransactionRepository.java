package com.example.demo.repository;

import com.example.demo.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;


@Repository
@Transactional
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    List<Transaction> findAllByDateBetween(Date from, Date to);

    void deleteTransactionByDateBetween(Date from, Date to);

    int countAllByDateBetween(Date from, Date end);
}

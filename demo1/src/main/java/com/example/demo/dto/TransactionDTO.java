package com.example.demo.dto;

import com.example.demo.model.Medicament;
import org.springframework.context.annotation.Bean;

import java.sql.Date;
import java.sql.Time;


public class TransactionDTO {

    private int id;
    private int id_med;
    private int id_card;
    private int noOfPieces;
    private Date date;
    private Time time;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_med() {
        return id_med;
    }

    public void setId_med(int id_med) {
        this.id_med = id_med;
    }

    public int getId_card() {
        return id_card;
    }

    public void setId_card(int id_card) {
        this.id_card = id_card;
    }

    public int getNoOfPieces() {
        return noOfPieces;
    }

    public void setNoOfPieces(int noOfPieces) {
        this.noOfPieces = noOfPieces;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "TransactionDTO{" +
                "id=" + id +
                ", id_med=" + id_med +
                ", id_card=" + id_card +
                ", noOfPieces=" + noOfPieces +
                ", date=" + date +
                ", time=" + time +
                '}';
    }
}

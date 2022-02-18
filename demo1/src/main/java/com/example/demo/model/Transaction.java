package com.example.demo.model;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name="Transaction")
public class Transaction {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(targetEntity = Medicament.class, cascade = CascadeType.DETACH)
    @JoinColumn(name="id_med",referencedColumnName = "id", nullable = false)
    private Medicament medicament;

    @OneToOne(targetEntity = Card.class, cascade = CascadeType.DETACH)
    @JoinColumn(name="id_card",referencedColumnName = "id")
    private Card card;

    @Column(name = "noOfPieces")
    private int noOfPieces;

    @Column(name = "date")
    private Date date;

    @Column(name = "time")
    private Time time;

    @Column(name = "discount")
    private int discount;

    public Transaction(int id, Medicament medicament, Card card, int noOfPieces, Date date, Time time) {
        this.id = id;
        this.medicament = medicament;
        this.card = card;
        this.noOfPieces = noOfPieces;
        this.date = date;
        this.time = time;
    }

    public Transaction() {
    }

    public void setDiscount(){
        if(this.card != null){
            if(this.medicament.isRequiresRecepy())
                this.discount = 15;
            else this.discount = 10;
        }
        else{
            this.discount = 0;
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Medicament getMedicament() {
        return medicament;
    }

    public void setMedicament(Medicament medicament) {
        this.medicament = medicament;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
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

    public int getDiscount() {
        return discount;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", medicament=" + medicament +
                ", card=" + card +
                ", noOfPieces=" + noOfPieces +
                ", date=" + date +
                ", time=" + time +
                ", discount=" + discount +
                '}';
    }
}

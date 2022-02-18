package com.example.demo.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="Card")
public class Card {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    //First name
    @Column(name="firstName",nullable=false)
    private String firstName;

    //Last name
    @Column(name="lastName",nullable=false)
    private String lastName;

    //Personal identification number
    @Column(name="cnp",nullable=false, unique = true)
    private String cnp;

    //Date of birth
    @Column(name="dob",nullable=false)
    private Date dob;

    //Date of registration
    @Column(name="dor",nullable=false)
    private Date dor;

    //Constructors
    public Card() {
    }

    public Card(int id, String firstName, String lastName, String cnp, Date dob, Date dor) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cnp = cnp;
        this.dob = dob;
        this.dor = dor;
        System.out.println(cnp);
    }

    //getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCNP() {
        return cnp;
    }

    public void setCNP(String cnp) {
        this.cnp = cnp;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Date getDor() {
        return dor;
    }

    public void setDor(Date dor) {
        this.dor = dor;
    }

    //Makes the print prettier
    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", CNP=" + cnp +
                ", dob=" + dob +
                ", dor=" + dor +
                '}';
    }
}



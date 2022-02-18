package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name="Medicament")
public class Medicament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name",nullable=false)
    private String name;

    @Column(name="producer",nullable=false)
    private String producer;

    @Column(name="price",nullable=false)
    private float price;

    @Column(name="requiresRecepy", nullable = false)
    private boolean requiresRecepy;

    public Medicament(int id, String name, String producer, float price, boolean requiresRecepy) {
        this.id = id;
        this.name = name;
        this.producer = producer;
        this.price = price;
        this.requiresRecepy = requiresRecepy;
    }

    public Medicament() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public boolean isRequiresRecepy() {
        return requiresRecepy;
    }

    public void setRequiresRecepy(boolean requiresRecepy) {
        this.requiresRecepy = requiresRecepy;
    }

    @Override
    public String toString() {
        return "Medicament{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", producer='" + producer + '\'' +
                ", price=" + price +
                ", requiresRecepy=" + requiresRecepy +
                '}';
    }
}

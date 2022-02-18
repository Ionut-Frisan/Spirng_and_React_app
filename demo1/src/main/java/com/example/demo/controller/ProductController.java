package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api/products",produces="application/json",
        method={RequestMethod.GET,RequestMethod.POST})
public class ProductController {

    private ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/getAll")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @PostMapping("/addProduct")
    public void addProduct(@RequestBody Product product){
        System.out.println(product);
        productRepository.save(product);
    }

}

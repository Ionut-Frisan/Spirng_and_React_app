package com.example.demo.service;

import com.example.demo.model.Medicament;
import com.example.demo.model.Transaction;
import com.example.demo.repository.MedicamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import javax.persistence.Query;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.*;
import java.util.Map.Entry;
@Service
public class MedicamentService {

    @Autowired
    private MedicamentRepository medicamentRepository;

    @Autowired
    private EntityManager entityManager;

    public void save(Medicament medicament){
        medicamentRepository.save(medicament);
    }

    public void getById(int id){
        medicamentRepository.getById(id);
    }

    public List search(String terms){
        String likeTerms = "'%"+terms+"%'";
        Query query = entityManager.createQuery("select m from Medicament m where UPPER(m.name) like Upper("+likeTerms+")" + " or UPPER(m.producer) like Upper("+likeTerms+")");
        return query.getResultList();
    }

    public void deleteById(int id){
        medicamentRepository.deleteById(id);
    }

    public List findAll(){
        return medicamentRepository.findAll();
    }

    public List<Medicament> sortMedsBySalesDescending(){
        Query query = entityManager.createQuery("select t from Transaction t");
        List<Transaction> transactions = query.getResultList();

        HashMap<Integer, Integer> medList = new HashMap<Integer, Integer>();

        List<Medicament> meds = medicamentRepository.findAll();
        for (Medicament med: meds) {
            medList.put(med.getId(), 0);
        }

        for (int i = 0; i < transactions.size(); i++) {
            int id_med = transactions.get(i).getMedicament().getId();
            if(!medList.containsKey(id_med)){
                medList.put(id_med, transactions.get(i).getNoOfPieces());
            }
            else{
                medList.put(id_med, medList.get(id_med)+transactions.get(i).getNoOfPieces());
            }
        }

        Set<Entry<Integer, Integer>> entries = medList.entrySet();
        List<Entry<Integer, Integer>> listOfEntries
                = new ArrayList<Entry<Integer, Integer>>(entries);

        Collections.sort(listOfEntries, (i1,i2)-> i1.getValue().compareTo(i2.getValue()));
        Collections.reverse(listOfEntries);

        List<Medicament> sortedMeds = new ArrayList<>();
        for (Entry entry:listOfEntries) {
            sortedMeds.add(medicamentRepository.getById((Integer) entry.getKey()));
        }

        return sortedMeds;
    }

    public int increasePriceByPercentage(float percentage, float priceToComapre){
        Query query = entityManager.createQuery("select m from Medicament m where m.price < "+priceToComapre);
        List<Medicament> medicamentList = query.getResultList();

        for (Medicament med: medicamentList) {
            med.setPrice(med.getPrice()+med.getPrice()*percentage*0.01f);
            medicamentRepository.save(med);
        }
        return medicamentList.size();
    }

}

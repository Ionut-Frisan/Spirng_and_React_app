package com.example.demo.service;

import com.example.demo.model.Card;
import com.example.demo.model.Transaction;
import com.example.demo.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.*;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private EntityManager entityManager;

    public Card save(Card card){
        return cardRepository.save(card);
    }

    public void getById(int id){
        cardRepository.getById(id);
    }

    public List search(String terms){
        String likeTerms = "'%"+terms+"%'";
        Query query = entityManager.createQuery("select c from Card c where UPPER(c.firstName) like Upper("+likeTerms+")" + " or UPPER(c.lastName) like Upper("+likeTerms+")" + " or UPPER(c.cnp) like Upper("+likeTerms+")");
        return query.getResultList();
    }

    public void deleteById(int id){
        cardRepository.deleteById(id);
    }

    public List findAll(){
        return cardRepository.findAll();
    }

    public Optional<Card> findById(int id){
        return cardRepository.findById(id);
    }

    public List sortCardsByDiscounts(){
        Query query = entityManager.createQuery("select t from Transaction t where t.card is not null ");
        List<Transaction> transactions = query.getResultList();
        List<Card> cards = cardRepository.findAll();
        HashMap<Integer, Float> cardList = new HashMap<Integer, Float>();
        for (Card card: cards) {
            cardList.put(card.getId(), 0f);
        }
        for (int i = 0; i < transactions.size(); i++) {
            Transaction tr = transactions.get(i);
            float price = tr.getMedicament().getPrice();
            int id_card = tr.getCard().getId();

            if(!cardList.containsKey(id_card)){
                cardList.put(id_card, tr.getNoOfPieces()*(tr.getDiscount()*price*0.01f));
            }
            else{
                cardList.put(id_card, cardList.get(id_card)+tr.getNoOfPieces()*(tr.getDiscount()*price*0.01f));
            }

        }
        Set<Map.Entry<Integer, Float>> entries = cardList.entrySet();
        List<Map.Entry<Integer, Float>> listOfEntries
                = new ArrayList<Map.Entry<Integer, Float>>(entries);

        Collections.sort(listOfEntries, (i1,i2)-> i1.getValue().compareTo(i2.getValue()));
        Collections.reverse(listOfEntries);

        List<Card> sortedCards = new ArrayList<>();
        for (Map.Entry entry:listOfEntries) {
            sortedCards.add(cardRepository.getById((Integer) entry.getKey()));
        }

        return sortedCards;
    }
}

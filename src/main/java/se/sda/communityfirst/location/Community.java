package se.sda.communityfirst.location;

import lombok.*;
import se.sda.communityfirst.items.Item;
import se.sda.communityfirst.service.Assistance;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "communities")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "community")
    private Set<Assistance> assistance = new HashSet<>();
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "community")
    private Set<Item> item = new HashSet<>();

    public void addAssistance(Assistance assistance) {
        this.assistance.add(assistance);
        assistance.setCommunity(this);
    }

    public void removeAssistance(Assistance assistance) {
        this.assistance.remove(assistance);
        assistance.setCommunity(null);
    }

    public void addItem(Item item) {
        this.item.add(item);
        item.setCommunity(this);
    }

    public void removeItem(Item item) {
        this.item.remove(item);
        item.setCommunity(null);
    }

}

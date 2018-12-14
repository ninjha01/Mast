package com.nishant.mast;

import java.io.Serializable;

/**
 * Created by Nishant on 7/24/17.
 */

public class Allergen implements Serializable {

    public String name;
    public String source;
    public String order;
    public String species;
    public String bName;
    public String mw;
    public String aIcity;
    public String aRef;
    public String food;
    public String pdbID;
    public String category;
    public boolean sold;
 
    public Allergen(String name, String source, String order,
                    String species, String bName, String mw,
                    String aIcity, String aRef, String food,
                    String pdbID, String category, boolean sold) {
        this.name = name;
        this.source = source;
        this.order = order;
        this.species = species;
        this.bName = bName;
        this.mw = mw;
        this.aIcity = aIcity;
        this.aRef = aRef;
        this.food = food;
        this.pdbID = pdbID;
        this.category = category;
        this.sold = sold;
    }

    @Override
    public String toString() {
        return "Allergen{" +
                "name='" + name + '\'' +
                ", source='" + source + '\'' +
                ", order='" + order + '\'' +
                ", species='" + species + '\'' +
                ", bName='" + bName + '\'' +
                ", mw='" + mw + '\'' +
                ", aIcity='" + aIcity + '\'' +
                ", aRef='" + aRef + '\'' +
                ", food='" + food + '\'' +
                ", pdbID='" + pdbID + '\'' +
                ", sold='" + sold + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}

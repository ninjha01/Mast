package com.nishant.mast;

import android.app.SearchManager;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class SearchResultsActivity extends AppCompatActivity {

    private DataAdapter mDBAdapter;
    private List<Allergen> allergensList;
    private RecyclerView mRecyclerView;
    private MyRecyclerViewAdapter adapter;
    private TextView notFound;

    String[] delimiters = {"Name", "Source", "Order",
            "Species", "BiochemicalName", "MW(SDS-PAGE)",
            "Allergenicity", "Allergenicityref.:",
            "FoodAllergen", "PDBID", "Sold", "Tag", "Category"};

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myToolbar);
        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);
        mRecyclerView.setHasFixedSize(true);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        notFound = (TextView) findViewById(R.id.notFound);
        notFound.setVisibility(View.INVISIBLE);
        handleIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        handleIntent(intent);
    }

    public void handleIntent(Intent intent) {
        if (Intent.ACTION_SEARCH.equals(intent.getAction())) {
            String query = intent.getStringExtra(SearchManager.QUERY);
            Log.i("Query: ", query);
            //initDatabase
            mDBAdapter = new DataAdapter(this);
            mDBAdapter.createDatabase();
            mDBAdapter.open();
            //Build and execute query
            Log.i("Query Type: ", getQueryType(query));
            Cursor c = executeQuery(query, getQueryType(query));
            getAllergensFromCursor(c);
            c.close();
        }
    }
    private Cursor executeQuery(String query, String queryType) {
        switch (queryType) {
            case "name":
                return mDBAdapter.getAllergenData(query, new String[]{"Name"});
            case "natural":
                return mDBAdapter.getAllergenData(query, new String[]{"Tag"});
            case "recombinant":
                return mDBAdapter.getAllergenData(query, new String[]{"Tag"});
            case "biotin":
                return mDBAdapter.getAllergenData(query, new String[]{"Tag"});
            case "lotox":
                return mDBAdapter.getAllergenData(query, new String[]{"Tag"});
            case "animal":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            case "cockroach":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            case "dust mite":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            case "food":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            case "mold":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            case "pollen":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            case "venom":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            case "other":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            case "latex":
                return mDBAdapter.getAllergenData(query, new String[]{"Category"});
            default:
                return mDBAdapter.getAllergenData(query, delimiters);
        }
    }

    private String getQueryType(String query) {
        String cleanedQuery = query.toLowerCase();
        //Allergen name
        String namePatternString = "...{1,4} .{1,2} [0-9]{1,2}";
        Pattern name = Pattern.compile(namePatternString);
        Matcher matcher = name.matcher(cleanedQuery);
        if(matcher.matches()) {
            return "name";
        }
        //Tag
        List<String> tags = new ArrayList<>(Arrays.asList("recombinant", "natural", "lotox", "biotin"));
        String tag = stringContainsItemFromList(cleanedQuery, tags);
        if(!tag.isEmpty())
            return tag;

        //Category
        List<String> categories = new ArrayList<>(Arrays.asList("animal", "cockroach", "dust mite",
                "food", "mold", "pollen", "venom", "other", "latex"));
        String category = stringContainsItemFromList(cleanedQuery, categories);
        if(!category.isEmpty())
            return category;

        //Else
        return "unknown";
    }

    private void getAllergensFromCursor(Cursor cursor) {

        Log.i("Cursor Count: ", String.valueOf(cursor.getCount()));
        if (cursor.getCount() < 1)
            notFound.setVisibility(View.VISIBLE);
        else {
            allergensList = new ArrayList<Allergen>();
            while (cursor.moveToNext()) {

                String name = cursor.getString(cursor.getColumnIndexOrThrow("Name"));
                String source = cursor.getString(cursor.getColumnIndexOrThrow("Source"));
                String order = cursor.getString(cursor.getColumnIndexOrThrow("Order"));
                String species = cursor.getString(cursor.getColumnIndexOrThrow("Species"));
                String bName = cursor.getString(cursor.getColumnIndexOrThrow("BiochemicalName"));
                String mw = cursor.getString(cursor.getColumnIndexOrThrow("MW(SDS-PAGE)"));
                String aIcity = cursor.getString(cursor.getColumnIndexOrThrow("Allergenicity"));
                String aRef = cursor.getString(cursor.getColumnIndexOrThrow("Allergenicity") + 1);
                String food = cursor.getString(cursor.getColumnIndexOrThrow("FoodAllergen"));
                String pdb = "None";
                String category = "Other";
                boolean sold = false;
                try {
                    pdb = cursor.getString(cursor.getColumnIndexOrThrow("PDBID"));
                    category = cursor.getString(cursor.getColumnIndex("Category"));
                    sold = (cursor.getString(cursor.getColumnIndexOrThrow("Sold")).equals("Yes"));
                } catch (Exception e) {
                    Log.e("Cursor Exception: ", e.getMessage());
                }
                Allergen a = new Allergen(name, source, order, species, bName, mw, aIcity, aRef, food, pdb, category, sold);
                allergensList.add(a);
            }
            Log.i("Allergens Found: ", allergensList.toString());
            adapter = new MyRecyclerViewAdapter(SearchResultsActivity.this, allergensList);
            adapter.setAllergenCellOnItemClickListener(new AllergenCellOnItemClickListener() {
                @Override
                public void onItemClick(Allergen item) {

                    Intent intent = new Intent(SearchResultsActivity.this, AllergenActivity.class);
                    intent.putExtra("MyAllergen", item);
                    startActivity(intent);
                }
            });
            mRecyclerView.setAdapter(adapter);
        }
        cursor.close();
    }

    public void purchase(View view) {
        Button b = (Button) view.findViewById(R.id.button);
        String name = (String) b.getHint();
        String purchaseUrl = "https://inbio.com/index.php?route=product/search&search="
                + name.replaceAll(" ", "%20");

        try {
            Intent myIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(purchaseUrl));
            startActivity(myIntent);
        } catch (ActivityNotFoundException e) {
            Toast.makeText(this, "No application can handle this request."
                    + " Please install a web browser", Toast.LENGTH_LONG).show();
            e.printStackTrace();
        }
    }

    public static String stringContainsItemFromList(String inputStr, List<String> items) {
        for (int i = 0; i < items.size(); i++)
            if (inputStr.equals(items.get(i)))
                return items.get(i);
        return "";
    }
}
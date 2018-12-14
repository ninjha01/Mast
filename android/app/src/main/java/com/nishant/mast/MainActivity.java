package com.nishant.mast;

import android.app.Activity;
import android.app.SearchManager;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.SearchView;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    Toolbar myToolbar;
    SearchView searchView;
    SearchManager searchManager;
    GridView gridView;

    final String[] buttonLabels = new String[]{"Animal", "Cockroach", "Dust Mite",
            "Food", "Mold", "Pollen", "Venom", "Other", "Latex"}; //Contains "" padding to match imageResources


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getWindow().setBackgroundDrawableResource(R.drawable.background);

        myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myToolbar);

        // Associate searchable configuration with the SearchView
        initSearchBar();
        initIconGrid();
        hideSoftKeyboard(this);
    }

    private void initSearchBar() {
        searchManager =
                (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        searchView = (SearchView) findViewById(R.id.searchView);
        searchView.setSearchableInfo(
                searchManager.getSearchableInfo(getComponentName()));
        searchView.setIconifiedByDefault(false);
        searchView.setSubmitButtonEnabled(true);
        return;
    }

    public void initIconGrid() {
        gridView = (GridView) findViewById(R.id.buttonGrid);
        gridView.setAdapter(new ImageAdapter(this, buttonLabels));
        gridView.setOnItemClickListener(this);
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        String query = buttonLabels[position];
        searchView.setQuery(query, true);
    }

    public static boolean hideSoftKeyboard(@NonNull Activity activity) {
        View currentFocus = activity.getCurrentFocus();
        if (currentFocus == null)
            currentFocus = activity.getWindow().getDecorView();
        if (currentFocus != null)
            return getSoftInput(activity).hideSoftInputFromWindow(currentFocus.getWindowToken(), 0, null);
        return false;
    }

    public static boolean hideSoftKeyboard(@NonNull Context context) {
        if (Activity.class.isAssignableFrom(context.getClass())) {
            return hideSoftKeyboard((Activity) context);
        }
        return false;
    }

    public static InputMethodManager getSoftInput(@NonNull Context context) {
        return (InputMethodManager) context.getSystemService(Activity.INPUT_METHOD_SERVICE);
    }
}
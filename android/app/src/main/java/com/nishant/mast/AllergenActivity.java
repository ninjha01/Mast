package com.nishant.mast;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.Html;
import android.text.method.LinkMovementMethod;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.Arrays;

/**
 * Created by Nishant on 7/24/17.
 */

public class AllergenActivity extends AppCompatActivity {

    private TextView nameTextView;
    private TextView sourceTextView;
    private TextView speciesTextView;
    private TextView bNameTextView;
    private TextView MWTextView;
    private TextView aIcityTextView;
    private TextView aRefTextView;
    private TextView foodTextView;
    private ImageButton purchaseButton;
    
    private TextView titleNameTextView;
    private TextView titleSourceTextView;
    private TextView titleSpeciesTextView;
    private TextView titleBNameTextView;
    private TextView titleMWTextView;
    private TextView titleAIcityTextView;
    private TextView titleARefTextView;
    private TextView titleFoodTextView;

    private VideoView videoView;
    private Toolbar myToolbar;

    private Allergen myAllergen;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_allergen);
        initViews();
        try {
            handleIntent(getIntent());
        } catch (IOException e) {
            e.printStackTrace();
        }
        styleByCategory();
        Log.i("Before Width: ", String.valueOf(titleNameTextView.getWidth()));
    }


    private void initViews() {
        purchaseButton = (ImageButton) findViewById(R.id.purchaseButton);
        videoView = (VideoView) findViewById(R.id.videoView);
        nameTextView = (TextView) findViewById(R.id.nameTextView);
        sourceTextView = (TextView) findViewById(R.id.sourceTextView);
        speciesTextView = (TextView) findViewById(R.id.speciesTextView);
        bNameTextView = (TextView) findViewById(R.id.bNameTextView);
        MWTextView = (TextView) findViewById(R.id.mwTextView);
        aIcityTextView = (TextView) findViewById(R.id.aIcityTextView);
        aRefTextView = (TextView) findViewById(R.id.aRefTextView);
        aRefTextView.setMovementMethod(LinkMovementMethod.getInstance());
        foodTextView = (TextView) findViewById(R.id.foodTextView);

        titleNameTextView = (TextView) findViewById(R.id.titleNameTextView);
        titleSourceTextView = (TextView) findViewById(R.id.titleSourceTextView);
        titleSpeciesTextView = (TextView) findViewById(R.id.titleSpeciesTextView);
        titleBNameTextView = (TextView) findViewById(R.id.titleBNameTextView);
        titleMWTextView = (TextView) findViewById(R.id.titleMWTextView);
        titleAIcityTextView = (TextView) findViewById(R.id.titleAIcityTextView);
        titleARefTextView = (TextView) findViewById(R.id.titleARefTextView);
        titleFoodTextView = (TextView) findViewById(R.id.titleFoodTextView);

        myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myToolbar);
    }

    private void styleByCategory(){
        String category = myAllergen.category.replace(",", "");
        String[] categories = new String[] {"Animal", "Cockroach", "House Dust Mite", "Food", "Mold", "Pollen", "Venom", "Other", "Latex"};
        int position = Arrays.asList(categories).indexOf(category);
        if (position == -1) {
            position = 7;
            Log.e("Category not found: ", category);
        }
        styleToolbar(position);
        styleLabels(position);
    }

    private void styleLabels(int position) {
        Integer[] labelBackgrounds = new Integer[] { R.drawable.long_label_animal, R.drawable.long_label_cockroach, R.drawable.long_label_house_dust_mite,
                R.drawable.long_label_food, R.drawable.long_label_mold, R.drawable.long_label_pollen, R.drawable.long_label_venom, R.drawable.long_label_other, R.drawable.long_label_latex};

        Drawable labelBackground = getDrawable(labelBackgrounds[position]);
        titleNameTextView.setBackground(labelBackground);
        titleSourceTextView.setBackground(labelBackground);
        titleSpeciesTextView.setBackground(labelBackground);
        titleBNameTextView.setBackground(labelBackground);
        titleMWTextView.setBackground(labelBackground);
        titleAIcityTextView.setBackground(labelBackground);
        titleARefTextView.setBackground(labelBackground);
        titleFoodTextView.setBackground(labelBackground);
    }

    private void styleToolbar(int position) {
        Integer[] toolbarBackgrounds = new Integer[] { R.drawable.navbar_animal, R.drawable.navbar_cockroach, R.drawable.navbar_house_dust_mite,
                R.drawable.navbar_food, R.drawable.navbar_mold, R.drawable.navbar_pollen, R.drawable.navbar_venom, R.drawable.navbar_other, R.drawable.navbar_latex};
        myToolbar.setBackgroundDrawable(getResources().getDrawable(toolbarBackgrounds[position]));
    }

    private void handleIntent(Intent intent) throws IOException {
        myAllergen = (Allergen) intent.getSerializableExtra("MyAllergen");
        populateTextViews(myAllergen);
        if(!myAllergen.sold)
            purchaseButton.setVisibility(View.INVISIBLE);
        if(!myAllergen.pdbID.equals("None")) {
            String filename = "n" + myAllergen.pdbID;
            loadVideo(filename);
        }
        else {
            String filename = "not_found";
            loadVideo(filename);
        }
    }

    private void loadVideo(String filename) {
        //Get file
        Log.i("video filename: ", filename);
        int rawId = getResources().getIdentifier(filename, "raw", getPackageName());
        String path = "android.resource://" + getPackageName() + "/" + rawId;

        //Set up Video player
        videoView.setVideoURI(Uri.parse(path));
        videoView.start();
        //Set to loop
        videoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mp) {
                mp.setLooping(true);
            }
        });
        videoView.start();
    }

    private void populateTextViews(Allergen myAllergen) {
        nameTextView.setText(myAllergen.name);
        sourceTextView.setText(myAllergen.source);
        speciesTextView.setText(myAllergen.species);
        bNameTextView.setText(myAllergen.bName);
        MWTextView.setText(myAllergen.mw);
        aIcityTextView.setText(myAllergen.aIcity);
        populateARefTextView(myAllergen.aRef);
        foodTextView.setText(myAllergen.food);
    }

    public void purchaseButtonAction(View view) {
        TextView nameText = (TextView) findViewById(R.id.nameTextView);
        String name = (String) nameText.getText();
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

    private void populateARefTextView(String aRef) {
        if(!aRef.contains("none"))
            aRefTextView.setText(Html.fromHtml("<a href=http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=Retrieve&db=pubmed&dopt=AbstractPlus&list_uids="
                    + aRef +  ">" + aRef + "</a>"));
        else
            aRefTextView.setText("none");
    }

}

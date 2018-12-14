package com.nishant.mast;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class ImageAdapter extends BaseAdapter {
    private Context context;
    private String[] buttonLabels;



    public ImageAdapter(Context context, String[] buttonLabels) {
        this.context = context;
        this.buttonLabels = buttonLabels;
    }

    public View getView(int position, View convertView, ViewGroup parent) {

        LayoutInflater inflater = (LayoutInflater) context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        View gridView;

        if (convertView == null) {

            gridView = inflater.inflate(R.layout.button_layout, null);
            TextView buttonLabel = (TextView) gridView.findViewById(R.id.buttonLabel);
            String title = buttonLabels[position];
            buttonLabel.setText(title);

            ImageView buttonImageView = (ImageView) gridView.findViewById(R.id.buttonImage);
            if(title.isEmpty())
                buttonImageView.setClickable(false);

            Integer[] imageIDs = new Integer[] { R.drawable.icon_animal, R.drawable.icon_cockroach, R.drawable.icon_dust_mite,
                    R.drawable.icon_food, R.drawable.icon_mold, R.drawable.icon_pollen, R.drawable.icon_venom, R.drawable.icon_other, R.drawable.icon_latex};
            buttonImageView.setImageResource(imageIDs[position]);
            // Image should be cropped towards the center
            buttonImageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
            buttonImageView.setPadding(8, 8, 8, 8);
            buttonImageView.setCropToPadding(true);
        } else {
            gridView = convertView;
        }

        return gridView;
    }

    @Override
    public int getCount() {
        return buttonLabels.length;
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }
}

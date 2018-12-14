package com.nishant.mast;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import java.util.List;

/**
 * Created by Nishant on 7/24/17.
 */

public class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.CustomViewHolder> {

    private List<Allergen> allergenItemList;
    private Context mContext;

    public MyRecyclerViewAdapter(Context context, List<Allergen> allergenItemList) {
        this.allergenItemList = allergenItemList;
        this.mContext = context;
    }

    @Override
    public CustomViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.allergen_row, null);
        CustomViewHolder viewHolder = new CustomViewHolder(view);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(CustomViewHolder customViewHolder, int i) {
        final Allergen allergenItem = allergenItemList.get(i);
        //Setting text view title
        customViewHolder.textView.setText(allergenItem.name);
        customViewHolder.button.setHint(allergenItem.name);
        if (!allergenItem.sold)
            customViewHolder.button.setVisibility(View.INVISIBLE);
        View.OnClickListener listener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                allergenCellOnItemClickListener.onItemClick(allergenItem);
            }
        };
        customViewHolder.textView.setOnClickListener(listener);
    }

    @Override
    public int getItemCount() {
        return (null != allergenItemList ? allergenItemList.size() : 0);
    }

    class CustomViewHolder extends RecyclerView.ViewHolder {
        protected TextView textView;
        protected Button button;

        public CustomViewHolder(View view) {
            super(view);
            this.textView = (TextView) view.findViewById(R.id.title);
            this.button = (Button) view.findViewById(R.id.button);
        }
    }

    private AllergenCellOnItemClickListener allergenCellOnItemClickListener;

    public void setAllergenCellOnItemClickListener(AllergenCellOnItemClickListener allergenCellOnItemClickListener) {
        this.allergenCellOnItemClickListener = allergenCellOnItemClickListener;
    }
}
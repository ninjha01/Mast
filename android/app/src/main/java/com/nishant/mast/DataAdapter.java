package com.nishant.mast;

import java.io.IOException;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class DataAdapter {

    protected static final String TAG = "DataAdapter";

    private final Context mContext;
    private SQLiteDatabase mDb;
    private DataBaseHelper mDbHelper;

    public DataAdapter(Context context) {
        this.mContext = context;
        mDbHelper = new DataBaseHelper(mContext);
    }

    public DataAdapter createDatabase() throws SQLException {
        try {
            mDbHelper.close();
            mDbHelper.createDataBase();
        }
        catch (IOException mIOException) {
            Log.e(TAG, mIOException.toString() + "  UnableToCreateDatabase");
            throw new Error("UnableToCreateDatabase");
        }
        return this;
    }

    public DataAdapter open() throws SQLException {

        try {
            mDbHelper.openDataBase();
            mDbHelper.close();
            mDb = mDbHelper.getReadableDatabase();
        }
        catch (SQLException mSQLException) {
            Log.e(TAG, "open >>"+ mSQLException.toString());
            throw mSQLException;
        }
        return this;
    }

    public void close()
    {
        mDbHelper.close();
    }

    public Cursor getAllergenData(String query, String[] fields) {
        try {

            String sql = build_SQL_query(query, fields);

            Cursor mCur = mDb.rawQuery(sql, null);
            return mCur;
        }
        catch (SQLException mSQLException) {
            Log.e(TAG, "getAllergenData >> " + mSQLException.toString());
            throw mSQLException;
        }
    }

    private String build_SQL_query(String query, String[] fields) {

        String sql = "SELECT * FROM Allergens WHERE \"" + fields[0] + "\" LIKE '%" + query;

        for(int i = 1; i < fields.length; i++) {
            sql = sql + "%' OR \"" + fields[i] + "\" LIKE '%" + query;
        }
        sql = sql + "%'";
        Log.i("SQL Query: ", sql);

        return sql;
    }
}

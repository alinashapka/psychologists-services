import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get } from "firebase/database";
import { database } from "../../services/firebase";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId, { rejectWithValue }) => {
    try {
      const favoritesRef = ref(database, `favorites/${userId}`);
      const snapshot = await get(favoritesRef);

      if (snapshot.exists()) {
        const favoritesData = snapshot.val();

        const favoriteNames = Object.values(favoritesData).map(
          (item) => item.name
        );

        return favoriteNames;
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

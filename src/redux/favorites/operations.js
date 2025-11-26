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
        // favoritesData looks like: { "Dr. Sarah Davis": true, "Dr. Mark Thompson": true }

        // Get just the names (keys)
        const favoriteNames = Object.keys(favoritesData);
        // favoriteNames = ["Dr. Sarah Davis", "Dr. Mark Thompson"]

        return favoriteNames;
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

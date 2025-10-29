import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get } from "firebase/database";
import { database } from "../../services/firebase";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchPsychologists",
  async (_, { rejectWithValue }) => {
    try {
      const psychologistsRef = ref(database, "psychologists-app");
      const snapshot = await get(psychologistsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        const psychologistsArray = Array.isArray(data)
          ? data
          : Object.values(data);
        return psychologistsArray;
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

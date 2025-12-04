import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get } from "firebase/database";
import { database } from "../../services/firebase";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchPsychologists",
  async (_, { rejectWithValue }) => {
    try {
      const psychologistsRef = ref(database, "psychologists");
      const snapshot = await get(psychologistsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("📦 Data:", data);

        const psychologistsArray = Object.values(data).map((item, index) => ({
          ...item,
          id: `psych_${index}`,
        }));

        return psychologistsArray;
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

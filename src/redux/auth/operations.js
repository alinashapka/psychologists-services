import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../services/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredentials.user, { displayName: name });
      await auth.currentUser.reload();

      return {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        name,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
      };
    } catch (error) {
      const message = "Login failed. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

export const refreshUser = createAsyncThunk("auth/refreshUser", async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
        });
      } else {
        resolve(null);
      }
    });
  });
});

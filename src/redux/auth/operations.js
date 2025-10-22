import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
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
      console.log("User created:", userCredentials.user, {
        displayName: name,
      });
      return {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        name,
      };
    } catch (error) {
      rejectWithValue(error.message);
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
        email: user.uid,
        name: user.displayName || "",
      };
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

export const checkAuthState = createAsyncThunk(
  "auth/checkAuthState",
  async () => {
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
  }
);

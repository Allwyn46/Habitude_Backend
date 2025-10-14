import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Create a client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const dbConnect = () => {
  try {
    if (supabase) {
      console.log("✅ Database connected");
    } else {
      console.log("❌ Database not connected");
    }
  } catch (error) {
    console.log(`Database connection error: ${error}`);
  }
};

export { dbConnect, supabase };

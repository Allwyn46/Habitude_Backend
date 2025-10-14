import supabase from "./dbConnect";

// CREATE
export async function create(table, data) {
  const { data: result, error } = await supabase
    .from(table)
    .insert([data])
    .select();
  if (error) throw new Error(error.message);
  return result;
}

// READ ALL
export async function getAll(table) {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw new Error(error.message);
  return data;
}

// READ BY ID
export async function getById(table, id) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// UPDATE
export async function update(table, id, newData) {
  const { data, error } = await supabase
    .from(table)
    .update(newData)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

// DELETE
export async function remove(table, id) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { message: "Deleted successfully" };
}

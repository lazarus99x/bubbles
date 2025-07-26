import { supabase } from "./client";

/**
 * Checks if a table exists in the Supabase database
 * @param tableName The name of the table to check
 * @returns Promise<boolean> indicating if the table exists
 */
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    console.log(`Checking if table '${tableName}' exists...`);

    // Query the information_schema.tables to check if our table exists
    const { data, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .eq("table_name", tableName);

    if (error) {
      console.error(`Error checking if table '${tableName}' exists:`, error);

      // Alternative method: try to select from the table and see if it fails
      console.log(
        `Trying alternative method to check if '${tableName}' exists...`
      );
      const { error: selectError } = await supabase
        .from(tableName)
        .select("*")
        .limit(1);

      if (selectError) {
        console.error(`Error selecting from '${tableName}':`, selectError);

        // Check if error is "relation does not exist"
        if (
          selectError.message?.includes("relation") &&
          selectError.message?.includes("does not exist")
        ) {
          console.log(`Table '${tableName}' does not exist.`);
          return false;
        }

        // If some other error, we can't determine
        console.error(`Could not determine if table '${tableName}' exists.`);
        return false;
      }

      // If we got here, the select worked so the table exists
      console.log(`Table '${tableName}' exists (confirmed by select).`);
      return true;
    }

    // If we got data from information_schema, check if our table is in the results
    const exists =
      Array.isArray(data) && data.some((row) => row.table_name === tableName);
    console.log(
      `Table '${tableName}' ${exists ? "exists" : "does not exist"}.`
    );
    return exists;
  } catch (error) {
    console.error(`Error checking if table '${tableName}' exists:`, error);
    return false;
  }
};

/**
 * Describes a table by listing its columns and their types
 * @param tableName The name of the table to describe
 * @returns Promise<Object> with column information or null if error
 */
export const describeTable = async (tableName: string): Promise<any> => {
  try {
    console.log(`Describing table '${tableName}'...`);

    // Query the information_schema.columns to get column details
    const { data, error } = await supabase
      .from("information_schema.columns")
      .select("column_name, data_type, is_nullable, column_default")
      .eq("table_schema", "public")
      .eq("table_name", tableName);

    if (error) {
      console.error(`Error describing table '${tableName}':`, error);
      return null;
    }

    console.log(`Table '${tableName}' structure:`, data);
    return data;
  } catch (error) {
    console.error(`Error describing table '${tableName}':`, error);
    return null;
  }
};

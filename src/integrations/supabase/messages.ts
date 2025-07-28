import { supabase } from "./client";

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
  read: boolean;
  admin_reply?: string;
  replied_at?: string;
  replied_by?: string;
}

export interface CreateMessageData {
  name: string;
  email: string;
  message: string;
}

export interface ReplyToMessageData {
  admin_reply: string;
}

// Submit a new message from contact form
export async function submitMessage(
  data: CreateMessageData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("messages").insert([data]);

    if (error) {
      console.error("Error submitting message:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error submitting message:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Get all messages (admin only)
export async function getMessages(): Promise<{
  success: boolean;
  data?: Message[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Unexpected error fetching messages:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Mark a message as read (admin only)
export async function markMessageAsRead(
  messageId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", messageId);

    if (error) {
      console.error("Error marking message as read:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error marking message as read:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Reply to a message (admin only)
export async function replyToMessage(
  messageId: string,
  replyData: ReplyToMessageData
): Promise<{ success: boolean; error?: string }> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const { error } = await supabase
      .from("messages")
      .update({
        admin_reply: replyData.admin_reply,
        replied_at: new Date().toISOString(),
        replied_by: user.id,
        read: true,
      })
      .eq("id", messageId);

    if (error) {
      console.error("Error replying to message:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error replying to message:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Delete a message (admin only)
export async function deleteMessage(
  messageId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      console.error("Error deleting message:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error deleting message:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Get unread message count (admin only)
export async function getUnreadMessageCount(): Promise<{
  success: boolean;
  count?: number;
  error?: string;
}> {
  try {
    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false);

    if (error) {
      console.error("Error getting unread message count:", error);
      return { success: false, error: error.message };
    }

    return { success: true, count: count || 0 };
  } catch (error) {
    console.error("Unexpected error getting unread message count:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

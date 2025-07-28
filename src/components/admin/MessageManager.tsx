import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trash,
  Mail,
  MailOpen,
  Reply,
  Send,
  X,
  Clock,
  User,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  getMessages,
  markMessageAsRead,
  replyToMessage,
  deleteMessage,
  Message,
} from "@/integrations/supabase/messages";

const MessageManager: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [sendingReply, setSendingReply] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMessages = async () => {
    setRefreshing(true);
    try {
      const result = await getMessages();
      if (result.success && result.data) {
        setMessages(result.data);
      } else {
        toast.error(
          "Failed to fetch messages: " + (result.error || "Unknown error")
        );
      }
    } catch (error) {
      toast.error("Error fetching messages");
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const result = await markMessageAsRead(id);
      if (result.success) {
        setMessages(
          messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
        );
        toast.success("Message marked as read");
      } else {
        toast.error(
          "Failed to mark as read: " + (result.error || "Unknown error")
        );
      }
    } catch (error) {
      toast.error("Error marking message as read");
      console.error("Error marking as read:", error);
    }
  };

  const handleReply = async (messageId: string) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setSendingReply(true);
    try {
      const result = await replyToMessage(messageId, {
        admin_reply: replyText.trim(),
      });
      if (result.success) {
        setMessages(
          messages.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  admin_reply: replyText.trim(),
                  replied_at: new Date().toISOString(),
                  read: true,
                }
              : msg
          )
        );
        setReplyText("");
        setReplyingToId(null);
        toast.success("Reply sent successfully!");
      } else {
        toast.error(
          "Failed to send reply: " + (result.error || "Unknown error")
        );
      }
    } catch (error) {
      toast.error("Error sending reply");
      console.error("Error sending reply:", error);
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this message? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const result = await deleteMessage(id);
      if (result.success) {
        setMessages(messages.filter((msg) => msg.id !== id));
        toast.success("Message deleted successfully");
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      } else {
        toast.error(
          "Failed to delete message: " + (result.error || "Unknown error")
        );
      }
    } catch (error) {
      toast.error("Error deleting message");
      console.error("Error deleting message:", error);
    }
  };

  const unreadCount = messages.filter((msg) => !msg.read).length;
  const repliedCount = messages.filter((msg) => msg.admin_reply).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateMessage = (text: string, length: number = 100) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading messages...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Customer Messages</h2>
          <p className="text-gray-600 mt-1">
            Manage customer inquiries and feedback
          </p>
        </div>
        <Button
          onClick={fetchMessages}
          variant="outline"
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <MailOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Replied</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {repliedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Mail className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-500">
              Customer messages will appear here when they contact you.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`transition-all duration-200 hover:shadow-lg ${!message.read ? "border-blue-200 bg-blue-50/30" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-semibold">{message.name}</p>
                        <p className="text-sm text-gray-600">{message.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!message.read && (
                        <Badge variant="destructive" className="text-xs">
                          New
                        </Badge>
                      )}
                      {message.admin_reply && (
                        <Badge
                          variant="default"
                          className="text-xs bg-green-100 text-green-800"
                        >
                          Replied
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDate(message.created_at)}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Customer Message */}
                  <div>
                    <h4 className="font-medium mb-2">Customer Message:</h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <p
                          className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                          onClick={() => setSelectedMessage(message)}
                        >
                          {truncateMessage(message.message, 150)}
                          {message.message.length > 150 && (
                            <span className="text-blue-600 ml-1 hover:underline">
                              Read more
                            </span>
                          )}
                        </p>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Message from {message.name}</DialogTitle>
                          <DialogDescription>
                            {message.email} • {formatDate(message.created_at)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="whitespace-pre-wrap">
                            {message.message}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Admin Reply */}
                  {message.admin_reply && (
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-medium text-green-800 mb-2">
                        Your Reply:
                      </h4>
                      <p className="text-green-700 whitespace-pre-wrap">
                        {message.admin_reply}
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        Replied on{" "}
                        {message.replied_at
                          ? formatDate(message.replied_at)
                          : "Unknown"}
                      </p>
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingToId === message.id ? (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleReply(message.id)}
                          disabled={sendingReply || !replyText.trim()}
                          className="flex items-center gap-2"
                        >
                          <Send className="h-4 w-4" />
                          {sendingReply ? "Sending..." : "Send Reply"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setReplyingToId(null);
                            setReplyText("");
                          }}
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Action Buttons */
                    <div className="flex gap-2 pt-2">
                      {!message.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(message.id)}
                          className="flex items-center gap-2"
                        >
                          <MailOpen className="h-4 w-4" />
                          Mark as Read
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReplyingToId(message.id);
                          setReplyText(message.admin_reply || "");
                        }}
                        className="flex items-center gap-2"
                      >
                        <Reply className="h-4 w-4" />
                        {message.admin_reply ? "Edit Reply" : "Reply"}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(message.id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageManager;

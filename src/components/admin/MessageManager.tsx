
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

const MessageManager: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // For now this is just a placeholder since we'll implement the actual message functionality later
  useEffect(() => {
    // Simulate loading messages
    setLoading(true);
    setTimeout(() => {
      setMessages([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          message: 'I really enjoyed my meal last night! The service was excellent and the food was amazing.',
          created_at: new Date().toISOString(),
          read: false
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          message: 'Do you offer catering services for events?',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          read: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter(msg => msg.id !== id));
      toast.success("Message deleted successfully");
    }
  };

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
    toast.success("Message marked as read");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customer Messages</h2>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No messages found
                </TableCell>
              </TableRow>
            ) : messages.map((message) => (
              <TableRow key={message.id} className={message.read ? 'bg-gray-50' : 'bg-white'}>
                <TableCell className="font-medium">
                  {message.name}
                  {!message.read && (
                    <span className="ml-2 text-xs bg-bubbles-pink text-white px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                <TableCell>{new Date(message.created_at).toLocaleString()}</TableCell>
                <TableCell className="flex gap-1">
                  {!message.read && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleMarkAsRead(message.id)}
                      className="text-xs"
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(message.id)}>
                    <Trash size={18} className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MessageManager;

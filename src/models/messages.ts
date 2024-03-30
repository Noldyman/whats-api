interface Message {
  phoneNumber: string;
  recipientName: string;
  text: string;
}

export interface SendMessagesBody {
  messages: Message[];
}

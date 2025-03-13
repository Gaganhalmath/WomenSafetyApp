const mongoose = required('mongoose');

const UserSchema = new mongoose.schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    trustedContacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt:
    {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.model('User', UserSchema);

const ChatSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users in chat
    isGroup: { type: Boolean, default: false },
    groupName: { type: String },  // Only for group chats
    groupPicture: { type: String }, // Group icon
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // Latest message reference
    createdAt: { type: Date, default: Date.now }
  });
  
  const Chat = mongoose.model("Chat", ChatSchema);
  
  // Message Schema
  const MessageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    mediaUrl: { type: String }, // Optional media (image, video, etc.)
    messageType: { type: String, enum: ["text", "image", "video", "file"], default: "text" },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who have seen this message
    createdAt: { type: Date, default: Date.now }
  });
  
  const Message = mongoose.model("Message", MessageSchema);
  
  module.exports = { User, Chat, Message };
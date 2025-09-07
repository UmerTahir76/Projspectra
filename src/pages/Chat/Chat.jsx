import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase.js';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import './Chat.css';

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchChats(currentUser.email);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchChats = async (userEmail) => {
    setLoading(true);
    const q = query(collection(db, 'chat'), where('userGmail', '==', userEmail));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        chatList.push({ id: doc.id, ...data });
      });
      setChats(chatList);
      setLoading(false);
    });

    return unsubscribe;
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  if (loading) {
    return <div className="chat-container"><p>Loading chats...</p></div>;
  }

  if (!user) {
    return <div className="chat-container"><p>Please log in to view chats.</p></div>;
  }

  return (
    <div className="chat-container">
      {!selectedChat ? (
        <div className="chat-list">
          <h2>Your Chats</h2>
          {chats.length === 0 ? (
            <p>No chats available.</p>
          ) : (
            chats.map((chat) => (
              <div key={chat.id} className="chat-card" onClick={() => handleChatClick(chat)}>
                <div className="chat-card-header">
                  <h3>Admin</h3>
                </div>
                <div className="chat-card-message">
                  <p>Your project {chat.projectTitle} is  {chat.status}. {chat.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="chat-view">
          <button className="back-btn" onClick={handleBack}>Back</button>
          <h2>Chat with Admin</h2>
          <div className="messages">
            <div className="message admin-message">
              <p>{selectedChat.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getMessageHistoryBetween, getUsernames } from '../utils/api';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Paper } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Debounce function
const debounce = (func, delay) => {
    let inDebounce;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    }
};

const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const currentUser = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const socketRef = useRef(null);
    const isConnecting = useRef(false);
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    const connectWebSocket = useCallback(() => {
        if (isConnecting.current) return;
        isConnecting.current = true;

        console.log('Attempting to connect WebSocket');
        socketRef.current = new WebSocket(`ws://financial-instruments-platform-backend.onrender.com/ws/chat?token=${token}`);

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
            isConnecting.current = false;
        };

        socketRef.current.onmessage = (event) => {
            const messageText = event.data;
            console.log('Received message:', messageText);

            let newMessage;

            if (messageText.startsWith('From')) {
                const match = messageText.match(/From (.*?): (.*)/);
                if (match) {
                    const [, sender, content] = match;
                    newMessage = {
                        sender,
                        content,
                        timestamp: new Date().toISOString()
                    };
                }
            } else if (messageText.startsWith('Message sent to')) {
                console.log('Message sent confirmation:', messageText);
                return;
            } else if (messageText.startsWith('User') && messageText.endsWith('is not available')) {
                newMessage = {
                    sender: 'System',
                    content: messageText,
                    timestamp: new Date().toISOString()
                };
            } else if (messageText === 'Connected successfully. You can now send messages.') {
                console.log('Connection established');
                return;
            } else {
                console.warn('Received unexpected message format:', messageText);
                return;
            }

            if (newMessage) {
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            isConnecting.current = false;
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
            isConnecting.current = false;
        };
    }, [token]);

    const debouncedConnect = useCallback(debounce(connectWebSocket, 300), [connectWebSocket]);

    useEffect(() => {
        console.log('Initial useEffect running');
        const fetchUsers = async () => {
            try {
                const usernames = await getUsernames();
                console.log('Fetched usernames:', usernames);
                setUsers(usernames.filter(username => username !== currentUser));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();

        debouncedConnect();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
            isConnecting.current = false;
        };
    }, [currentUser, debouncedConnect]);

    useEffect(() => {
        console.log('Selected user changed:', selectedUser);
        const fetchMessages = async () => {
            if (selectedUser) {
                try {
                    const history = await getMessageHistoryBetween(selectedUser);
                    console.log('Fetched message history:', history);
                    if (history && Array.isArray(history)) {
                        const formattedMessages = history.map(msg => {
                            const timestamp = msg && msg._id
                                ? new Date(parseInt(msg._id.toString().substring(0, 8), 16) * 1000).toISOString()
                                : new Date().toISOString();

                            return {
                                sender: msg.senderUsername === currentUser ? currentUser : selectedUser,
                                content: msg.content || '',
                                timestamp: timestamp
                            };
                        });
                        setMessages(formattedMessages);
                    } else {
                        console.log('No message history or invalid data received');
                        setMessages([]);
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error);
                    setMessages([]);
                }
            } else {
                setMessages([]);
            }
        };
        fetchMessages();
    }, [selectedUser, currentUser]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleSendMessage = (content) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && selectedUser) {
            const message = `${selectedUser}:${content}`;
            socketRef.current.send(message);

            const newMessage = {
                sender: currentUser,
                content: content,
                timestamp: new Date().toISOString()
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
        } else {
            console.error('WebSocket is not connected or no user selected');
            // Optionally, attempt to reconnect here
            if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
                debouncedConnect();
            }
        }
    };

    return (
        <Box sx={{flexGrow: 1, p: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{p: 2}}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon/>}
                            onClick={handleBackToDashboard}
                            sx={{mb: 2}}
                        >
                            Back to Dashboard
                        </Button>
                        <ChatWindow
                            messages={messages}
                            currentUser={currentUser}
                        />
                        <MessageInput
                            onSendMessage={handleSendMessage}
                            selectedUser={selectedUser}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <UserList
                        users={users}
                        onSelectUser={handleSelectUser}
                        selectedUser={selectedUser}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatPage;
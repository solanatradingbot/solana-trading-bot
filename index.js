// Import required modules
const { Connection, PublicKey } = require("@solana/web3.js"); // Solana connection library
const TelegramBot = require("node-telegram-bot-api"); // Telegram bot library
const dotenv = require("dotenv"); // Environment variables
const fetch = require("node-fetch"); // For REST API calls
const WebSocket = require("ws"); // For WebSocket subscriptions

// Load environment variables
dotenv.config();

// Solana connection
const connection = new Connection(process.env.SOLANA_RPC);

// Initialize Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Command: /start - Greet the user
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Welcome to the Solana Trading Bot!\n\nAvailable commands:\n" +
        "/snipe <token_address> - Attempt to snipe a specific Solana meme coin.\n" +
        "/trends - Get the top trending Solana meme coins.\n" +
        "/info - Learn how to use this bot effectively.\n\n" +
        "Stay tuned for real-time market analysis and insights!"
    );
});

// Command: /snipe <token_address> - Sniping logic placeholder
bot.onText(/\/snipe (.+)/, async (msg, match) => {
    const tokenAddress = match[1];
    bot.sendMessage(msg.chat.id, `Attempting to snipe token at: ${tokenAddress}`);

    try {
        const tokenPublicKey = new PublicKey(tokenAddress);
        const accountInfo = await connection.getAccountInfo(tokenPublicKey);

        if (!accountInfo) {
            bot.sendMessage(msg.chat.id, `Token not found: ${tokenAddress}`);
            return;
        }

        bot.sendMessage(msg.chat.id, `Successfully fetched token details for: ${tokenAddress}`);
    } catch (error) {
        bot.sendMessage(msg.chat.id, `Error sniping token: ${error.message}`);
    }
});

// Command: /trends - Fetch trending Solana meme coins
bot.onText(/\/trends/, async (msg) => {
    try {
        const response = await fetchTopTrendingCoins();
        bot.sendMessage(msg.chat.id, `Top trending Solana meme coins:\n${response}`);
    } catch (error) {
        bot.sendMessage(msg.chat.id, `Error fetching trends: ${error.message}`);
    }
});

// Tensor REST API: Fetch top meme coins by 24hr volume
async function fetchTopTrendingCoins() {
    const TENSOR_API_KEY = process.env.TENSOR_API_KEY;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "x-tensor-api-key": TENSOR_API_KEY,
        },
    };

    const url = "https://api.mainnet.tensordev.io/api/v1/collections";

    const queryParams = new URLSearchParams();
    queryParams.append("filter", "meme-coins");
    queryParams.append("sortBy", "volume24h:desc");
    queryParams.append("limit", 10);

    const fullUrl = `${url}?${queryParams.toString()}`;

    try {
        const response = await fetch(fullUrl, options);
        const data = await response.json();

        if (data && data.tokens) {
            return data.tokens
                .map((token) => `${token.symbol}: ${token.volume24h} SOL`)
                .join("\n");
        } else {
            return "No trending meme coins found.";
        }
    } catch (error) {
        console.error("Error fetching collections:", error.message);
        throw new Error("Failed to fetch trending meme coins.");
    }
}

// Tensor WebSocket: Real-time event monitoring
(() => {
    const socket = new WebSocket("wss://api.mainnet.tensordev.io/ws", {
        headers: {
            "x-tensor-api-key": process.env.TENSOR_API_KEY,
        },
    });

    // On connection open
    socket.addEventListener("open", () => {
        console.log("Connected to Tensor WebSocket.");
        socket.send(
            JSON.stringify({
                event: "ping",
                payload: {},
            })
        );
    });

    // Listen for incoming messages
    socket.addEventListener("message", (event) => {
        const eventData = event?.data?.toString();
        if (eventData) {
            console.log("WebSocket Event:", JSON.parse(eventData));
        }
    });

    // Handle errors
    socket.addEventListener("error", (error) => {
        console.error("WebSocket Error:", error.message);
    });

    // Handle connection close
    socket.addEventListener("close", (event) => {
        console.log("WebSocket Connection Closed:", event.reason);
    });
})();

// Initial fetch of top trending meme coins
fetchTopTrendingCoins()
    .then((data) => {
        console.log("Initial fetch of top trending meme coins:", data);
    })
    .catch((err) => {
        console.error("Initial fetch failed:", err.message);
    });


##Developed a Server Side Application to fetch Crypto Transactions of a user

###Task 1:
1. Developed an API using Node.js to fetch the crypto transactions of a user.
2. Used the Etherscan API to fetch the list of "Normal" transactions for a user.
3. The input for the API was the address of a user. The output was a list of transactions for this address which have to be stored in a database (MongoDB)

###Task 2:
1. Built a system within the same server to fetch the price of Ethereum every 10 minutes and store it in the database.
2. Used the Coingeko api to fetch the current price of Ethereum.

###Task 3:
1. Developed a "GET" API for a user where they gave their address as an input and got their current balance and current price of ether as an output.
2. The balance was calculated from the transactions of the user. If the “from” address is that of the user, the “value” property gets deducted from the user’s balance. If the “to” address is that of the user, the “value” property gets added from the user’s balance. These transactions were the ones that were fetched in the previous tasks.

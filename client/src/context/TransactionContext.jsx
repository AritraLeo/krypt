import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from "../utils/constants";


export const TransactionContext = React.createContext();


const { ethereum } = window;

const getEthereumContracrt = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

// Real Deal happens here:
export const TransactionProvider = ({ children }) => {
    // Seeting account state
    const [currentAccount, setCurrentAccount] = useState('');
    // Getting form data
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    // Loading:
    const [isLoading, setIsLoading] = useState(false);
    // Transaction Count:
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }



    const checkIfWalletIsConnected = async () => {
        
        try {
        if (!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length) {
            setCurrentAccount(accounts[0]);


            // getAllTransactions();
        }
        else {
            console.log("No accounts found")
        }

        // console.log(accounts);

            
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object.")
        }
        
    }

    // Send Transactions:
    const sendTransaction = async () => {
        try {
        if (!ethereum) return alert("Please install metamask");
            
            // Getting data from form:
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContracrt();
            const parsedAmount = ethers.utils.parseEther(amount);

            // Send the eth
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',   // wei-21000000000000
                    value: parsedAmount._hex,
                }]
            });

            // add to blockchain:
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());


        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object.")
        }
    }


    // Connect Wallet :
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            // Helps user to choose his desired account
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);

            throw new Error("No ethereum object.")
        }
    } 

    // To render every time:
    useEffect(() => {
            checkIfWalletIsConnected();
        
        }, []);

    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
}
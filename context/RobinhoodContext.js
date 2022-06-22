import { createContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export const RobinhoodContext = createContext()

export const RobinhoodProvider = ({children}) => {
    
    const [currentAccount, setCurrentAccount] = useState('')
    const [formattedAccount, setFormattedAccount] = useState('')
    
    const { isAuthenticated, authenticate, enableWeb3, user, logout, Moralis} = useMoralis()
    
    //checking if the user is authenticated
    useEffect(() => {
        if (isAuthenticated){
            // account is the user's ethAddress
            const account = user.get('ethAddress')
            //format the account as '...' + 3 last numbers at the end
            let formatAccount = account.slice(0,4) + '...' + account.slice(-4)
            setFormattedAccount(formatAccount)
            setCurrentAccount(account)
        }   
    }, [isAuthenticated, enableWeb3])

    useEffect(() => {
        if(!currentAccount) return 
        ;(async () => {
            const response = await fetch('/api/createUser', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    walletAddress: currentAccount,
                })
            })

            const data = await response.json()
        }) 
    }, [ currentAccount])

    const connectWallet = () => {
        authenticate()
    }

    const signOut = () => {
        logout()
    }

    return (
        <RobinhoodContext.Provider
        value = {{
            connectWallet,
            signOut,
            currentAccount,
            isAuthenticated,
            formattedAccount,
        }}
        >
            {children}
        </RobinhoodContext.Provider> 
    )
}
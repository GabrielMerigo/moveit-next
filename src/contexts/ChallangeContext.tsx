import { createContext, useState, ReactNode } from 'react'
import { Interface } from 'readline'
import challanges from '../../challenges.json'


interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount:number;
}

interface challangesContextData {
    level: number,
    currentExperience: number,
    challangesCompleted: number,
    activeChallenge: Challenge,
    levelUp: () => void, 
    startNewChallange: () => void;
    
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallangeContext = createContext({} as challangesContextData)

export function ChallangeProvider({ children }:ChallengesProviderProps){
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challangesCompleted, setChallangesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] =  useState(null)

    function levelUp(){
        setLevel(level + 1)
    }

    function startNewChallange(){
        const randomNewChallengeIndex = Math.floor(Math.random() * challanges.length)
        const challenge = challanges[randomNewChallengeIndex]
        setActiveChallenge(challenge)

    }

    return (
        <ChallangeContext.Provider 
        value={{level, 
                currentExperience,
                challangesCompleted,
                activeChallenge, 
                levelUp,
                startNewChallange,
                }}>
            {children}
        </ChallangeContext.Provider>
    )
}
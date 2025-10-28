import React, { useState } from 'react';


export default function calculatrice() {
    const [ele1, setEle1] = useState(0);
    const [ele2, setEle2] = useState(0);
    const [result, setResult] = useState(0);

    const handleAddition = () => {
        setResult(Number(ele1) + Number(ele2));
        console.log(ele1 + ele2)
    };

    
    const handleSubtraction = () => {
        setResult(Number(ele1) - Number(ele2));
    };

    console.log(result)

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
            <h1 className="flex justify-center w-80 text-3xl text-white mb-6 bg-gray-500 p-6 rounded-lg shadow-lg text-bold">Calculatrice</h1>
            <div className='bg-gray-500 gap-4 p-6 rounded-lg shadow-lg flex flex-col'> 
                <input type="number"value={ele1} onChange={(e) => setEle1(e.target.value)} />
                <input type="number" value={ele2} onChange={(e) => setEle2(e.target.value)}/>
                <div className="flex gap-4">
                    <button
                        onClick={handleAddition}
                        className="text-white font-bold py-2 px-4 rounded">
                        Addition
                    </button>
                    <button
                        onClick={handleSubtraction}
                        className="text-white font-bold py-2 px-4 rounded">
                        Soustraction
                    </button>
                </div>
                <div className="text-white text-xl mt-4">Résultat: {result} </div>   
            </div>
    </div>

    );
    console.log(result)
}       
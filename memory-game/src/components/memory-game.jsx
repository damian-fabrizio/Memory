import { useEffect, useState } from "react"


const MemoryGame = () => {
    const [gridSize, setGridSize] = useState(4);
    const [cards, setCards] = useState([]);

    const [revealed, setRevealed] = useState([]);
    const [solved, setSolved] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [win, setWin] = useState(false);

    const handleGridSizeChange = (e) => {

        // take event in param, make it an integer
       const size = parseInt(e.target.value)

        
        if(size>=2 && size<=6){
            setGridSize(size);
        } 
    };

    // generates grid
    const initializeGame =()=>{
        // 2x2, 3x3, 4x4
        const totCards = gridSize * gridSize; //16
        // round down if random number is a decimal
        const pairCount = Math.floor(totCards/2); //8
        // empty array of pairCount size, keys are 0-7 so add n=>n+1 to make it 1-8
        const numbers = [...Array(pairCount).keys()].map(n=>n+1);
        // array of variable numbers, add sort func which iterates thru arr and sorts in ascending or descending order. -0.5 makes numbers more random. slice func take cards starting from index 0, to totCards index. transform each array into object. 
        const shuffledCards = [...numbers,...numbers].sort(()=>Math.random()-0.5).slice(0,totCards).map((number, index)=>({id: index, number}));

        // store shuffled cards in setCards
        setCards(shuffledCards);
        // when game starts reset other states
        setRevealed([]);
        setSolved([]);
        setWin(false);

    };

    useEffect(()=>{
        initializeGame();
    }, [gridSize]);

    const checkMatch=(secondId)=>{
        const [firstId] = revealed;
        if(cards[firstId].number===cards[secondId].number){
            setSolved([...solved, firstId, secondId]);
            setRevealed([]);
            setDisabled(false);

        }else{
            setTimeout(()=>{
                setRevealed([]);
                setDisabled(false);
            },700)
        }

    }

    const handleClick=(id)=>{
        // if board is disabled or user wins
        if (disabled || win) return;

        // check that array is not empty
        if(revealed.length===0){
            setRevealed([id]);
            return;
        }

        if(revealed.length===1){
            setDisabled(true)
            if(id!==revealed[0]){
                setRevealed([...revealed,id]);
                // check match logic
                checkMatch(id);
            }else{
                setRevealed([])
                setDisabled(false);
            }
        }
    }

    const isRevealed = (id) => revealed.includes(id) || solved.includes(id);
    const isSolved = (id) => solved.includes(id);

    useEffect(()=>{
        // if all of the cards are in the solved array
        if(solved.length === cards.length && cards.length>0){
            setWin(true);
        }
        // triggers these two 
    },[solved,cards])
    
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-customBackg p-4">
        <h1 className="text-3xl text-gray-400 font-bold mb-3">Test Your Memory!</h1>
        {/* input */}
        <div className="mb-4">
            <label htmlFor="gridSize" className="mr-2 text-gray-400">Grid Size</label>
            <input 
                type="number"
                id="gridSize"
                min='2'
                max='10'
                value={gridSize}
                onChange={handleGridSizeChange}
                className="border-2 border-gray-400 rounded px-2 py-1 bg-gray-300"
            />
        </div>
        {/* gameboard */}
        <div className={`grid gap-2 mb-4`}
        style={{
            gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))`,
            width: `min(100%, ${gridSize*3.5}rem)`,
        }}
        >
            {cards.map((card)=>{
                return <div key={card.id}
                onClick={()=>handleClick(card.id)}
                className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-200 
                    ${isRevealed(card.id)
                        ?isSolved(card.id)
                        ?"bg-green-600 text-white"
                        :"bg-blue-500 text-white"
                        : "bg-customGrid text-gray-400 hover:bg-customHover1"}`}
                >
                    {isRevealed(card.id)? card.number:"?"}
                </div>
            })}
        </div>
        {/* result */}
        {win &&(
            <div className="mt-4 text-4xl font-bold text-gray-400 animate-bounce">Success! 
            </div>
        )}

        {/* reset / play again button */}
        <button 
        onClick={initializeGame}
        className="mt-2 px-4 py-2 bg-green-600 text-gray-300 rounded hover:bg-green-700 transition-colors">
            {win?"Play Again":"Reset"}
        </button>
    </div>
  )
}

export default MemoryGame
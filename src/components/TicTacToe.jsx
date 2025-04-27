import { useState } from "react";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null)); // 9 kotak
    const [isXNext, setIsXNext] = useState(true); // Giliran pemain
    const [winner, setWinner] = useState(null); // Cek siapa yang menang

    // Fungsi saat klik kotak
    const handleClick = (index) => {
        if (board[index] || winner) return; // Kalau sudah diisi atau sudah ada pemenang, abaikan

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const winnerPlayer = calculateWinner(newBoard);
        if (winnerPlayer) {
            setWinner(winnerPlayer);
            setTimeout(() => {
                alert(`🎉 Player ${winnerPlayer} wins!`);
            }, 100);
        }
    };

    // Fungsi cek pemenang
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    // Fungsi reset game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
            <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg animate-bounce">Tic Tac Toe</h1>

            <div className="grid grid-cols-3 gap-4">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`w-24 h-24 flex items-center justify-center text-4xl font-bold rounded-lg shadow-md transition-transform transform hover:scale-110 duration-200 
            ${cell === "X" ? "bg-blue-500 text-white" : cell === "O" ? "bg-pink-500 text-white" : "bg-white/30 text-white"}
            ${winner && (cell === winner ? "border-4 border-yellow-400" : "")}
            `}
                    >
                        {cell}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                <button
                    onClick={resetGame}
                    className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition duration-300"
                >
                    Reset Game
                </button>
            </div>

            {winner && (
                <p className="mt-4 text-white font-semibold text-xl animate-pulse">
                    🎉 Player {winner} Wins!
                </p>
            )}
        </div>
    );
};

export default TicTacToe;

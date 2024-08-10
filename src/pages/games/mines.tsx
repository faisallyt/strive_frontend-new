import { showToast } from "@/app/notifier/toast";
import React, { useEffect, useState } from "react";
import { MdCasino } from "react-icons/md";
import { getUserSession } from "@/Auth/UserSession";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";

const Mines = ({ setLoader = (t: boolean) => {} }) => {
  const gridItems = Array.from({ length: 25 }, (_, i) => i + 1);

  const [gameactive, setGameactive] = useState(0);
  // 0 -> game false
  // 1 -> game true
  // 2 -> game over
  const [amount, setAmount] = useState<number>(100);
  const total = 25;
  const [tnt, setTnt] = useState<any>(1);
  if (tnt > 24) {
    setTnt(24);
  }
  if (tnt < 1) {
    setTnt(1);
  }
  const coin = total - tnt;
  const [gridColors, setGridColors] = useState(Array(25).fill("#373B4E"));
  const colors = ["red", "green"];
  const [showPopup, setShowPopup] = useState(false);
  const [board, setBoard] = useState<boolean[]>(Array(25).fill(false));
  // this state for auto and manual bet tab
  const [auto, setAuto] = useState(false);

  const handleStartGame = () => {
    if (isNaN(amount) || amount < 100) {
      showToast("Please enter a valid amount", "error");
      return;
    }

    // if (!getUserSession().userData) {
    //   showToast("Please Sign in to play", "error");
    //   // wait for 2 seconds
    //   return;
    // }

    const board1 = Array(25).fill(false);
    let temptnt = tnt;
    while (temptnt > 0) {
      const randomIndex = Math.floor(Math.random() * 25);
      if (!board1[randomIndex]) {
        board1[randomIndex] = true;
        temptnt--;
        console.log("TNT", randomIndex);
      }
    }

    // console.log("board", board1);

    setBoard(board1);
    showToast("Game started", "success");
    setGridColors(Array(25).fill("#373B4E"));
    setGameactive(1);
  };

  const handleClick = (index: number) => {
    if (gridColors[index] !== "#373B4E") return; // If already clicked, do nothing
    console.log("board", board);
    if (gameactive === 1) {
      if (board[index]) {
        // console.log("TNT clicked", index);
        setGridColors((prev) => {
          const newColors = [...prev];
          newColors[index] = "red";
          return newColors;
        });
        setShowPopup(true);
        showToast("You lost", "error");
        setTimeout(() => {
          setShowPopup(false);
          resetGame();
        }, 500);
      } else {
        setGridColors((prev) => {
          const newColors = [...prev];
          newColors[index] = "green";
          // if number of green grid is equal to coins then cashout automatically

          return newColors;
        });
      }
    } else {
      showToast("Game is not active", "info");
    }
  };

  const resetGame = () => {
    setGameactive(2);
    setAmount(100);
    let tempGridColors = [...gridColors];
    for (let i = 0; i < 25; i++) {
      if (board[i]) {
        tempGridColors[i] = "red";
      }
      //  else {
      //   tempGridColors[i] = "green";
      // }
    }
    setGridColors(tempGridColors);

    setTimeout(() => {
      setBoard(Array(25).fill(false));
      setGameactive(0);
      setGridColors(Array(25).fill("#373B4E"));
    }, 1000);
  };

  useEffect(() => {
    setLoader(false);
    return () => {
      setLoader(true);
    };
  }, []);

  return (
    <div className="flex" style={{ height: "calc(100vh - 4.5rem)" }}>
      <div className=" text-white flex-col bg-[#1C1E29] h-full p-2 rounded-l-lg w-1/4">
        <div className="buttons flex justify-around bg-[#0B0C13] p-1 mb-1 rounded-md">
          <button
            onClick={() => setAuto(!auto)}
            className={`flex justify-center duration-1000 rounded-md px-6 py-1 text-[0.8rem] font-medium border border-[#0b0c13] hover:border-[#b5a9a9] ${
              !auto ? "bg-[#1F2230] text-[#F5F0FF]" : " text-slate-500"
            }`}
            // className="flex justify-center rounded-md px-6 py-1 border  border-[#0b0c13] hover:border-[#b5a9a9]"
          >
            Manual
          </button>
          <button
            onClick={() => setAuto(!auto)}
            className={`flex justify-center duration-1000 rounded-md px-6 py-1 text-[0.8rem] font-medium border border-[#0b0c13] hover:border-[#b5a9a9]
            ${auto ? "bg-[#1F2230] text-[#F5F0FF]" : " text-slate-500"} 
              `}
            // className="flex justify-center rounded-md px-6 py-1 border border-[#0b0c13] hover:border-[#b5a9a9]"
          >
            Auto
          </button>
        </div>
        <form id="minesform" onSubmit={(e) => e.preventDefault()}>
          {!auto ? (
            <>
              <div id="mines-bet" className="flex flex-col pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                  Bet Amount
                </label>
                <div className="flex gap-2 ">
                  <input
                    type="text"
                    name="betamount"
                    value={amount}
                    // when game starts, user can't change the amount
                    disabled={gameactive ? true : false}
                    onChange={(e) =>
                      setAmount(
                        parseInt(e.target.value) ? parseInt(e.target.value) : 0
                      )
                    }
                    placeholder="Bet Amount"
                    className="w-2/3 shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                  />
                  <div className="buttons flex gap-1">
                    <button
                      disabled={gameactive ? true : false}
                      onClick={() => setAmount(amount * 0.5)}
                      className="w-[2.5rem] bg-[#323547] rounded-md text-[0.75rem] border border-[#323547] hover:border-[#6F79A1]"
                    >
                      1/2
                    </button>
                    <button
                      disabled={gameactive ? true : false}
                      onClick={() => setAmount(amount * 2)}
                      className="w-[2.5rem] bg-[#323547] rounded-md text-[0.75rem] border border-[#323547] hover:border-[#6F79A1]"
                    >
                      2x
                    </button>
                  </div>
                </div>
              </div>
              {/* </div> */}
              <div className="flex gap-1">
                <div className="flex flex-col pt-1 w-1/2">
                  <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                    TNTs
                  </label>
                  <input
                    type="number"
                    name="bomb"
                    value={tnt}
                    disabled={gameactive ? true : false}
                    onChange={(e) =>
                      setTnt(
                        parseInt(e.target.value) ? parseInt(e.target.value) : 0
                      )
                    }
                    placeholder="TNTs"
                    className="shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                  />
                </div>
                <div className="flex flex-col pt-1 w-1/2">
                  <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                    Coins
                  </label>
                  <input
                    type="text"
                    name="coin"
                    value={coin}
                    placeholder="Coins"
                    className="shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="flex flex-col pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                  Total profit
                </label>
                <input
                  type="text"
                  name="profit"
                  placeholder="Total profit"
                  className="shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                />
              </div>
              <div className="relative flex flex-col gap-4 text-[0.9rem] font-medium pt-4">
                {gameactive != 0 && (
                  <button className="flex justify-center items-center bg-[##1C1E29] border border-[#353849] rounded-md  py-[0.4rem] tracking-wide text-[#D0D6F5]">
                    <span>
                      <MdCasino className="mr-2" />
                    </span>
                    <span>Pick Random tile</span>
                  </button>
                )}
                {gameactive ? (
                  <button
                    className="bg-[#9562FF] border border-[#A77CFF] rounded-md py-[0.4rem] tracking-wide"
                    onClick={() => {
                      showToast("You cashed out", "success");
                      resetGame();
                      setAmount(100);
                    }}
                  >
                    Cashout
                  </button>
                ) : (
                  <button
                    className="bg-[#2f72d7] border border-[#377bbe] rounded-md py-[0.4rem] tracking-wide"
                    onClick={handleStartGame}
                  >
                    Start Game
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div id="mines-bet" className="pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium">
                  Bet Amount
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="betamount"
                    value={amount}
                    // when game starts, user can't change the amount
                    disabled={gameactive ? true : false}
                    onChange={(e) =>
                      setAmount(
                        parseInt(e.target.value) ? parseInt(e.target.value) : 0
                      )
                    }
                    placeholder="Bet Amount"
                    className="w-2/3 shadow appearance-none rounded-lg h-8  py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                  />
                  <div className="buttons flex gap-1">
                    <button
                      disabled={gameactive ? true : false}
                      onClick={() => setAmount(amount * 0.5)}
                      className="w-[2.5rem] bg-[#323547] rounded-md text-[0.75rem] border border-[#323547] hover:border-[#6F79A1]"
                    >
                      1/2
                    </button>
                    <button
                      disabled={gameactive ? true : false}
                      onClick={() => setAmount(amount * 2)}
                      className="w-[2.5rem] bg-[#323547] rounded-md text-[0.75rem] border border-[#323547] hover:border-[#6F79A1]"
                    >
                      2x
                    </button>
                  </div>
                </div>
              </div>
              {/* </div> */}
              <div className="flex flex-col pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                  TNTs
                </label>
                <input
                  type="number"
                  name="bomb"
                  value={tnt}
                  disabled={gameactive ? true : false}
                  onChange={(e) =>
                    setTnt(
                      parseInt(e.target.value) ? parseInt(e.target.value) : 0
                    )
                  }
                  placeholder="TNTs"
                  className="shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                  Number of bets
                </label>
                <input
                  type="text"
                  name="numberofbets"
                  className="shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                  On Win
                </label>
                <div className="flex flex-row">
                  <button className="px-2 mr-1 text-[#F5F0FF] text-[0.7rem] font-medium bg-[#323547] rounded-md">
                    Reset
                  </button>
                  <BsGraphUpArrow className="text-white font-bold text-[1rem] m-auto" />
                  <input
                    type="text"
                    name="onwin"
                    className="w-1/2 shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="flex flex-col pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                  On Loss
                </label>
                <div className="flex flex-row">
                  <button className="px-2 mr-1 text-[#F5F0FF] text-[0.7rem] font-medium bg-[#323547] rounded-md">
                    Reset
                  </button>
                  <BsGraphDownArrow className="text-white font-bold text-[1rem] m-auto" />
                  <input
                    type="text"
                    name="onloss"
                    className="w-1/2 shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="flex flex-col pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                  Stop on profit
                </label>
                <input
                  type="text"
                  name="stopprofit"
                  className="shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-1">
                <label className="text-[#6F79A1] text-[0.8rem] font-medium tracking-wide">
                  Stop on loss
                </label>
                <input
                  type="text"
                  name="stoploss"
                  className="shadow appearance-none rounded-lg h-8 py-1 px-3 bg-[#1c1e29] text-[#9094A6] text-[0.88rem] leading-tight border border-[#353849] focus:outline-1 focus:shadow-outline"
                />
              </div>
              <div className="relative flex flex-col gap-4 text-[0.9rem] font-medium pt-1 mt-1">
                {gameactive ? (
                  <button
                    className="bg-[#9562FF] border border-[#A77CFF] rounded-md py-[0.4rem] tracking-wide"
                    onClick={() => {
                      showToast("You cashed out", "success");
                      resetGame();
                      setAmount(100);
                    }}
                  >
                    Cashout
                  </button>
                ) : (
                  <button
                    className="bg-[#2f72d7] border border-[#377bbe] rounded-md py-[0.4rem] tracking-wide"
                    onClick={handleStartGame}
                  >
                    Start Game
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>

      <div className="right text-white bg-[#0B0C13] w-full flex justify-center items-center ">
        <div className="grid grid-cols-5 gap-3">
          {gridItems.map((item, index) => (
            <div
              key={item}
              className="w-[5rem] h-[5rem] duration-200 p-1 rounded-lg border-1 border-gray-800 flex items-center justify-center hover:scale-110 cursor-pointer"
              onClick={() => handleClick(index)}
              //shadow only when not selected
              style={{
                backgroundColor: gridColors[index],
                boxShadow:
                  gridColors[index] === "#373B4E"
                    ? "0 6px 0 0 #272A3C"
                    : "none",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mines;

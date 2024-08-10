import { showToast } from "@/app/notifier/toast";
import { api } from "../client";
import axios from "axios";
import { FAILED_TO_PROCESS_NEW_BET, FAILED_TO_UPDATE_BALANCE, GAME_START_ERROR } from "@/app/constants/errorMessages";




//function to check the game status and decide whether we are on a new game or a game is already in progress
let gameStatus: "active" | "new_game" | null = null; // Initial game status
export const isActiveMinesGame = async (): Promise<void> => {
  try {
    const response = await api.get("/mines/game-status");
    //the status code will be fetched once the service is available from backend
    const statusCode = response.data.status;

    if (statusCode === 205) {
      //this means that the game is already active
      gameStatus = "active";
    } else if (statusCode === 200) {
      //this means that we can start a new game
      gameStatus = "new_game";
    } else {
      throw new Error(`Unexpected status code: ${statusCode}`);
    }
  } catch (error) {
    console.error("Error checking Mines game status:", error);
    showToast("Failed to check Mines game status.");
  }
};

//This function will return the status of the game
export const getMinesGameStatus = (): "active" | "new_game" | null => {
  return gameStatus;
};




//this function will control the PLAY button, if the game is already active
//this will check for the game status
export const handlePlayButtonClick = async () => {
  try {
    //  getMinesGameStatus();

    const gameStatus = getMinesGameStatus();
    if (gameStatus === "new_game") {
      console.log("New game is started");

      // Additional logic to handle new game start
    } else if (gameStatus === "active") {
      showToast("Game is already active");
    } else {
      showToast("Unknown game status");
    }
  } catch (error: any) {
    console.error("Error handling play button click:", error);
    showToast(error.message || GAME_START_ERROR, "error");
  }
};




//Function to handle the next bet, fetches data from the server that if the next bet is going to be
//a success or failure.
export const next_bet = async (tileIndex: number) => {
  try {
    const response = await axios.post("backend-api-url", { tileIndex });

    //fetches the response for the tile (whether it is a mine or a diamond)
    const data = response.data;

    console.log("Next bet response:", data);
  } catch (error) {
    console.error("Error in next_bet:", error);
    showToast(FAILED_TO_PROCESS_NEW_BET, "error");
  }
};



//Function to handle the cashout service
export const Cashout = async (): Promise<void> => {
    try {
      const response = await axios.post("/cashout/mines", {
      });
    } catch (error) {
      console.error("Error updating balance:", error);
      showToast(FAILED_TO_UPDATE_BALANCE, "error");
    }
  };
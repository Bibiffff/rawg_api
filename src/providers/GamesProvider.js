import { createContext, useState, useEffect, useContext } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";



const baseUrl = "https://api.rawg.io/api";
const key = "2c772d9aa00d40c8893eae42f83f456a";
const GamesContext = createContext();

export const useGamesContext = () => {
    const context = useContext(GamesContext);
    return context;

}

const getGames = async () => {
    const result = await fetch(`${baseUrl}/games?key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}




export const getGameById = async (id) => {
    const result = await fetch(`${baseUrl}/games/${id}?key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=uft-8",
        }
    });
    return await result.json();
}

///Achievements - /games/{id}/achievements
export const getGameAchievementsById = async (id) => {
    const result = await fetch(`${baseUrl}/games/${id}/achievements?key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=uft-8",
        }
    });

    return await result.json();
}

const getGamesBySearchQuery = async (query) => {
    const result = await fetch(`${baseUrl}/games?search=${query}&search_exact=true&key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=uft-8",
        }
    });
    return await result.json();
}

export const GamesProvider = ({ children }) => {
    const [games, setGames] = useState();
    const [gameDetails, setGameDetails] = useState([]);
    const [searchParams] = useSearchParams();


    useEffect(() => {
        const fetchData = async () => {
            const searchQuery = searchParams.get("query");
            if (searchQuery) {
                setGames(await getGamesBySearchQuery(searchQuery));
            }
            else {
                setGames(await getGames());
            }

        }
        fetchData();
    }, [searchParams.get("query")]);

    const findById = async (id) => {
        //har vi cachet et spil
        const foundGame = gameDetails.find(game => game.id == id);
        if (foundGame) {
            return foundGame;
        }
        else {
            const game = await getGameById(id);
            if (game) {
                setGameDetails(prevData => [...prevData, game]);
                return game;
            }
        }
    }

    const findAchievementsById = async (id) => {
        const achievements = await getGameAchievementsById(id);
        if (achievements) {
            return achievements;
        }
    }

    return (
        <GamesContext.Provider value={{ games, findById, findAchievementsById }}>
            {children}
        </GamesContext.Provider>
    );
}
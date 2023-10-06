import { createContext, useState, useContext, useEffect } from "react";
import React from "react";


const baseUrl = "https://api.rawg.io/api";
const key = "2c772d9aa00d40c8893eae42f83f456a";
const DevelopersContext = createContext();

export const useDevelopersContext = () => {
    const context = useContext(DevelopersContext);
    return context;

}

const getDevelopers = async () => {
    const result = await fetch(`${baseUrl}/developers?key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    });
    return await result.json();
}

export const getDeveloperById = async (id) => {
    const result = await fetch(`${baseUrl}/developers/${id}?key=${key}`, {
        method: "GET",
        headers: {
            "content-type": "application/json; charset=uft-8",
        }
    });
    return await result.json();
}


export const DevelopersProvider = ({ children }) => {
    const [deve, setDevelopers] = useState();
    const [developerDetails, setDeveloperDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setDevelopers(await getDevelopers());
        }

        fetchData();
    }, []);

    const idByFind = async (id) => {
        //har vi cachet et spil
        const foundDeveloper = developerDetails.find(deve => deve.id == id);
        if (foundDeveloper) {
            return foundDeveloper;
        }
        else {
            const deve = await getDeveloperById(id);
            if (deve) {
                setDeveloperDetails(prevData => [...prevData, deve]);
                return deve;
            }
        }
    }

    return (
        <DevelopersContext.Provider value={{ deve, idByFind }}>
            {children}
        </DevelopersContext.Provider>
    );
}
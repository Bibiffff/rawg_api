import { createContext, useState, useEffect, useContext } from "react"

const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : undefined;
    });

    //favorites
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem(("userFavorites"));
        return storedFavorites ? JSON.parse(storedFavorites) : []
    });

    const [favoritesDevelopers, setFavoritesDevelopers] = useState(() => {
        const storedFavoritesDevelopers = localStorage.getItem(("userFavorites"));
        return storedFavoritesDevelopers ? JSON.parse(storedFavoritesDevelopers) : []
    });


    //login/out         
    const handleLogin = async (email, password) => {
        const user = ({ emial: email, username: "username" })
        setUser(user)
        localStorage.setItem("userData", JSON.stringify(user));
        // await new Promise(() => setTimeout(() => { }, 3000));
        return true;
    }

    const handleLogout = () => {
        setUser(undefined);
        localStorage.removeItem("userData");
    }

    //games favorites
    const favoriteExists = (id) => {
        return favorites.some(f => f.id === id);
    }

    const handleAddFavorites = (id, name) => {
        const storedFavorites = localStorage.getItem("userFavorites");
        let tempFavortiesArray = storedFavorites ? JSON.parse(storedFavorites) : undefined;
        if (!tempFavortiesArray) {
            tempFavortiesArray = [];
        }


        if (favoriteExists(id)) {
            const modifiedFavoritesArray = favorites.filter(f => f.id !== id);
            setFavorites(modifiedFavoritesArray);
            localStorage.setItem("userFavorites", JSON.stringify(modifiedFavoritesArray));

        }
        else {
            const newFavorite = { id: id, name: name };
            setFavorites(prevState => ([...prevState, newFavorite]));
            tempFavortiesArray.push(newFavorite);
            localStorage.setItem("userFavorites", JSON.stringify(tempFavortiesArray));
        }
    }

    //developers favorites
    const developerFavoriteExists = (id) => {
        return favoritesDevelopers.some(fd => fd.id === id);
    }

    const handleAddFavoritesDevelopers = (id, name) => {
        const storedFavoritesDevelopers = localStorage.getItem("userFavoritesDeveloper");
        let deveFavortiesArray = storedFavoritesDevelopers ? JSON.parse(storedFavoritesDevelopers) : undefined;
        if (!deveFavortiesArray) {
            deveFavortiesArray = [];
        }


        if (developerFavoriteExists(id)) {
            const modifiedDeveFavoritesArray = favoritesDevelopers.filter(fd => fd.id !== id);
            setFavoritesDevelopers(modifiedDeveFavoritesArray);
            localStorage.setItem("userFavoritesDeveloper", JSON.stringify(modifiedDeveFavoritesArray));
        }
        else {
            const newDeveloperFavorite = { id: id, name: name };
            setFavoritesDevelopers(prevState => ([...prevState, newDeveloperFavorite]));
            deveFavortiesArray.push(newDeveloperFavorite);
            localStorage.setItem("userFavoritesDeveloper", JSON.stringify(deveFavortiesArray));

        }
    }

    return (
        <UserContext.Provider value={{ user, favorites, handleLogin, handleLogout, handleAddFavorites, favoriteExists, developerFavoriteExists, handleAddFavoritesDevelopers, setFavoritesDevelopers, favoritesDevelopers }}>
            {children}
        </UserContext.Provider>
    )
}
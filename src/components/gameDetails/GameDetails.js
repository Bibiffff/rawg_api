import { useParams } from "react-router-dom";
import { useGamesContext } from "../../providers/GamesProvider";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUserContext } from "../../providers/UserProvider";

const GameDetails = () => {
    const { gameId } = useParams();
    const { findById, findAchievementsById } = useGamesContext();
    const { favoriteExists, handleAddFavorites } = useUserContext();
    const [game, setGame] = useState();
    const [achievements, setAchievements] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setGame(await findById(gameId));
            setAchievements(await findAchievementsById(gameId))
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="row mt-4">

                <div className="col-md-6">
                    <img src={game?.background_image} alt="Product Image" className="img-fluid" />
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong> Released: </strong>  <span className="text-info">{game?.released}</span></li>
                        <li className="list-group-item"><strong>Genres: </strong> {game?.genres.map(genre => (<span className="text-info"> {genre.name} </span>))} </li>
                        <li className="list-group-item"><strong> Rating: </strong> <span className="text-info"> {game?.rating}</span></li>
                        <li className="list-group-item"><strong>Tags: </strong> {game?.tags.map(tag => (<li className="text-info" style={{ listStyle: "none" }}> {tag.name} </li>))} </li>
                    </ul>
                </div>
                {/* icons halløj */}
                <div className="col-md-6">
                    <h1>{game?.name}</h1>
                    <div className="d-flex justify-content-between">
                        <div className="fs-3" style={{ cursor: "pointer" }} onClick={() => handleAddFavorites(game?.id, game?.name)}>
                            {favoriteExists(game?.id) ? <AiFillHeart /> : <AiOutlineHeart />}

                        </div>
                    </div>
                    <p>Metacritic Score: <span className="text-info">{game?.metacritic}</span></p>
                    <div dangerouslySetInnerHTML={{ __html: `<strong>Description:</strong> ${game?.description}` }}></div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <h3 className="text-center" style={{ textDecoration: "underline" }} >Achievements</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Percent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    achievements?.results.map(ach => (
                                        <tr>
                                            <td>{ach.name}</td>
                                            <td>{ach.description}</td>
                                            <td><img src={ach.image} className="img-fluid" /></td>
                                            <td>{ach.percent}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameDetails;
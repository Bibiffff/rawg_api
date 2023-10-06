import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUserContext } from "../../providers/UserProvider";
import { useDevelopersContext } from "../../providers/DevelopersProvider";

const DeveloperDetails = () => {
    const { developerId } = useParams();
    const { idByFind } = useDevelopersContext();
    const { developerFavoriteExists, handleAddFavoritesDevelopers } = useUserContext();
    const [deve, setDevelopers] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setDevelopers(await idByFind(developerId));
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="row mt-4">

                <div className="col-md-6">
                    <img src={deve?.image_background} alt="Product Image" className="img-fluid" />
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong> Games: </strong>  <span className="text-info">{deve?.games_count}</span></li>
                        <li className="list-group-item"><strong> slug: </strong> <span className="text-info"> {deve?.slug}</span></li>
                    </ul>
                </div>
                <div>
                    <h1>{deve?.name}</h1>
                    <div className="d-flex justify-content-between">
                        <div className="fs-3" style={{ cursor: "pointer" }} onClick={() => handleAddFavoritesDevelopers(deve?.id, deve?.name)}>
                            {developerFavoriteExists(deve?.id) ? <AiFillHeart /> : <AiOutlineHeart />}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeveloperDetails;
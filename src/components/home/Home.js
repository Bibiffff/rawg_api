import { Link } from "react-router-dom";
import { useGamesContext } from "../../providers/GamesProvider";

const Home = () => {
    const { games } = useGamesContext();

    return (
        <section className="row g-2">
            {
                games?.results.map(game => (
                    <article key={game.id} className="col-md-3">
                        <div className="card w-100">
                            <img src={game.background_image} className="card-img-top" style={{ height: 200, width: "100%", objectFit: "cover" }} alt={game.slug} />
                            <div className="p-2">
                                <h6 className="card-title" >{game.name}</h6>
                                <p className="card-text">Rating: <span className="text-info">{`${game.rating}`}</span></p>
                                <Link to={`/games/details/${game.id}`} className="btn btn-outline-info" >Read More</Link>
                            </div>
                        </div>
                    </article>
                ))
            }
        </section>
    );
};

export default Home;
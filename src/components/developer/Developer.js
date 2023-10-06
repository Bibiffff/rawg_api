import { Link } from "react-router-dom";
import { useDevelopersContext } from "../../providers/DevelopersProvider";

const Developer = () => {
    const { deve } = useDevelopersContext();

    return (
        <section className="row g-2">
            {
                deve?.results.map(developer => (
                    <article key={developer.id} className="col-md-3">
                        <div className="card w-100">
                            <img src={developer.image_background} className="card-img-top" style={{ height: 200, width: "100%", objectFit: "cover" }} alt={developer.slug} />
                            <div className="p-2">
                                <h6 className="card-title" >{developer.name}</h6>
                                <Link to={`/developers/details/${developer.id}`} className="btn btn-outline-info" >Read More</Link>
                            </div>
                        </div>
                    </article>
                ))
            }
        </section>
    );
};

export default Developer;
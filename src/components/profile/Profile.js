import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider";

import ".//profile.scss";

const Profile = () => {
    const { user, favorites, handleLogout, favoritesDevelopers } = useUserContext();

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <section className="row mt-3">
            <div className="col-md-4">
                <img src="https://picsum.photos/300/300" alt="User Profile Picture" className="img-fluid rounded-circle" />
            </div>
            <div className="col-md-8">
                <h1>USERNAME</h1>
                <hr />
                <p><strong>Email: </strong><span className="text-info">User@email.com</span></p>
                <p><strong>Location: </strong><span className="text-info">Some-Place</span></p>
                <p><strong>About: </strong><span className="text-info">About-Me</span></p>
                <p><strong>More: </strong><span className="text-info">Something</span></p>
            </div>
            <div className="col-md-6">
                <h2>Favorite Games</h2>
                <hr />
                <ul className="profile-farvorite-list">
                    {
                        favorites.map(f => (
                            <li key={f.id}>
                                <Link to={`/games/details/${f.id}`}>
                                    <strong><span className="info-text">{f.name}</span></strong></Link>
                                <button className="ms-3 btn btn-outline-danger btn-sm">Remove</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md-6">
                <h2>Favorite Developers</h2>
                <hr />
                <ul className="profile-farvorite-list">
                    {
                        favoritesDevelopers.map(fd => (
                            <li key={fd.id}>
                                <Link to={`/developers/details/${fd.id}`}>
                                    <strong><span className="info-text">{fd.name}</span></strong></Link>
                                <button className="ms-3 btn btn-outline-danger btn-sm">Remove</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md-6">

            </div>
            <div className="col-12">
                <div className="d-flex justify-content-end ">
                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </section>
    );
};

export default Profile;
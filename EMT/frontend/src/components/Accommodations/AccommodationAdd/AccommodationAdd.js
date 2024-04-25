import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccommodationAdd = (props) => {

    // const history = useHistory();
    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        category : 1,
        host: 1,
        numRooms: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const host = formData.host;
        const numRooms = formData.numRooms;

        props.onAddAccommodations(name, category, host, numRooms);
        navigate("/accommodations");

    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Accommodation name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter accommodation name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories && props.categories.map((term) =>
                                <option value={term}>{term}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Host</label>
                        <select name="host" className="form-control" onChange={handleChange}>
                            {props.hosts.map((term) =>
                                <option value={term.id}>{term.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numRooms">Number of Rooms</label>
                        <input type="text"
                               className="form-control"
                               id="numRooms"
                               name="numRooms"
                               placeholder="Number of Rooms"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default AccommodationAdd;
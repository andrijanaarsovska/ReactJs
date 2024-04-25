import React from "react";
import {useNavigate} from 'react-router-dom';

const AccommodationEdit = (props) => {

    const navigate = useNavigate();

    const [formData, updateFormData] = React.useState({
        name: props.accommodation.name || "",
        category: props.accommodation.category || 1,
        host: props.accommodation.host ? props.accommodation.host.id : 1,
        numRooms: props.accommodation.numRooms || 0

    })
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const id = props.accommodation.id;
        console.log('Accomodation ID:', id);
        const name = formData.name !== "" ? formData.name : props.accommodation.name;
        const category = formData.category !== "" ? formData.category : props.accommodation.category;
        const host = formData.host !== "" ? formData.host : props.accommodation.host.id;
        const numRooms = formData.numRooms !== "" ? formData.numRooms : props.accommodation.numRooms;

        props.onEditAccommodations(props.accommodation.id, name, category, host, numRooms);
        navigate('/accommodations');

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
                               placeholder={props.accommodation.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" value={formData.category}
                                onChange={handleChange}>
                            {props.categories && props.categories.map((term) => {
                                    if (props.accommodation.category !== undefined)
                                        return <option selected={props.accommodation.category} value={term}>{term}</option>
                                    else return <option value={term}>{term}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Host</label>
                        <select name="host" className="form-control" value={formData.host} onChange={handleChange}>
                            {props.hosts.map((term) => {
                                    if (props.accommodation.host !== undefined &&
                                        props.accommodation.host.id === term.id)
                                        return <option selected={props.accommodation.host.id}
                                                       value={term.id}>{term.name}</option>
                                    else return <option value={term.id}>{term.name}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numRooms">Number of Rooms</label>
                        <input type="text"
                               className="form-control"
                               id="numRooms"
                               name="numRooms"
                               placeholder={props.accommodation.numRooms}
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

export default AccommodationEdit;

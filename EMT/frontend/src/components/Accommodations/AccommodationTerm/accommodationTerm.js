import React from "react";
import {Link} from "react-router-dom";

const accommodationTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.category}</td>
            <td>{props.term.host.name}</td>
            <td>{props.term.numRooms}</td>
            <td className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
                <button title={"Rent"} className={"btn btn-success"}
                        onClick={() => props.onRent(props.term.id)}>
                    Rent
                </button>
                <Link className="btn btn-info ml-2"
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/accommodations/edit/${props.term.id}`}>
                    Edit
                </Link>
            </td>
        </tr>
    );
}

export default accommodationTerm;

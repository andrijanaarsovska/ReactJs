import React, {Component} from "react";
import {Link} from 'react-router-dom';
import ReactPaginate from "react-paginate";
import AccommodationTerm from "../AccommodationTerm/accommodationTerm";


class Accommodations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5,
        }
    }

    render() {

        const pageCount = Math.ceil(this.props.accommodations.length / this.state.size);

        const accommodations = this.getAccommodationsPage();
        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Host</th>
                                <th scope={"col"}>NumRooms</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accommodations}
                            </tbody>
                        </table>
                        <div className="col mb-3">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <Link className={"btn btn-block btn-dark"} to={"/accommodations/add"}>
                                        Add new accommodation
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactPaginate previousLabel={"back"}
                               nextLabel={"next"}
                               breakLabel={<a href="/#">...</a>}
                               breakClassName={"break-me"}
                               pageClassName={"ml-1"}
                               pageCount={pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination m-4 justify-content-center"}
                               activeClassName={"active"}
                />
            </div>
        );
    }

    handlePageClick = (data) => {
        this.setState({
            page: data.selected
        })
    }

    getAccommodationsPage = () => {
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        return this.props.accommodations.slice(offset, nextPageOffset).map((term) => {
            if (term.numRooms > 0) {
                return (
                    <AccommodationTerm key={term.id} term={term} onDelete={this.props.onDelete}
                                      onEdit={this.props.onEdit} onRent={this.props.onRent}/>
                );
            }
        });
    }
}

export default Accommodations;

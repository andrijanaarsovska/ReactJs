import React from 'react';
import ReactPaginate from 'react-paginate';

const Hosts = (props) => {
    const [page, setPage] = React.useState(0);
    const size = 5; // Number of items per page

    const offset = size * page;
    const nextPageOffset = offset + size;
    const pageCount = Math.ceil(props.hosts.length / size);
    const hosts = props.hosts.slice(offset, nextPageOffset);

    const handlePageClick = (data) => {
        setPage(data.selected);
    };

    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"table-responsive"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Surname</th>
                            <th scope={"col"}>Country</th>
                        </tr>
                        </thead>
                        <tbody>
                        {hosts.map((term) => (
                            <tr key={term.id}>
                                <td>{term.name}</td>
                                <td>{term.surname}</td>
                                <td>{term.country.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={<a href="/#">...</a>}
                breakClassName={"break-me"}
                pageClassName={"ml-1"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination m-4 justify-content-center"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default Hosts;

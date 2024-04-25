import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Hosts from "../Hosts/HostList/hosts";
import AirbnbService from "../../repository/airbnbRepository";
import Accommodations from "../Accommodations/AccommodationList/accommodations";
import Countries from "../Countries/countries";
import Header from "../Header/header";
import AccommodationAdd from "../Accommodations/AccommodationAdd/AccommodationAdd";
import AccommodationEdit from "../Accommodations/AccommodationEdit/AccommodationEdit";
import Categories from "../Categories/categories";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hosts: [],
            countries: [],
            accommodations: [],
            categories: [],
            selectedAccommodation: []
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/categories"} element={<Categories categories={this.state.categories}/>}/>

                            <Route path={"/countries"} element={<Countries countries={this.state.countries}/>}/>
                            <Route path={"/hosts"} element={<Hosts hosts={this.state.hosts}/>}/>

                            <Route path={"/accommodations/edit/:id"} element={
                                <AccommodationEdit
                                    accommodations={this.state.accommodations}
                                    hosts={this.state.hosts}
                                    categories={this.state.categories}
                                    onEditAccommodations={this.editAccommodation}
                                    accommodation={this.state.selectedAccommodation}
                                />
                            }/>
                            <Route path={"/accommodations/add"} element={
                                <AccommodationAdd accommodations={this.state.accommodations}
                                                  hosts={this.state.hosts}
                                                  categories={this.state.categories}
                                                  onAddAccommodations={this.addAccommodation}/>}/>

                            <Route path={"/accommodations"} element={
                                <Accommodations accommodations={this.state.accommodations}
                                                onRent={this.bookAccommodation}
                                                onDelete={this.deleteAccommodation}
                                                onEdit={this.getAccommodation}/>}/>
                            <Route path={"/"} element={
                                <Accommodations accommodations={this.state.accommodations}
                                                onRent={this.bookAccommodation}
                                                onDelete={this.deleteAccommodation}
                                                onEdit={this.getAccommodation}/>}/>

                        </Routes>
                    </div>
                </main>
            </Router>

        );
    }

    loadHosts = () => {
        AirbnbService.fetchHosts()
            .then((data) => {
                this.setState({
                    hosts: data.data
                })
            });
    }

    loadCountries = () => {
        AirbnbService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            });
    }
    loadCategories = () => {
        AirbnbService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadAccommodations = () => {
        AirbnbService.fetchAccommodations()
            .then((data) => {
                this.setState({
                    accommodations: data.data
                })
            });
    }

    deleteAccommodation = (id) => {
        AirbnbService.deleteAccommodation(id)
            .then(() => {
                this.loadAccommodations();
            })
    }
    addAccommodation = (name, category, host, numRooms) => {
        AirbnbService.addAccommodation(name, category, host, numRooms)
            .then(() => {
                this.loadAccommodations();
            })
    }

    getAccommodation = (id) => {
        AirbnbService.getAccommodation(id)
            .then((data) => {
                this.setState({
                    selectedAccommodation: data.data
                })
            })
    }

    editAccommodation = (id, name, category, host, numRooms) => {
        AirbnbService.editAccommodation(id, name, category, host, numRooms)
            .then(() => {
                this.loadAccommodations()
            });
    }

    bookAccommodation = (id, numRooms) => {
        AirbnbService.bookAccommodation(id, numRooms)
            .then(() => {
                this.loadAccommodations();
            })
    }

    componentDidMount() {
        this.loadHosts();
        this.loadAccommodations();
        this.loadCountries();
        this.loadCategories();
    }
}

export default App;

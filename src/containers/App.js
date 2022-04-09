import React, { useEffect } from "react";
import { connect } from 'react-redux';
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';
import { setSearchField, requestRobots } from '../actions';


const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        isPending: state.requestRobots.isPending,
        robots: state.requestRobots.robots,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

function App({ onSearchChange, searchField, robots, onRequestRobots, isPending }) {
    //setting App state
    //const [robots, setRobots] = useState([]);
    //const [searchfield, setSearchfield] = useState('');
    
    //fetching the robots from  API
    useEffect(() => {
        onRequestRobots()
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => response.json())
        //     .then((users) => setRobots(users));
        }, [onRequestRobots])
    //Setting searchfield state value
    // const onSearchChange = (event) => {
    //     setSearchfield(event.target.value)
    // }

    //filtering the robots from input
    const filteredRobots = robots.filter( robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })

    return !robots.length ?
    <h1>Loading...</h1> :
    (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
                
            </Scroll>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
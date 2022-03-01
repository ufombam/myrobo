import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';



function App() {
    //setting App state
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    
    //fetching the robots from  API
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((users) => setRobots(users));
        }, [])
    //Setting searchfield state value
    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    //filtering the robots from input
    const filteredRobots = robots.filter( robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
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
export default App;
        
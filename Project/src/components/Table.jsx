import React, { useState, useEffect } from "react";
import axios from "axios";
import './TableStyles.css'

function Table() {

    //Variables
    const [filmData, setFilmData] = useState([]);
    const [cleanedFilmData, setCleanedFilmData] = useState([]);
    const [charactersData, setCharactersData] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);

    //Functions
    useEffect(() => {
        updateFilmCharacters();
    }, [charactersData]);

    useEffect(() => {
        getFilmCharacters();
    }, [filmData]);

    const getFilmData = async () => {
        setButtonClicked(true);
        try {
            const response = await axios.get("https://swapi.py4e.com/api/films/");
            if (response.status === 200) {
                setFilmData(response.data.results);
            }
        } catch (error) {
            console.log("Error getting films data: ", error);
        }
    };

    const getFilmCharacters = async () => {
        let allCharacters = [];
        let nextPage = 'https://swapi.py4e.com/api/people/';

        while(nextPage) {
            try {
                const response = await axios.get(nextPage);
                if (response.status === 200) {
                    allCharacters = [...allCharacters, ...response.data.results];
                    nextPage = response.data.next;
                }
            } catch (error) {
                console.log("Error getting film characters: ", error);
            }
        }
        setCharactersData(allCharacters);
    };

    const updateFilmCharacters = async () => {
        let updatedFilmData = [];
        filmData.forEach((film) => {
            let updatedFilm =  {...film} ;
            updatedFilm.characters = film.characters.map((character) => {
                var foundCharacter = charactersData.find((char) => char.url === character);
                return foundCharacter ? foundCharacter.name : character;
            })
            updatedFilmData.push(updatedFilm);
        })
        setCleanedFilmData(updatedFilmData);
        console.log(cleanedFilmData);
    };

    return (
        <div className = "principalContainer">
            {buttonClicked ? (
                <div className = "tableContainer">
                <table className = "table">
                    <thead>
                        <tr className = "elementTitles">
                            <th className = "elementTitle">Title</th>
                            <th className = "elementTitle">opening Crawl</th>
                            <th className = "elementTitle">Director</th>
                            <th className = "elementTitle">Producer</th>
                            <th className = "elementTitle">Release Date</th>
                            <th className = "elementTitle">Characters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cleanedFilmData.map((film, index) => {
                            return (
                                <tr key={index} className = "elements">
                                    <td className = "element">{film.title}</td>
                                    <td className = "element">{film.opening_crawl}</td>
                                    <td className = "element">{film.director}</td>
                                    <td className = "element">{film.producer}</td>
                                    <td className = "element">{film.release_date}</td>
                                    <td className = "element">{film.characters.join(', ')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            ) :(
                <div></div>
            )} 
            <div className  = "buttonContainer">
                <button onClick={() => getFilmData()}
                    className  = "button">Print Films</button>
            </div>
        </div>
    )
}

export default Table;
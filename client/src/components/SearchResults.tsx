import React, {Component} from 'react';
import axios from 'axios';

class SearchResults extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props)

        this.state = {
            results: []
        }
    }

    componentDidMount(){
        //Test API get
        //How do we pass the string from the search bar to here?
        //Ideally it would be axios.get('https://api.deezer.com/search?q={search_bar_input}')
        //`{musicAppState.searchInputState.replace(" ", "%20")}` perhaps?
        axios.get('https://api.deezer.com/search?q=I%20Just%20Wanna%20Shine')
            .then(response => {
                    console.log(response.data[0].title)
                    this.setState({results: response.data})
                })
            .catch(error => {console.log(error)})
    }

    render(){
        return(
            <div>
                Search Results:
            </div>
        )
    }
}

export default SearchResults;
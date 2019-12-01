import React from 'react';
import './App.css';
import cities from './cities-of-china.json';



class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      citiesList: cities.cities,
      filterCity: ''
    }
  }
  render () {
    const { citiesList } = this.state;
    return (
      <div className="App">
        <header className="china__header">
          <h1 className="china__title">Cities of China</h1>
        </header>
        <main className="main-content">
          <div className="column-1">
            <div className="search">
              <label htmlFor="cities" className="search__label"></label>
              <input type="text" name="cities" className="search__input" placeholder="Search by name"/>
            </div>
            <input type="checkbox" className="column-1__counter"/>{citiesList.length} items
            <div className="cities">
              <ul className="cities__list">
                {citiesList.map(item => 
                  <li className="cities__list--item" key={item.id}>
                    <input type="checkbox" className="item__checkbox"/>
                    <div className="item__name">{item.name}</div>
                    <div className="item__chinese-name">{item.chineseName}</div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="column-2">
            <div className="top-content">
              <div className="column-2__counter"> items</div>
              <div className="column-2__clear">CLEAR</div>
            </div>
          </div>
        </main>
        {/* <footer></footer> */}
      </div>
    );
  }
}

export default App;

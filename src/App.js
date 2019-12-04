import React from 'react';
import './App.scss';
import cities from './cities-of-china.json';



class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      citiesList: cities.cities,
      filterCity: '',
      selectedCities: []
    }
    this.searchCity = this.searchCity.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.selectCities = this.selectCities.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
  }

  searchCity(event) {
    const inputCity = event.currentTarget.value;
    this.setState({filterCity : inputCity});
  }

  resetFilter() {
    this.setState({filterCity : ''})
  }

  selectCities (event) {
    const selectedId = event.currentTarget.id;
    const selectedCity = this.state.citiesList.filter(item => item.id === selectedId)[0];

    const repeatedItems = this.state.selectedCities.filter(item => item.id === selectedCity.id);
    if( repeatedItems.length === 0) {
      this.setState(prevState => ({
        selectedCities: [...prevState.selectedCities, selectedCity]
      }),);
    } else {
      const filteredSelected = this.state.selectedCities.filter(item => item.id !== selectedCity.id);
      this.setState({selectedCities : filteredSelected});
    }
  }

  deleteSelected(event) {
    const selectedId = event.currentTarget.id;
    const selectedCity = this.state.selectedCities.findIndex(item => item.id === selectedId);
    const newSelectedArray = this.state.selectedCities.splice(selectedCity, 1);
    this.setState({selectedCities: newSelectedArray});
  }

  clearSelected() {
    this.setState({selectedCities: []});
  }

  render () {
    const { citiesList, filterCity, selectedCities } = this.state;
    return (
      <div className="App">
        <header className="china__header">
          <h1 className="china__title">Cities of China</h1>
        </header>
        <main className="main-content">
          <div className="column-1">
            <div className="search">
              <label htmlFor="cities" className="search__label"></label>
              <input type="text" name="cities" className="search__input" placeholder="Search by name" value={filterCity} onChange={this.searchCity} onFocus={this.resetFilter} />
            </div>
            <input type="checkbox" className="column-1__counter"/>{citiesList.length} items
            <div className="cities">
              <ul className="cities__list">
                {citiesList
                  .filter(item => item.id.includes(filterCity.toLowerCase()))
                  .map(item => 
                    <li className="cities__list--item" key={item.id} id={item.id} onClick={this.selectCities}>
                      <input type="checkbox" className="item__checkbox"/>
                      <img className="item__image" alt="city"/>
                      <div className="item__info">
                        <div className="item__name">{item.name}</div>
                        <div className="item__chinese-name">{item.chineseName}</div>
                      </div>
                    </li>
                )}
              </ul>
            </div>
          </div>
          <div className="column-2">
            <div className="top-content">
              <div className="column-2__counter">{selectedCities.length} items</div>
              <div className="column-2__clear" onClick={this.clearSelected}>CLEAR</div>
            </div>
            <div className="selected-cities">
              <ul className="selected-cities__list">
                {selectedCities.length !== 0 ? 
                  selectedCities.map(item =>
                    <li className="cities__list--item" key={item.id} id={item.id} onClick={this.selectCities}>
                      <img className="item__image" alt="city"/>
                      <div className="item__info">
                        <div className="item__name">{item.name}</div>
                        <div className="item__chinese-name">{item.chineseName}</div>
                      </div>
                      <div className="item__close"><i className="fas fa-times"></i></div>
                    </li>
                  )
                  : null
                }
              </ul>
            </div>
          </div>
        </main>
        {/* <footer></footer> */}
      </div>
    );
  }
}

export default App;

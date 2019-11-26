import React from 'react';
import AutoCompleteResults from './components/AutoCompleteInputResult/index';
import MapboxClient from 'mapbox';
import $ from 'jquery';
import { debounce } from 'throttle-debounce';
import _ from 'underscore';

class AutoCompleteInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            matchedItems: [],
            activeItem: null,
            selectedItem: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.client = new MapboxClient('your-api-key');
        this.fetchPlaces = debounce(200, this.fetchPlaces);
    }

    handleChange(event) {
        this.fetchPlaces(event.target.value);
    }

    fetchPlaces(value) {
        const searchText = value.toLowerCase();
        this.client.geocodeForward(searchText, function (err, res) {
            this.setState({ searchText: searchText, matchedItems: res.features, activeItem: null, selectedItem: null });
        }.bind(this));
    }

    handleKeyDown(e) {
        const activeItem = this.state.activeItem ? this.state.activeItem : null;
        switch (e.which) {
            case 40:
                e.preventDefault();
                if (activeItem && activeItem.length > 0) {
                    if ($(activeItem).next().length == 0) return;
                    $(activeItem).removeClass('selected');

                    this.setState({ activeItem: $(activeItem).next() }, function () {
                        this.state.activeItem.addClass('selected');
                    });

                } else {
                    const firstItem = $('.places-litm-el li:nth-child(1)');
                    this.setState({ activeItem: firstItem }, function () {
                        this.state.activeItem.addClass('selected');
                    });
                }

                break;
            case 38:
                e.preventDefault();
                if (activeItem && activeItem.length > 0) {
                    if ($(activeItem).prev().length == 0) return;
                    $(activeItem).removeClass('selected');

                    this.setState({ activeItem: $(activeItem).prev() }, function () {
                        this.state.activeItem.addClass('selected')
                    });
                } else {
                    this.setState({ activeItem: $('.places-litm-el li:nth-child(1)') }, function () {
                        this.state.activeItem.addClass('selected')
                    });
                }

                break;
            case 13:
                e.preventDefault();
                if (!activeItem) break;
                const selectedItem = _.findWhere(this.state.matchedItems, { id: activeItem.attr('id') });
                this.setState({
                    matchedItems: [],
                    selectedItem: selectedItem
                });
                break;
            case 27:
                e.preventDefault();
                this.setState({
                    matchedItems: [],
                    selectedItem: null,
                    activeItem: null
                });
                break;
        }

    }

    handleItemClick(item) {
        console.log("clicked item  ", item);
        this.setState({
            matchedItems: [],
            selectedItem: item
        });
    }

    render() {
        let results;
        if (!this.state.selectedItem) {
            results =
                <AutoCompleteResults
                    searchText={this.state.searchText}
                    items={this.state.matchedItems}
                    handleClick={this.handleItemClick}
                />
        }

        let selectedPlace;
        if (this.state.selectedItem) {
            selectedPlace = <code>{this.state.selectedItem.place_name}</code>;
        }

        return (
            <div className="row">
                <div style={{ marginLeft: '5px', fontSize: '12px' }}>
                    <p>Selected Item {selectedPlace}</p>
                </div>
                <input
                    onKeyDown={this.handleKeyDown}
                    type="text"
                    className="input-lg auto-complte-search-input form-control"
                    placeholder="Search"
                    onChange={this.handleChange}
                />
                {results}
            </div>
        );
    }
}

export default AutoCompleteInput;

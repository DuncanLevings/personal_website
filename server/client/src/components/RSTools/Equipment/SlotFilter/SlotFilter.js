/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { EQUIPMENT_CONSTS } from 'consts/RSTools_Consts';
import PropTypes from 'prop-types';
import './SlotFilter.scss';

class SlotFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slots: EQUIPMENT_CONSTS.slotPositions,
            filter: []
        }
    }

    componentDidMount() {
    }

    filterSlot = (i) => {
        // remove if already selected
        if (this.state.filter.includes(i)) {
            this.setState({
                filter: this.state.filter.filter((slot) => {
                    return slot !== i
                })
            },
                () => {
                    this.props.filterSelected(this.state.filter);
                });
        } else {
            this.setState(prevState => ({
                filter: [...prevState.filter, i]
            }),
                () => {
                    this.props.filterSelected(this.state.filter);
                });
        }
    }

    clearFilter = () => {
        this.setState({
            filter: []
        }, () => {
            this.props.filterSelected(this.state.filter);
        });
    };

    render() {
        const { slots, filter } = this.state;

        const slotList = slots.map((slot, i) => {
            let selected = false;
            if (filter.includes(i)) {
                selected = true;
            }

            return (
                <div key={i} className={`slot left-${slot.left} top-${slot.top} ${selected ? 'selected' : ''}`} onClick={() => this.filterSlot(i)}></div>
            )
        });

        let inventorySelected = false;
        if (filter.includes(13)) inventorySelected = true;

        let summonSelected = false;
        if (filter.includes(14)) summonSelected = true;

        return (
            <div className="SlotFilter">
                <h4>Select slot(s) to filter</h4>
                <div className="slotContainer">
                    <div className="slots">
                        {slotList}
                    </div>
                </div>
                <div className="inventoryContainer">
                    <div className="inventory">
                        <div className={`clickableArea ${inventorySelected ? 'selected' : ''}`} onClick={() => this.filterSlot(13)} />
                    </div>
                </div>
                <div className="summonContainer">
                    <div className="summonSlot">
                        <div className={`clickableArea ${summonSelected ? 'selected' : ''}`} onClick={() => this.filterSlot(14)} />
                    </div>
                </div>
                <div className="clear-filter">
                    <Button variant="button-secondary" onClick={() => this.clearFilter()}><FaTimes /> Clear</Button>
                </div>
            </div>
        );
    }
}

SlotFilter.propTypes = {
    filterSelected: PropTypes.func.isRequired
};

export default SlotFilter;

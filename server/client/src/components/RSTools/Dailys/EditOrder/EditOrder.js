/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Container, Spinner } from 'react-bootstrap';
import { getDaily, setDailyType, reorderDaily } from 'store/actions/dailyActions';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from 'prop-types';
import './EditOrder.scss';
import { FaSave } from 'react-icons/fa';

// reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#31c560" : "rgb(65, 74, 97)",

    ...draggableStyle
});

class EditOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        if (this.props.dailyReducer.dailys.length === 0) {
            const type = parseInt(localStorage.getItem("type"));

            this.props.setDailyType(type);
            this.props.getDaily(type);
        } else {
            this.setList(this.props.dailyReducer.dailyType);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.dailyReducer.dailys !== prevProps.dailyReducer.dailys) {
            this.setList(this.props.dailyReducer.dailyType);
        }
    }

    setList = (type) => {
        switch (type) {
            case 0:
                this.setState({ items: this.props.dailyReducer.dailys });
                break;
            case 1:
                this.setState({ items: this.props.dailyReducer.weeklys });
                break;
            case 2:
                this.setState({ items: this.props.dailyReducer.monthlys });
                break;
            default:
                break;
        }
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items: items
        });
    }

    saveOrder = () => {
        const newOrder = [];
        this.state.items.forEach((item, i) => {
            newOrder.push({ id: item._id, position: i + 1 });
        });

        this.props.reorderDaily(newOrder, this.props.dailyReducer.dailyType);
    }

    render() {
        const { isSaving } = this.props.dailyReducer;
        const { items } = this.state;

        return (
            <Container>
                <div className="EditOrder">
                    <h1>Drag to Re-Order</h1>
                    <div className="spacer-h-3" />
                    {items.length > 0 ?
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="drag-list"
                                    >
                                        {items.map((item, index) => (
                                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                        className="drag-item"
                                                    >
                                                        {item.dailyId.title}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        : <Spinner animation="border" variant="light" />}
                    <div className="spacer-h-3" />
                    <div className="save-order-button">
                        <Button variant="button-primary" onClick={() => this.saveOrder()}>
                            <FaSave /> Save Order  {isSaving ? <Spinner animation="border" variant="light" size="sm" /> : null}
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}

EditOrder.propTypes = {
    setDailyType: PropTypes.func,
    getDaily: PropTypes.func,
    reorderDaily: PropTypes.func,
    dailyReducer: PropTypes.object
};

const mapStateToProps = state => {
    return {
        dailyReducer: state.dailyReducer,
        userReducer: state.userReducer
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ setDailyType, getDaily, reorderDaily }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);

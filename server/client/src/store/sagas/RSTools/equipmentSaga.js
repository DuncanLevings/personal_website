/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import { call, takeLatest, put } from 'redux-saga/effects';
import {
    createItemAPI,
    createAbilityBarAPI,
    deleteItemAPI,
    editItemAPI,
    getItemsAPI,
    getItemSingleAPI,
    getAbilityBarSingleAPI,
    searchItemsAPI,
    searchAbilityBarsAPI,
    deleteAbilityBarAPI,
    editAbilityBarAPI,
    checkItemNameAPI
} from '../../api/RSTools/equipmentAPI';
import * as actionTypes from '../../actionTypes/RSTools/equipmentActionTypes'
import * as actionCreators from '../../actions/RSTools/equipmentActions';

// ITEMS

function* getItems(equipmentAction) {
    try {
        const items = yield call(getItemsAPI, equipmentAction.payload);
        yield put(actionCreators.getItemsSuccess(items));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* getItemSingle(equipmentAction) {
    try {
        const item = yield call(getItemSingleAPI, equipmentAction.payload);
        yield put(actionCreators.getItemSingleSuccess(item));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* searchItems(equipmentAction) {
    try {
        const items = yield call(searchItemsAPI, equipmentAction.payload);
        yield put(actionCreators.searchItemsSuccess(items));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* createItem(equipmentAction) {
    try {
        yield call(checkItemNameAPI, equipmentAction.payload.formData);
        const items = yield call(createItemAPI, equipmentAction.payload.formData, equipmentAction.payload.slots);
        yield put(actionCreators.createItemSuccess(items));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.equipmentError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.equipmentError(error.response.data));
        }
    }
}

function* editItem(equipmentAction) {
    try {
        yield call(checkItemNameAPI, equipmentAction.payload.formData);
        const items = yield call(editItemAPI, equipmentAction.payload.formData, equipmentAction.payload.slots);
        yield put(actionCreators.editItemSuccess(items));
    } catch (error) {
        if (error.response.status === 500) {
            yield put(actionCreators.equipmentError("Image upload failed!"));
        } else if (error.response.status !== 401) {
            yield put(actionCreators.equipmentError(error.response.data));
        }
    }
}

function* deleteItem(equipmentAction) {
    try {
        const items = yield call(deleteItemAPI, equipmentAction.payload.itemId, equipmentAction.payload.slots);
        yield put(actionCreators.deleteItemSuccess(items));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

// ABILTIYS

function* getAbilityBarSingle(equipmentAction) {
    try {
        const abilityBar = yield call(getAbilityBarSingleAPI, equipmentAction.payload);
        yield put(actionCreators.getAbilityBarSingleSuccess(abilityBar));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* searchAbilityBars(equipmentAction) {
    try {
        const abilityBars = yield call(searchAbilityBarsAPI, equipmentAction.payload);
        yield put(actionCreators.searchAbilityBarsSuccess(abilityBars));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* createAbilityBar(equipmentAction) {
    try {
        const abilityBars = yield call(createAbilityBarAPI, equipmentAction.payload.formData, equipmentAction.payload.style);
        yield put(actionCreators.createAbilityBarSuccess(abilityBars));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* editAbilityBar(equipmentAction) {
    try {
        const abilityBars = yield call(editAbilityBarAPI, equipmentAction.payload.formData, equipmentAction.payload.style);
        yield put(actionCreators.editAbilityBarSuccess(abilityBars));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

function* deleteAbilityBar(equipmentAction) {
    try {
        const abilityBars = yield call(deleteAbilityBarAPI, equipmentAction.payload.abilityBarId, equipmentAction.payload.style);
        yield put(actionCreators.deleteAbilityBarSuccess(abilityBars));
    } catch (error) {
        yield put(actionCreators.equipmentError(error.response.data));
    }
}

export const equipmentSagas = [
    takeLatest(actionTypes.GET_ITEMS, getItems),
    takeLatest(actionTypes.GET_ITEM_SINGLE, getItemSingle),
    takeLatest(actionTypes.SEARCH_ITEMS, searchItems),
    takeLatest(actionTypes.CREATE_ITEM, createItem),
    takeLatest(actionTypes.EDIT_ITEM, editItem),
    takeLatest(actionTypes.DELETE_ITEM, deleteItem),
    takeLatest(actionTypes.GET_ABILITY_BAR_SINGLE, getAbilityBarSingle),
    takeLatest(actionTypes.SEARCH_ABILITY_BARS, searchAbilityBars),
    takeLatest(actionTypes.CREATE_ABILITY_BAR, createAbilityBar),
    takeLatest(actionTypes.EDIT_ABILITY_BAR, editAbilityBar),
    takeLatest(actionTypes.DELETE_ABILITY_BAR, deleteAbilityBar),
];
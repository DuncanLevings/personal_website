/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import api from '../Instance';

export function searchPvmAPI(type, filter) {
    return api.request({
        method: 'get',
        url: `/api/pvm/search_pvm/${type}/${filter}`,
    }).then(res => res.data);
}

export function getPvmSingleAPI(pvmId) {
    return api.request({
        method: 'get',
        url: `/api/pvm/get_pvm/single/${pvmId}`,
    }).then(res => res.data);
}

export function getPvmTasksAPI(type) {
    return api.request({
        method: 'get',
        url: `/api/pvm/get_pvm_tasks/${type}`,
    }).then(res => res.data);
}

export function getPvmTaskSingleAPI(pvmTaskId) {
    return api.request({
        method: 'get',
        url: `/api/pvm/get_pvm_tasks/single/${pvmTaskId}`,
    }).then(res => res.data);
}

export function checkPvmNameAPI(formData) {
    return api.request({
        method: 'post',
        url: '/api/pvm/check_pvm_name',
        data: formData
    });
}

export function createPvmAPI(formData) {
    return api.request({
        method: 'post',
        url: '/api/pvm/create_pvm',
        data: formData
    });
}

export function createPvmTaskAPI(formData) {
    return api.request({
        method: 'post',
        url: '/api/pvm/create_pvm_task',
        data: formData
    });
}

export function editPvmAPI(formData) {
    return api.request({
        method: 'post',
        url: '/api/pvm/edit_pvm',
        data: formData
    });
}

export function editPvmTaskAPI(formData) {
    return api.request({
        method: 'post',
        url: '/api/pvm/edit_pvm_task',
        data: formData
    });
}

export function deletePvmAPI(pvmId, filter) {
    return api.request({
        method: 'delete',
        url: `/api/pvm/delete_pvm/${pvmId}/${filter}`
    }).then(res => res.data);
}

export function deletePvmTaskAPI(pvmTaskId) {
    return api.request({
        method: 'delete',
        url: `/api/pvm/delete_pvm_task/${pvmTaskId}`
    }).then(res => res.data);
}

import {deleteKanban, getKanbanData, getKanbanStatuses, storeNewKanban, updateKanbanData} from "@/request/api/kanban";

export default {
    namespaced: true,
    state: {
        kanbanStatuses: [],
        kanbanData: [],
    },
    getters: {
        kanban_statuses: state => state.kanbanStatuses,
        kanban_data: state  => state.kanbanData,
        allKanbanData: state => state.kanbanData,
    },
    mutations: {
        SET_KANBAN_STATUSES(state, payload) {
            state.kanbanStatuses = payload;
        },
        SET_KANBAN_DATA(state, payload) {
            var filteredDate = [];
            state.kanbanStatuses.forEach(item => {
                filteredDate[item.id] = payload.filter(val => val.status_id === item.id);
            })
            state.kanbanData = filteredDate;
        },
        UPDATE_KANBAN_STATUS(state, payload) {
            const index = state.kanbanData[payload.status_id].findIndex(item => item.id === payload.id);
            state.kanbanData[payload.status_id][index] = payload.data;
        },
        PUSH_NEW_KANBAN(state, payload) {
            state.kanbanData[payload.status_id].push(payload);
        },
        REMOVE_KANBAN(state, payload) {
            const index = state.kanbanData[payload.status_id].findIndex(item => item.id === payload.id);
            state.kanbanData[payload.status_id].splice(index, 1);
        }
    },
    actions: {
        fetchKanbanStatuses({commit}) {
            return new Promise((resolve, reject) => {
                getKanbanStatuses().then(res => {
                    commit('SET_KANBAN_STATUSES', res.data);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        fetchKanbanData({commit}) {
            return new Promise((resolve, reject) => {
                getKanbanData().then(res => {
                    commit('SET_KANBAN_DATA', res.data);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        updateKanbanData({commit}, data) {
            return new Promise((resolve, reject) => {
                updateKanbanData(data).then(res => {
                    commit('UPDATE_KANBAN_STATUS', {status_id: data.status_id, id: data.id, data: res.data});
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        createNewKanban({commit}, data) {
            return new Promise((resolve, reject) => {
                storeNewKanban(data).then(res => {
                    commit('PUSH_NEW_KANBAN', res.data);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        deleteKanban({commit}, data) {
            return new Promise((resolve, reject) => {
                deleteKanban(data.id).then(res => {
                    commit('REMOVE_KANBAN', data);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    }
}
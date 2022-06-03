import request from '../axios';

export function getKanbanStatuses() {
    return request({
        url: '/kanban-statuses',
        method: "get",
    });
}

export function getKanbanData() {
    return request({
        url: '/kanban',
        method: "get",
    });
}

export function updateKanbanData(data) {
    return request({
        url: `/kanban/${data.id}`,
        method: 'put',
        data: data,
    })
}

export function storeNewKanban(data) {
    return request({
        url: '/kanban',
        method: 'post',
        data,
    })
}

export function deleteKanban(id) {
    return request({
        url: `/kanban/${id}`,
        method: 'delete',
    });
}
export function fetchKanban(id) {
    return request({
        url: `/kanban/${id}`,
        method: 'get',
    });
}
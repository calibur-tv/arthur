import http from '@calibur/http'

export const token = () => http.get('desk/upload_token')

export const folders = () => http.get('desk/folder/list')

export const createFolder = ({ name }) => http.post('desk/folder/create', { name })

export const updateFolder = ({ name, folder_id }) => http.post('desk/folder/update', { name, folder_id })

export const deleteFolder = ({ folder_id }) => http.post('desk/folder/delete', { folder_id })

export const files = ({ folder_id }) => http.get('desk/file/list', { folder_id })

export const moveFile = ({ file_id, folder_id, name }) => http.post('desk/file/move', { file_id, folder_id, name })

export const deleteFile = ({ file_id }) => http.post('desk/file/delete', { file_id })

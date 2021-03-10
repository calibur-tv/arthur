export const token = () => $http.get('v1/desk/upload_token')

export const folders = () => $http.get('v1/desk/folder/list')

export const createFolder = ({ name }) => $http.post('v1/desk/folder/create', { name })

export const updateFolder = ({ name, folder_id }) => $http.post('v1/desk/folder/update', { name, folder_id })

export const deleteFolder = ({ folder_id }) => $http.post('v1/desk/folder/delete', { folder_id })

export const files = ({ folder_id }) => $http.get('v1/desk/file/list', { folder_id })

export const moveFile = ({ file_id, folder_id, name }) => $http.post('v1/desk/file/move', { file_id, folder_id, name })

export const deleteFile = ({ file_id }) => $http.post('v1/desk/file/delete', { file_id })

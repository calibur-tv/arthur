import http from '@calibur/http'

export const getFolders = () => http.get('desk/folder/list')

export const getFolderFiles = ({ folder_id }) => http.get('desk/file/list', { folder_id })

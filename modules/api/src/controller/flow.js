import http from '@calibur/http'

export const getFolders = () => http.get('v1/desk/folder/list')

export const getFolderFiles = ({ folder_id }) => http.get('v1/desk/file/list', { folder_id })

export const token = (ctx) => ctx.get('v1/desk/upload_token')

export const folders = (ctx) => ctx.get('v1/desk/folder/list')

export const createFolder = (ctx, { name }) => ctx.post('v1/desk/folder/create', { name })

export const updateFolder = (ctx, { name }) => ctx.post('v1/desk/folder/update', { name })

export const deleteFolder = (ctx, { folder_id }) => ctx.post('v1/desk/folder/delete', { folder_id })

export const files = (ctx, { folder_id }) => ctx.get('v1/desk/file/list', { folder_id })

export const moveFile = (ctx, { file_id, folder_id, name }) => ctx.post('v1/desk/file/move', { file_id, folder_id, name })

export const deleteFile = (ctx, { file_id }) => ctx.post('v1/desk/file/delete', { file_id })

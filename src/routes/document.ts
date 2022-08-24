/**
 * ユーザーの課題ステータス一覧を取得する
 * GET: /users/:userId/tasks
 *
 * @param {string} userId ユーザーID
 *
 * @returns {Promise<User>}
 */

/**
 * 1ユーザーの1課題ステータスを更新する
 * PUT: /users/:userId/tasks/:taskId
 * curl -X PUT http://localhost:8000/users/fGsF1XMuO82hz6e6PPqG/tasks/1 -H "Content-Type: application/json" -d '{"status":"完了"}'
 *
 * @param {string} status ステータス
 *
 * @returns {Promise<boolean>}
 */

/**
 * 課題の内容を更新する
 * PUT: /tasks/:taskId
 * curl -X PUT http://localhost:8000/tasks/1 -H "Content-Type: application/json" -d '{"title":"更新された課題1"}'
 *
 * @description
 * 内部的には全てのユーザーが保持する課題も更新する
 * 1. トランザクションを開始する
 * 2. 全ユーザーを取得する
 * 3. 全ユーザーをループして、対象の課題IDをパラメーター通り更新する
 *
 * @param {string} title タイトル
 * @param {string} content 内容
 *
 * @returns {Promise<boolean>}
 */

/**
 * 課題を削除する
 * DELETE: /tasks/:taskId
 * curl -X DELETE http://localhost:8000/tasks/1
 *
 * @description
 * 内部的には全てのユーザーが保持する課題も削除する
 * 1. トランザクションを開始する
 * 2. 全ユーザーを取得する
 * 3. 全ユーザーをループして、対象の課題IDを削除する
 *
 * @returns {Promise<boolean>}
 */

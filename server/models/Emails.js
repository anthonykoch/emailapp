import { Model } from 'objection'

export default class Email extends Model {
  static tableName = 'emails';

  static get idColumn() {
    return 'id'
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}

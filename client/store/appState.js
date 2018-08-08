import {
  observable,
  computed,
  action,
} from 'mobx'

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'Jokcy' }) {
    this.count = count
    this.name = name
  }
  @observable count

  @observable name

  @computed get msg() {
    return `${this.name} say counter is ${this.count}`
  }

  @action add() {
    this.count += 1
  }
  @action changeName(name) {
    this.name = name
  }
  // 服务端客户端数据同步
  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}

import AppState from './appState'
import TopicStore from './topic-store'

export { AppState, TopicStore }

// export default {
//   AppState,
//   TopicStore,
// }

export const createStoreMap = () => {
  return {
    appState: new AppState(),
    topicStore: new TopicStore(),
  }
}

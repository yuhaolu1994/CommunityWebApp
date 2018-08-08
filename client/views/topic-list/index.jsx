import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'

// import AppState from '../../store/appState'
import Container from '../layout/container'
import TopicListItem from './list-item'
// import { tabs } from '../../util/variable-define'

// app.js 中通过Provider传递stores
@inject((stores) => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer

export default class TopicList extends React.Component {
  static contextTypes = {
    // 定义路由对象
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
    this.fetchTopic = this.fetchTopic.bind(this)
  }

  state = {
    value: 0,
  }

  componentDidMount() {
    this.fetchTopic()
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.location.search !== this.props.location.search) {
      this.fetchTopic(nextProps.location)
    }
  }

  fetchTopic(location) {
    location = location || this.props.location
    const query = queryString.parse(location.search)
    const { tab } = query
    this.props.topicStore.fetchTopics(tab || 'all')
  }

  // 异步操作数据
  // bootstrap() {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       this.props.appState.count = 10
  //       resolve(true)
  //     })
  //   })
  // }

  // getTab(search) {
  //   search = search || this.props.location.search
  //   // url query ? 后的参数
  //   const query = queryString.parse(search)
  //   return query.tab || 'all'
  // }

  changeTab(e, value) {
    // this.context.router.history.push({
    //   pathname: '/index',
    //   search: `?tab=${value}`,
    // })
    this.setState({ value })
    this.props.topicStore.fetchTopics(value)
  }

  /* eslint-disable */
  listItemClick() {

  }
  /* eslint-enable */

  render() {
    const {
      topicStore,
    } = this.props

    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing
    // const tab = this.getTab()
    const { value } = this.state

    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <mata name="description" content="This is description" />
        </Helmet>
        <Tabs value={value} onChange={this.changeTab}>
          <Tab label="全部" value="all" />
          <Tab label="分享" value="share" />
          <Tab label="工作" value="job" />
          <Tab label="问答" value="ask" />
          <Tab label="精品" value="good" />
          <Tab label="测试" value="dev" />
        </Tabs>
        <List>
          {
            topicList.map(topic => (
              <TopicListItem
                key={topic.id}
                onclick={this.listItemClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncingTopics
            ? (
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '40px 0',
              }}
              >
                <CircularProgress color="accent" size={100} />
              </div>
            )
            : null
        }
      </Container>
    )
  }
}

// 定义组件的props
TopicList.wrappedComponent.propTypes = {
  // appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.object.isRequired,
}

// location对象是Route渲染实际组件传进来的
TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}

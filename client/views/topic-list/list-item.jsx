import React from 'react'
import PropTypes from 'prop-types'
// 加入classnames实现置顶功能
import cx from 'classnames'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

import { tabs } from '../../util/variable-define'

import {
  topicPrimaryStyle,
  topicSecondaryStyle,
} from './styles'

const Primary = ({ classes, topic }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  })

  return (
    <div className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>Create at: {topic.create_at}</span>
  </span>
)

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)
const StyledPSecondary = withStyles(topicSecondaryStyle)(Secondary)

const TopicListItem = ({ onclick, topic }) => (
  <ListItem button onclick={onclick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledPSecondary topic={topic} />}
    />
  </ListItem>
)

TopicListItem.propTypes = {
  onclick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

export default TopicListItem

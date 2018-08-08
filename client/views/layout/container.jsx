import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    margin: 24,
    marginTop: 80,
  },
}

// classes, children: arrow function params (props)
const Container = ({ classes, children }) => (
  <Paper elevation={4} className={classes.root}>
    { children }
  </Paper>
)


Container.propTypes = {
  classes: PropTypes.object.isRequired,
  // An object that could be one of many types
  children: PropTypes.oneOfType([
    // An array of a certain type
    PropTypes.arrayOf(PropTypes.element),
    // A React element
    PropTypes.element,
  ]),
}

export default withStyles(styles)(Container)

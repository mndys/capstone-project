import React from 'react'

import Header from './Header'

export default {
  title: 'ui/Header',
  component: Header,
}

const Template = ({ Title }) => <Header>{Title}</Header>

export const Default = Template.bind({})
Default.args = {
  Title: 'Wheel of TBR',
}

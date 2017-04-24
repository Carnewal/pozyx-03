import test from 'ava'
import React from 'react'
import {shallow} from 'enzyme'
import {Link} from 'react-router'
import Map from '../../../src/containers/MapContainer'
import Popout from '../../../src/components/map/Popout'

const popoutStyle = {
  margin: 10,
  width: '20px'
}

test('has a style passed from the props', t => {
	const wrapper = shallow(<Popout containerStyle={popoutStyle} />)
	t.is(wrapper.prop('style'), popoutStyle)
})

test('has a <Link/> wrapped <Map> with the correct width', t => {
	const wrapper = shallow(<Popout containerStyle={popoutStyle} />)
	t.true(wrapper.contains(
    <Link to={'/'}>
      <Map containerWidth={popoutStyle.width} />
    </Link>
  ))
})

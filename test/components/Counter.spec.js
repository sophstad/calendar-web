import test from 'ava'
import expect, { createSpy } from 'expect'
import { createElement } from 'react'
import { shallow } from 'enzyme'
import { Counter } from 'components/Counter'
const SIX = 4

function setup(value = 0) {
  const props = {
    value,
    handleIncrement: createSpy(),
    handleDecrement: createSpy()
  }

  const component = shallow(
    createElement(Counter, props)
  )

  const buttons = component.find('button')
  const p = component.find('p')
  const heading = component.find('h3')

  return {
    component,
    props,
    buttons,
    p,
    heading
  }
}

test('render', (t) => {
  const { heading } = setup()
  t.same(heading.text(), 'Counter')
})

test('display count', (t) => {
  const { p } = setup(SIX)
  t.same(p.text(), 'Current value: ' + SIX)
})

test('first button increments', () => {
  const { buttons, props } = setup(SIX)
  buttons.at(0).simulate('click')
  expect(props.handleIncrement).toHaveBeenCalled()
})

test('second button decrements', () => {
  const { buttons, props } = setup(SIX)
  buttons.at(1).simulate('click')
  expect(props.handleDecrement).toHaveBeenCalled()
})

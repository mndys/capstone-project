// PropTypes: _id: ObjectID<String>, isToggled: State<Array>, setIsToggled: State<Function>
export default function toggleStates(_id, isToggled, setIsToggled) {
  let newIsToggled
  if (isToggled.includes(_id)) {
    newIsToggled = isToggled.filter(StateItemId => StateItemId !== _id)
  } else {
    newIsToggled = [...isToggled, _id]
  }
  setIsToggled(newIsToggled)
}

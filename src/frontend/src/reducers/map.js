import { SET_FLOORPLAN } from '../actions/FloorPlanActions'

const initialState = {
  floorPlan: ''
}

export const types = {
  // SET_ANCHORS: 'SET_ANCHORS',

}

const map = (state = initialState, action) => {
  switch(action.type) {
    case SET_FLOORPLAN:
      //hier zal er naar de backend moeten worden gestuurd en de link worden ontvangen
      return {...state, floorPlan: action.file}
    default:
      return state
  }
}

export default map

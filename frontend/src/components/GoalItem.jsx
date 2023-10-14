import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
const dispatch = useDispatch()

return (

<tr>
<td>{new Date(goal.createdAt).toLocaleString('en-US')}</td>
<td>{ goal.name}</td>
<td>{ goal.price}</td>
<td> <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>Delete</button></td>
</tr> 
)
}

export default GoalItem

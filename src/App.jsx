import './App.css'
import { DragDropContext } from 'react-beautiful-dnd';
import PluginsFrame from './components/pluginsFrame/PluginsFrame'

function App() {
  return (
    <div className='App'>
      <DragDropContext>
        <PluginsFrame />
      </DragDropContext>
    </div>
  )
}

export default App

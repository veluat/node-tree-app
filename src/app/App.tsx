import {Box} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import React, {useState} from 'react'
import {TreeView} from '@mui/x-tree-view'
import {Tree} from '../components/tree/Tree'
import {RootState} from './store/store'
import {useSelector} from 'react-redux'
import {Node} from './model/treeSlice'

export function App() {
  const treeData = useSelector((state: RootState) => state.tree.treeData)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  return (
    <Box sx={{height: '100vh', width: '100vw'}}>
      <TreeView
        aria-label='rich object'
        defaultCollapseIcon={<ExpandMoreIcon/>}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon/>}
      >
        {treeData.map((el: Node) => (
          <Tree key={el.id}
                nodes={el}
                isRoot
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId}
          />
        ))}
      </TreeView>
    </Box>
  )
}
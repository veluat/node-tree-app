import {Box} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import React from 'react'
import {TreeView} from '@mui/x-tree-view'
import {Tree} from '../components/Tree'
import {RootState} from './store'
import {useSelector} from 'react-redux'

export type TreeNodeType = {
  id: string;
  name: string;
  parentId?: string;
  children?: TreeNodeType[];
};

export function App() {
  const treeData = useSelector((state: RootState) => state.tree.treeData);

  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <TreeView
        aria-label='rich object'
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {treeData.map((el: TreeNodeType) => (
          <Tree key={el.id.toString()} nodes={el} isRoot nodeId={el.id.toString()} />
        ))}
      </TreeView>
    </Box>
  );
}
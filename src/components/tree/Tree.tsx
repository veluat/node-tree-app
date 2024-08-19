import {TreeItem} from '@mui/x-tree-view'
import {ControlPanel} from '../control-panel/ControlPanel'
import React, {useRef} from 'react'
import {Node} from '../../app/model/treeSlice'
import s from './Tree.module.scss'

interface TreeProps {
  nodes: Node;
  isRoot: boolean;
  parentId?: string
  activeItemId: string | null;
  setActiveItemId: (itemId: string | null) => void;
}

export const Tree: React.FC<TreeProps> = ({
                                            nodes,
                                            parentId,
                                            activeItemId,
                                            setActiveItemId
                                          }) => {
  const nodeRef = useRef<HTMLDivElement>(null)

  const handleItemClick = (itemId: string) => {
    setActiveItemId(itemId)
  }

  return (
    <div>
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        className={parentId === undefined ? s.rootItem : s.childItem}
        label={
          <div style={{display: 'flex', alignItems: 'center'}} ref={nodeRef}>
            {nodes.name}
            {activeItemId === nodes.id && (
              <ControlPanel isRoot={parentId === undefined} nodeName={nodes.name} nodeId={nodes.id}
                            parentId={nodes.id}/>)}
          </div>
        }
        onClick={() => handleItemClick(nodes.id)}
      >
        {Array.isArray(nodes.children) ? (
          <div style={{marginLeft: parentId === undefined ? '8px' : '16px'}}>
            {nodes.children.map(child => (
              <Tree
                key={child.id}
                nodes={child}
                isRoot
                parentId={nodes.id}
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId}
              />
            ))}
          </div>
        ) : null}
      </TreeItem>
    </div>
  )
}
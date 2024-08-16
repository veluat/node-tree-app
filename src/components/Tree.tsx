import { TreeItem } from "@mui/x-tree-view";
import { ControlPanel } from "./ControlPanel";
import { TreeNodeType } from "../app/App";
import React, { useRef, useState } from "react";

interface TreeProps {
    nodes: TreeNodeType;
    isRoot: boolean;
    nodeId: string;
    parentId?: string
}

export const Tree: React.FC<TreeProps> = ({
                                            nodes,
                                            isRoot,
                                            nodeId,
                                            parentId,
                                          }) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (itemId: string) => {
    setActiveItemId(itemId);
  };

  return (
    <div>
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <div style={{ display: 'flex', alignItems: 'center' }} ref={nodeRef}>
            {nodes.name}
            {activeItemId === nodes.id ? (
              <ControlPanel isRoot={isRoot} nodeName={nodes.name} nodeId={nodeId} parentId={nodes.id} />
            ) : null}
          </div>
        }
        onClick={() => handleItemClick(nodes.id)}
      >
        {Array.isArray(nodes.children) ? (
          nodes.children.map((child) => (
            <Tree
              key={child.id}
              nodes={child}
              isRoot={false}
              nodeId={child.id}
              parentId={nodes.id}
            />
          ))
        ) : null}
      </TreeItem>
    </div>
  );
};
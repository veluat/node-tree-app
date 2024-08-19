import {configureStore} from '@reduxjs/toolkit'
import {treeReducer} from './model/treeSlice'

export const store = configureStore({
  reducer: {
    tree: treeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectTreeData = (state: RootState) => state.tree.treeData

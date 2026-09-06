'use client';

import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../lib/constants';
import {
  WorldState,
  DEFAULT_WORLD_STATE,
  UnlockCategory,
  unlockItem as unlockItemHelper,
  completeChapter as completeChapterHelper,
  visitScene as visitSceneHelper,
  isUnlocked as isUnlockedHelper,
  getUnlockedItems as getUnlockedItemsHelper,
} from '../lib/worldState';

export function useWorldState() {
  const [state, setState] = useLocalStorage<WorldState>(LOCAL_STORAGE_KEYS.worldState, DEFAULT_WORLD_STATE);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      totalVisits: (prev.totalVisits || 0) + 1,
      ...Object.fromEntries(
        Object.entries(DEFAULT_WORLD_STATE).filter(([key]) => !(key in prev))
      )
    }));
  }, [setState]);

  const unlockItem = useCallback((itemId: string) => {
    setState(prev => unlockItemHelper(prev, itemId));
  }, [setState]);

  const completeChapter = useCallback((chapterId: string) => {
    setState(prev => completeChapterHelper(prev, chapterId));
  }, [setState]);

  const visitScene = useCallback((sceneId: string) => {
    setState(prev => visitSceneHelper(prev, sceneId));
  }, [setState]);

  const isUnlocked = useCallback((itemId: string) => {
    return isUnlockedHelper(state, itemId);
  }, [state]);

  const getUnlockedItems = useCallback((category?: UnlockCategory) => {
    return getUnlockedItemsHelper(state, category);
  }, [state]);

  return {
    state,
    unlockItem,
    completeChapter,
    visitScene,
    isUnlocked,
    getUnlockedItems,
  };
}

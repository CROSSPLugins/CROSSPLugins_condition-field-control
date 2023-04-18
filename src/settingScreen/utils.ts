import { DependencyList, useEffect, useState } from "react";

function deepcp<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 初回レンダリング時useEffectの処理をスキップする
 * @param effect 
 * @param deps 
 */
function useSkipEffect(effect: () => void, deps: DependencyList) {
  const [_times, setTimes] = useState(0);
  useEffect(() => {
    if (_times >= 1) {
      return effect();
    } else {
      setTimes(_times + 1);
    }
  }, deps);
}

export {
  deepcp,
  useSkipEffect
};
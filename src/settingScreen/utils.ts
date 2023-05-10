import { DependencyList, useEffect, useState } from "react";
import toastr from "toastr";
import 'toastr/build/toastr.css';

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

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-center',
  preventDuplicates: false,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

const errorPopup = (message: string, title: string) => {
  toastr.error(message, title);
};

export {
  deepcp,
  useSkipEffect,
  errorPopup
};
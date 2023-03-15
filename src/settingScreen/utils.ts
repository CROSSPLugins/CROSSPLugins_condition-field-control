function deepcp<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export {
  deepcp
};
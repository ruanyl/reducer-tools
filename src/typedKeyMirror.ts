type Mirrored<T extends Record<string, any>> = {
  [K in keyof T]: K
}

export const typedKeyMirror = <T extends Record<string, any>>(keyMap: T, namespace: string) => {
  const keyMirrored: Mirrored<T> = {} as Mirrored<T>
  Object.keys(keyMap).forEach(k => keyMirrored[k] = `${namespace}_${k}`)
  return keyMirrored
}

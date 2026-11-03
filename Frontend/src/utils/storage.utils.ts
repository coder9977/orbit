type Storage = {
  types: typeof ValueTypes;
  set: (value: any) => void;
  get: () => Record<string, any> | null;
  clear: () => void;
};

export enum ValueTypes {
  PRIMITIVE = "primitive",
  JSON = "json",
};

export const storage = (key: string, valueType: ValueTypes): Storage => {
  const store = {
    types: ValueTypes,
    set: (value: string) => localStorage.setItem(key, value),
    get: () => {
      try {
        const value = localStorage.getItem(key);
        if (!value) {
          return null;
        }
        return valueType === ValueTypes.JSON ? JSON.parse(value) : value;
      } catch {
        localStorage.removeItem(key);
        return null;
      }
    },
    clear: () => localStorage.removeItem(key),
  } as Storage;
  Object.freeze(store);
  return store;
};

export const tokenStore = storage("token", ValueTypes.PRIMITIVE)

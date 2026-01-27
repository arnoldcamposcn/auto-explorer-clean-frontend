// presentation/components/molecules/selectHelpers.ts
export const createSelectOptions = (
    items: string[],
    defaultLabel: string
  ): Array<{ value: string; label: string }> => {
    return [
      { value: "", label: defaultLabel },
      ...items.map((item) => ({
        value: item,
        label: item,
      })),
    ];
  };


  // Nueva función para números
export const createNumberSelectOptions = (
  items: number[],
  defaultLabel: string
): Array<{ value: string; label: string }> => {
  return [
    { value: "", label: defaultLabel },
    ...items.map((item) => ({
      value: item.toString(),
      label: item.toString(),
    })),
  ];
};
type WidthHeight = {
  width: number;
  height: number;
};

export default function getResize({ width, height }: WidthHeight) {
  const targetRatio = width / height;

  return function ({ width, height }: WidthHeight): WidthHeight {
    const ratio = width / height;
    if (ratio < targetRatio) {
      return { width: Math.round(height * targetRatio), height };
    } else if (ratio > targetRatio) {
      return { width, height: Math.round(width * targetRatio) };
    }

    return { width, height };
  };
}

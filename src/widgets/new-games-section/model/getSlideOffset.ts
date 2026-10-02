interface SliderOffsetProps {
  index: number;
  center: number;
  total: number;
}

export function getSlideOffset({ index, center, total }: SliderOffsetProps) {
  const half = Math.floor(total / 2);
  let offset = (index - center) % total;

  if (offset > half) {
    offset -= total;
  }

  if (offset < -half) {
    offset += total;
  }

  return offset;
}

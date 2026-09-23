import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './avatar.module.scss';
import { getAvatarLetters } from '@/shared/lib/get-avatar-letters/get-avatar-letters';

const FIRST_COLOR_INDEX = 1;

interface AvatarProps {
  name: string;
  colorAvatar: number;
  className?: string | string[];
}

class Avatar extends BaseComponent<HTMLSpanElement> {
  constructor({ name, colorAvatar, className = [] }: AvatarProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const colorClasses = [
      styles.colorFirst,
      styles.colorSecond,
      styles.colorThird,
      styles.colorFourth,
      styles.colorFifth,
    ];

    const colorNumber = (colorAvatar - FIRST_COLOR_INDEX) % colorClasses.length;
    const colorClass = colorClasses[colorNumber];

    super({
      tag: 'span',
      text: getAvatarLetters(name),
      className: [styles.avatar, colorClass, ...additionalClasses],
    });
  }
}

export default Avatar;

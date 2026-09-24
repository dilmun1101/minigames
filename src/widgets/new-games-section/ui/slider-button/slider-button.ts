import BaseComponent from '@/shared/lib/base-component/base-component';
import Icon from '@/shared/ui/icon/icon';
import styles from './slider-button.module.scss';

type SliderButtonVariant = 'default' | 'primary';

interface SliderButtonProps {
  iconName: string;
  variant?: SliderButtonVariant;
}

class SliderButton extends BaseComponent<HTMLButtonElement> {
  constructor({ iconName, variant = 'default' }: SliderButtonProps) {
    const variantClass: Record<SliderButtonVariant, string> = {
      default: styles.default,
      primary: styles.primary,
    };

    const icon = new Icon({
      name: iconName,
      className: styles.icon,
    });

    super(
      {
        tag: 'button',
        className: [styles.sliderButton, variantClass[variant]],
        attributes: {
          type: 'button',
        },
      },
      icon
    );
  }
}

export default SliderButton;

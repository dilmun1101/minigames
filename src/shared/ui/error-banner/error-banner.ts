import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './error-banner.module.scss';
import Button from '../button/button';

const RETRY_TEXT = 'Retry';

interface ErrorBannerProps {
  text: string;
  onRetry: () => void;
  className?: string | string[];
}

class ErrorBanner extends BaseComponent {
  constructor({ text, onRetry, className = [] }: ErrorBannerProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const message = new BaseComponent({
      tag: 'p',
      className: styles.message,
      text,
    });

    const retryButton = new Button({
      text: RETRY_TEXT,
      variant: 'primary',
    });

    super(
      {
        tag: 'div',
        className: [styles.errorBanner, ...additionalClasses],
      },
      message,
      retryButton
    );

    retryButton.onClick(() => onRetry());
  }
}

export default ErrorBanner;

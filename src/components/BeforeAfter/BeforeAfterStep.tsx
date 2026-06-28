import type { ReactNode } from 'react'
import styles from './BeforeAfter.module.scss'

type Variant = 'sin' | 'con'

interface BeforeAfterStepProps {
  variant: Variant
  num: string
  windowTitle: string
  content: ReactNode
  labelTitle: string
  labelSub: string
  showArrow: boolean
}

function BeforeAfterStep({
  variant,
  num,
  windowTitle,
  content,
  labelTitle,
  labelSub,
  showArrow,
}: BeforeAfterStepProps) {
  return (
    <>
      <div className={`${styles.baFlowStep} ${styles[variant]}`}>
        <div className={styles.baFlowStepNum}>{num}</div>
        <div className={`${styles.baWindowMini} ${styles[variant]}`}>
          <div className={styles.baWindowHeaderMini}>
            <div className={`${styles.baWindowDot} ${variant === 'sin' ? styles.red : styles.violet}`} />
            <span>{windowTitle}</span>
          </div>
          {content}
        </div>
        <div className={styles.baFlowStepLabel}>
          <strong>{labelTitle}</strong>
          <span>{labelSub}</span>
        </div>
      </div>
      {showArrow && <div className={`${styles.baFlowArrow} ${styles[variant]}`}>→</div>}
    </>
  )
}

export default BeforeAfterStep

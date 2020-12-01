import { match } from 'react-router-dom'

export type MathchType = match<{ key: string; siteName: string }> | null

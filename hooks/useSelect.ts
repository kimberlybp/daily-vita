import { RootState } from '@/store/reducers'
import { useSelector } from 'react-redux'

const useSelect = <R, T = RootState>(selector: (state: T) => R, equalityFn?: (left: R, right: R) => boolean) => useSelector(selector, equalityFn)
export default useSelect

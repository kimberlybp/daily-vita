import { YesOrNo, Option } from "@/store/types/survey";

export const TRUE_FALSE_OPTIONS: Option[] = [
  { id: 1, name: YesOrNo.Yes },
  { id: 2, name: YesOrNo.No },
]

export const RANGE_OPTIONS: Option[] = [
  { id: 1, name: '0 - 1' },
  { id: 2, name: '2 - 5' },
  { id: 3, name: '5+' },
]

export const DIETS_LABEL = "diets"
export const DAILY_EXPOSURE_LABEL = "is_daily_exposure"
export const SMOKE_LABEL = "is_smoke"
export const ALCOHOL_LABEL = "alcohol"
export const NONE_ID = 0
export const NONE_LABEL = "None"
export const PROGRESS_PER_PAGE = 25


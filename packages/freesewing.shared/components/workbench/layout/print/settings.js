import { useTranslation } from 'next-i18next'
import PageSizePicker from './pagesize-picker'
import OrientationPicker from './orientation-picker'
import PrintIcon from 'shared/components/icons/print'
import RightIcon from 'shared/components/icons/right'

const PrintLayoutSettings = props => {
  if (!props.draft?.parts?.pages?.pages) return null
  const settingsProps = {
    gist: props.gist,
    updateGist: props.updateGist
  }
  const { cols, rows, count } = props.draft.parts.pages.pages

  return (
    <div className="flex flex-row gap-8 justify-center">
      <PageSizePicker {...props} />
      <OrientationPicker {...props} />
      <div className="flex flex-row font-bold items-center px-0 text-xl">
        <PrintIcon />
        <span className="ml-2">{count}</span>
        <span className="mx-6 opacity-50">|</span>
        <RightIcon />
        <span className="ml-2">{cols}</span>
        <span className="mx-6 opacity-50">|</span>
        <div className="rotate-90"><RightIcon /></div>
        <span className="text-xl ml-2">{rows}</span>
      </div>
    </div>
  )
}

export default PrintLayoutSettings
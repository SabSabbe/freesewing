import { useState } from 'react'
import CloseIcon from 'shared/components/icons/close.js'

const colors = {
  comment: 'secondary',
  note: 'primary',
  tip: 'accent',
  warning: 'error',
  fixme: 'warning',
  link: 'secondary',
  related: 'info',
  none: '',
}

let forceTailwind = <p className="border-accent bg-accent" />
forceTailwind += <p className="text-accent" />
forceTailwind += <p className="border-secondary bg-secondary" />
forceTailwind += <p className="text-secondary" />
forceTailwind += <p className="border-error bg-error" />
forceTailwind += <p className="text-error" />
forceTailwind += <p className="border-warning bg-warning" />
forceTailwind += <p className="text-warning" />
forceTailwind += <p className="border-info bg-info" />
forceTailwind += <p className="text-info" />
forceTailwind += <p className="border-success bg-success" />
forceTailwind += <p className="text-success" />
forceTailwind += <p className="border-primary bg-primary" />
forceTailwind += <p className="text-primary" />

const Popout = (props) => {

  const [hide, setHide] = useState(false)
  if (hide) return null

  let type = 'none'
  for (const t in colors) {
    if (props[t]) type = t
  }
  const color = colors[type]
  const { className=''} = props

  return props.compact
    ? (
      <div className={`relative my-4 bg-${color} bg-opacity-5 ${className} -ml-6 -mr-6 sm:m-0`}>
        <div className={`
          border-y-4 sm:border-0 sm:border-l-4 px-4
          shadow text-base border-${color}
          flex flex-row items-center
        `}>
          <div className={`font-bold uppercase text-${color}`}>
            <span>{type}</span>
            <span className="px-3">|</span>
          </div>
          <div className="popout-content">
            {props.noP
              ? props.children
              : <p>{props.children}</p>
            }
          </div>
        </div>
      </div>
    )
    : (
      <div className={`relative my-8 bg-${color} bg-opacity-5 ${className} -ml-6 -mr-6 sm:m-0`}>
        <div className={`
          border-y-4 sm:border-0 sm:border-l-4 px-6 sm:px-8 py-4 sm:py-2
          shadow text-base border-${color}
        `}>
          <div className={`font-bold flex flex-row gap-1 items-end justify-between` }>
            <div>
              <span className={`font-bold uppercase text-${color}`}>{type}</span>
              <span className={`font-normal text-base text-${color}`}>
                {type === 'comment' && <> by <b>{props.by}</b></>}
              </span>
            </div>
            {props?.hideable && (
              <button
                onClick={() => setHide(true)}
                className="hover:text-secondary"
                title="Close"
              ><CloseIcon /></button>
            )}
          </div>
          <div className="py-1 first:mt-0 popout-content">{props.children}</div>
          {type === 'comment' && (
            <div className={`font-bold italic text-${color}`}>{props.by}</div>
          )}
        </div>
      </div>
    )
}

export default Popout

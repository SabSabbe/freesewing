import React from 'react'
import MeasurementInput from '../inputs/measurement.js'
import { withBreasts, withoutBreasts } from 'pkgs/models/src/index.js'
import nonHuman from './non-human.js'
import WithBreastsIcon from 'shared/components/icons/with-breasts.js'
import WithoutBreastsIcon from 'shared/components/icons/without-breasts.js'
import { useTranslation } from 'next-i18next'

const groups = {
  people: {
    with: withBreasts,
    without: withoutBreasts,
  },
  dolls: {
    with: nonHuman.withBreasts.dolls,
    without: nonHuman.withoutBreasts.dolls,
  },
  giants: {
    with: nonHuman.withBreasts.giants,
    without: nonHuman.withoutBreasts.giants,
  }
}
const icons = {
  with: <WithBreastsIcon />,
  without: <WithoutBreastsIcon />,
}

const WorkbenchMeasurements = ({ app, pattern, gist, updateGist }) => {
  const { t } = useTranslation(['app', 'cfp'])

  // Method to handle measurement updates
  const updateMeasurements = (value, m=false) => {
    if (m === false) {
      // Set all measurements
      updateGist('measurements', value)
    } else {
      // Set one measurement
      const newValues = {...gist.measurements}
      newValues[m] = value
      updateGist('measurements', newValues)
    }
  }
  // Save us some typing
  const inputProps = { app, updateMeasurements, gist }

  return (
    <div className="m-auto max-w-2xl">
      <h1>
        <span className='capitalize mr-4 opacity-70'>
          {pattern.config.name}:
        </span> {t('measurements')}
      </h1>
      <details open className="my-2">
        <summary><h2 className="inline pl-1">{t('cfp:preloadMeasurements')}</h2></summary>
        <div className="ml-2 pl-4 border-l-2">
          {Object.keys(groups).map(group => (
            <details key={group}>
              <summary><h3 className="inline pl-1">{t(group)}</h3></summary>
              <div className="ml-2 pl-4 border-l-2">
                {Object.keys(icons).map(type => (
                  <React.Fragment key={type}>
                    <h4>{t(`${type}Breasts`)}</h4>
                    <ul className="flex flex-row flex-wrap gap-2">
                      {Object.keys(groups[group][type]).map((m) => (
                        <li key={`${m}-${type}-${group}`} className="">
                          <button
                            className="flex flex-row btn btn-outline"
                            onClick={() => updateMeasurements(groups[group][type][m], false)}
                          >
                            {icons[type]}
                            {t('size')}&nbsp;
                            { group === 'people'
                              ? m.slice(-2)
                              : m
                            }
                          </button>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                ))}
              </div>
            </details>
          ))}
        </div>
      </details>

      <details className="my-2">
        <summary><h2 className="inline pl-2">{t('cfp:enterMeasurements')}</h2></summary>
        <div className="ml-2 pl-4 border-l-2">
          {pattern.config.measurements && (
            <>
              <h3>{t('requiredMeasurements')}</h3>
              {pattern.config.measurements.map(m => (
                <MeasurementInput key={m} m={m} {...inputProps} />
              ))}
            </>
          )}
          {pattern.config.optionalMeasurements && (
            <>
              <h3>{t('optionalMeasurements')}</h3>
              {pattern.config.optionalMeasurements.map(m => (
                <MeasurementInput key={m} m={m} {...inputProps} />
              ))}
            </>
          )}
        </div>
      </details>

    </div>
  )
}

export default WorkbenchMeasurements


import get from 'lodash.get'

// Generic rounding method
export const round = (val, decimals=1) => Math.round(val*Math.pow(10, decimals))/Math.pow(10, decimals)

// Rounds a value in mm
export const roundMm = (val, units) => {
  if (units === "imperial") return Math.round(val * 1000000) / 1000000;
  else return Math.round(val * 10) / 10;
}

// Formatting for imperial values
export const formatImperial = (neg, inch, numo = false, deno = false, format = 'html') => {
  if (format === 'html') {
    if (numo) return `<span>${neg}${inch}&nbsp;<sup>${numo}</sup>/<sub>${deno}</sub></span>`
    else return `<span>${neg}${inch}</span>`
  } else {
    if (numo) return `${neg}${inch} ${numo}/${deno}`
    else return `${neg}${inch}`
  }
}

// Format a value in mm based on the user's units
export const formatMm = (val, units, format = 'html') => {
  val = roundMm(val)
  if (units === 'imperial') {
    if (val == 0) return formatImperial('', 0, false, false, format)
    let negative = ''
    let inches = ''
    let rest = ''
    let fraction = val / 25.4
    if (fraction < 0) {
      fraction = fraction * -1
      negative = '-'
    }
    if (Math.abs(fraction) < 1) rest = fraction
    else {
      inches = Math.floor(fraction)
      rest = fraction - inches
    }
    let suffix = ''
    if (format === 'html') suffix = '"'
    let fraction128 = Math.round(rest * 128)
    if (fraction128 == 0) return formatImperial(negative, inches, false, false, format)
    if (fraction128 % 64 == 0)
      return formatImperial(negative, inches, fraction128 / 64, 2, format) + suffix
    if (fraction128 % 32 == 0)
      return formatImperial(negative, inches, fraction128 / 32, 4, format) + suffix
    if (fraction128 % 16 == 0)
      return formatImperial(negative, inches, fraction128 / 16, 8, format) + suffix
    if (fraction128 % 8 == 0)
      return formatImperial(negative, inches, fraction128 / 8, 16, format) + suffix
    if (fraction128 % 4 == 0)
      return formatImperial(negative, inches, fraction128 / 4, 32, format) + suffix
    if (fraction128 % 2 == 0)
      return formatImperial(negative, inches, fraction128 / 2, 64, format) + suffix

    return negative + Math.round(fraction * 100) / 100 + suffix
  } else {
    if (format === 'html') return roundMm(val / 10) + 'cm'
    else return roundMm(val / 10)
  }
}

// Format a percentage (as in, between 0 and 1)
export const formatPercentage = val => Math.round(1000*val)/10+'%'

export const optionType = option => {
  if (typeof option?.pct !== 'undefined') return 'pct'
  if (typeof option?.bool !== 'undefined') return 'bool'
  if (typeof option?.count !== 'undefined') return 'count'
  if (typeof option?.deg !== 'undefined') return 'deg'
  if (typeof option?.list !== 'undefined') return 'list'
  if (typeof option?.mm !== 'undefined') return 'mm'

  return 'constant'
}

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const strapiImage = (img, sizes=['thumbnail', 'xlarge', 'large', 'medium', 'small', 'xsmall']) => {
  const image = {
    caption: img?.caption || '',
    w: img.width,
    h: img.height,
    url: img.url,
    sizes: {}
  }
  for (const size of sizes) {
    if (img.formats[size]) image.sizes[size] = {
      w: img.formats[size].width,
      h: img.formats[size].height,
      url: img.formats[size].url,
    }
  }

  // Some images only have a small original, and thus no (resized) sizes
  // In that case, return the original for the requested size
  if (Object.keys(image.sizes).length < 1) {
    for (const size of sizes) {
      image.sizes[size] = {
        w: img.width,
        h: img.height,
        url: img.url,
      }
    }
  }

  return image
}

export const getCrumbs = (app, slug=false, title) => {
  if (!slug) return null
  const crumbs = []
  const chunks = slug.split('/')
  for (const i in chunks) {
    const j = parseInt(i)+parseInt(1)
    const page = get(app.navigation, chunks.slice(0,j))
    if (page) crumbs.push([page.__linktitle, '/'+chunks.slice(0,j).join('/'), (j < chunks.length)])
  }

  return crumbs
}


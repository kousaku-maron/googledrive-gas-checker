// FIXME: ものすごく汚い。
export const isOverToday = (date: GoogleAppsScript.Base.Date) => {
  const YYYY = date.getFullYear().toString()
  const MM = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
  const DD = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString()

  const formattedDateStr = parseInt(`${YYYY}${MM}${DD}`)
  const formattedTodayStr = parseInt(Moment.moment().format('YYYYMMDD'))

  return formattedDateStr >= formattedTodayStr
}

// FIXME: ものすごく汚い。
export const isOverYesterday = (date: GoogleAppsScript.Base.Date) => {
  const YYYY = date.getFullYear().toString()
  const MM = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
  const DD = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString()

  const formattedDateStr = parseInt(`${YYYY}${MM}${DD}`)
  const formattedYesterdayStr = parseInt(
    Moment.moment()
      .add(-1, 'days')
      .format('YYYYMMDD')
  )

  return formattedDateStr > formattedYesterdayStr
}

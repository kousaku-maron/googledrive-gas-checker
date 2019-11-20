class Slack {
  endpoint: string
  channel: string
  username: string
  iconEmoji: string | undefined

  constructor(endpoint: string, channel: string, username: string, iconEmoji?: string) {
    this.endpoint = endpoint
    this.channel = channel
    this.username = username

    this.iconEmoji = iconEmoji
  }

  sendMessage(text: string) {
    const payload = {
      channel: this.channel,
      // text,
      username: this.username,
      icon_emoji: this.iconEmoji,
      attachments: [
        {
          color: 'good',
          text
        }
      ]
    }

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      payload: JSON.stringify(payload)
    }

    UrlFetchApp.fetch(this.endpoint, options)
  }
}

export const createSlackInstance = (endpoint: string, channel: string, username: string, iconEmoji: string | null) => {
  const slack = iconEmoji ? new Slack(endpoint, channel, username, iconEmoji) : new Slack(endpoint, channel, username)
  return slack
}

export default Slack

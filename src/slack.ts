class Slack {
  endpoint: string
  channel: string
  username: string
  iconEmoji: string

  constructor(endpoint: string, channel: string, username: string, iconEmoji?: string) {
    this.endpoint = endpoint
    this.channel = channel
    this.username = username
    this.iconEmoji = iconEmoji
  }

  sendMessage(text: string) {
    const payload = {
      channel: this.channel,
      text,
      username: this.username,
      icon_emoji: this.iconEmoji
    }

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      payload: JSON.stringify(payload)
    }

    UrlFetchApp.fetch(this.endpoint, options)
  }
}

export default Slack

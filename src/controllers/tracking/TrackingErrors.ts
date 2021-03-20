import strings from '@helpers/strings'

export class TrackingError extends Error {
  constructor(msg?: string) {
    const string = strings(msg)
    super(string || msg)
    this.name = "TrackingError"
  }
}
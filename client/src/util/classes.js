export class Param {
  constructor(clientName, serverName, options) {
    this.clientName = clientName;
    this.serverName = serverName;
    this.options = options;
  }

  getOptions() {
    return this.options;
  }
}

export class Option {
  constructor(name, clientName, serverName, imageComponentName) {
    this.name = name;
    this.clientName = clientName;
    this.serverName = serverName;
    this.imageComponentName = imageComponentName;
  }

  static create(name, clientName, serverName, imageComponentName) {
    return new Option(name, clientName, serverName, imageComponentName);
  }
}
const { RESTDataSource } = require('apollo-datasource-rest');

class AccountsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000';
  }

  async getUser(id) {
    return this.get(`users/${id}`);
  }
}

module.exports = { AccountsAPI };

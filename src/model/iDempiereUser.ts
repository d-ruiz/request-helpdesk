class iDempiereUser {
  clientId: number;
  userId?: number;
  clientName: string;
  username: string;
  name?: string;
  eMail?: string;
  description?: string;

  constructor(clientId: number, clientName: string, username: string) {
    this.clientId = clientId;
    this.clientName = clientName;
    this.username = username;
  }

  setUserId(userId: number) {
    this.userId = userId;
  }
}

export default iDempiereUser;
